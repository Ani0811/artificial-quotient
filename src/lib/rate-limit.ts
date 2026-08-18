interface RateLimitRecord {
  timestamps: number[];
}

const globalForRateLimit = global as unknown as {
  rateLimitTracker: Map<string, RateLimitRecord>;
  rateLimitInterval?: NodeJS.Timeout;
};

if (!globalForRateLimit.rateLimitTracker) {
  globalForRateLimit.rateLimitTracker = new Map<string, RateLimitRecord>();
}

const trackerMap = globalForRateLimit.rateLimitTracker;

// Cleanup stale IP entries every 5 minutes to prevent memory growth
if (typeof setInterval !== "undefined" && !globalForRateLimit.rateLimitInterval) {
  globalForRateLimit.rateLimitInterval = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of trackerMap.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 600000);
      if (record.timestamps.length === 0) {
        trackerMap.delete(ip);
      }
    }
  }, 300000);
}

/**
 * In-memory sliding window rate limiter.
 */
export function checkRateLimit(
  request: Request,
  limit: number = 5,
  windowMs: number = 60000
): { success: boolean; limit: number; remaining: number; resetMs: number } {
  // Extract client IP address from standard headers
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  
  const ip = (
    cfConnectingIp ||
    (forwardedFor ? forwardedFor.split(",")[0].trim() : realIp) ||
    "127.0.0.1"
  );

  const now = Date.now();
  const key = `${ip}`;

  let record = trackerMap.get(key);
  if (!record) {
    record = { timestamps: [] };
    trackerMap.set(key, record);
  }

  // Filter timestamps within the current sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0];
    const resetMs = Math.max(0, windowMs - (now - oldestTimestamp));
    return {
      success: false,
      limit,
      remaining: 0,
      resetMs,
    };
  }

  // Push current request timestamp
  record.timestamps.push(now);
  const remaining = Math.max(0, limit - record.timestamps.length);

  return {
    success: true,
    limit,
    remaining,
    resetMs: windowMs,
  };
}
