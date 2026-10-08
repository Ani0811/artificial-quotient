/**
 * YouTube Analytics API v2 client using OAuth 2.0 refresh token.
 * Fetches authentic 30-day metrics (views, watch time, avg view duration) directly from YouTube Studio.
 */

interface CachedToken {
  token: string;
  expiresAt: number;
}

let cachedToken: CachedToken | null = null;

export interface MonthlyAnalyticsResult {
  rawViews: number;
  formattedViews: string;
  rawWatchTimeMinutes: number;
  watchTimeHours: string;
  avgViewDuration: string;
  startDate: string;
  endDate: string;
  source: "youtube_studio_analytics";
}

/**
 * Checks if YouTube Analytics OAuth 2.0 credentials are configured.
 */
export function isYouTubeAnalyticsConfigured(): boolean {
  return Boolean(
    process.env.YOUTUBE_CLIENT_ID &&
    process.env.YOUTUBE_CLIENT_SECRET &&
    process.env.YOUTUBE_REFRESH_TOKEN
  );
}

/**
 * Exchanges the long-lived refresh token for a fresh short-lived access token.
 * Caches the token in-memory until expiration.
 */
export async function getYouTubeAnalyticsAccessToken(): Promise<string | null> {
  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
  const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  // Reuse valid cached access token (with 60-second buffer)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60000) {
    return cachedToken.token;
  }

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("Failed to refresh YouTube Analytics OAuth token:", res.status, errText);
      return null;
    }

    const data = await res.json();
    const token = data.access_token;
    const expiresIn = Number(data.expires_in) || 3600;

    if (!token) {
      console.warn("OAuth token endpoint did not return access_token:", data);
      return null;
    }

    cachedToken = {
      token,
      expiresAt: Date.now() + expiresIn * 1000,
    };

    return token;
  } catch (err) {
    console.error("Network error refreshing YouTube Analytics token:", err);
    return null;
  }
}

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Fetches verified 30-day analytics report for the authenticated channel.
 * Returns null if OAuth is not configured or query fails.
 */
export async function fetchLive30DayAnalytics(): Promise<MonthlyAnalyticsResult | null> {
  const accessToken = await getYouTubeAnalyticsAccessToken();
  if (!accessToken) {
    return null;
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const startDate = formatDate(thirtyDaysAgo);
  const endDate = formatDate(now);

  const url = new URL("https://youtubeanalytics.googleapis.com/v2/reports");
  url.searchParams.set("ids", "channel==MINE");
  url.searchParams.set("startDate", startDate);
  url.searchParams.set("endDate", endDate);
  url.searchParams.set("metrics", "views,estimatedMinutesWatched,averageViewDuration");

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("YouTube Analytics API request failed:", res.status, errText);
      return null;
    }

    const data = await res.json();

    if (!data.rows || !Array.isArray(data.rows) || data.rows.length === 0) {
      console.warn("YouTube Analytics returned no rows for range:", startDate, "to", endDate);
      return null;
    }

    // Identify metric column indices
    const colHeaders: { name: string }[] = data.columnHeaders || [];
    const viewsIdx = colHeaders.findIndex((c) => c.name === "views");
    const watchTimeIdx = colHeaders.findIndex((c) => c.name === "estimatedMinutesWatched");
    const avgDurationIdx = colHeaders.findIndex((c) => c.name === "averageViewDuration");

    // Aggregate values if multiple rows returned
    let totalViews = 0;
    let totalMinutesWatched = 0;
    let avgDurationSeconds = 0;

    for (const row of data.rows) {
      if (viewsIdx !== -1 && typeof row[viewsIdx] === "number") {
        totalViews += row[viewsIdx];
      }
      if (watchTimeIdx !== -1 && typeof row[watchTimeIdx] === "number") {
        totalMinutesWatched += row[watchTimeIdx];
      }
      if (avgDurationIdx !== -1 && typeof row[avgDurationIdx] === "number") {
        avgDurationSeconds = row[avgDurationIdx];
      }
    }

    // Format views into human readable standard (e.g. 134K+)
    let formattedViews = "";
    if (totalViews >= 1000000) {
      formattedViews = (totalViews / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (totalViews >= 1000) {
      formattedViews = Math.round(totalViews / 1000) + "K+";
    } else {
      formattedViews = String(totalViews);
    }

    // Format watch time in hours
    const totalHours = Math.round(totalMinutesWatched / 60);
    let watchTimeHours = "";
    if (totalHours >= 1000) {
      watchTimeHours = (totalHours / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
      watchTimeHours = String(totalHours);
    }

    // Format average duration as mm:ss
    const minutes = Math.floor(avgDurationSeconds / 60);
    const seconds = Math.round(avgDurationSeconds % 60);
    const avgViewDuration = `${minutes}:${String(seconds).padStart(2, "0")}`;

    return {
      rawViews: totalViews,
      formattedViews,
      rawWatchTimeMinutes: totalMinutesWatched,
      watchTimeHours,
      avgViewDuration,
      startDate,
      endDate,
      source: "youtube_studio_analytics",
    };
  } catch (err) {
    console.error("Failed to query YouTube Analytics API:", err);
    return null;
  }
}
