export interface OTPRecord {
  code: string;
  expiresAt: number;
  attempts: number;
}

const globalForOTP = global as unknown as {
  otpStore: Map<string, OTPRecord>;
};

if (!globalForOTP.otpStore) {
  globalForOTP.otpStore = new Map<string, OTPRecord>();
}

export const otpStore = globalForOTP.otpStore;

export function generateOTP(userId: string): string {
  // Generate a random 6 digit numeric code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store it with a 5 minute expiration and 0 failed attempts
  otpStore.set(userId, {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000,
    attempts: 0,
  });
  
  if (process.env.NODE_ENV === "development") {
    console.log(`\n\n[DEV SECURITY] 2FA OTP for User ${userId}: ${code}\n\n`);
  }

  return code;
}

export function verifyOTP(userId: string, code: string): { valid: boolean; message?: string } {
  const record = otpStore.get(userId);
  
  if (!record) {
    return { valid: false, message: "No active verification code found. Please request a new code." };
  }
  
  // Check if expired
  if (Date.now() > record.expiresAt) {
    otpStore.delete(userId);
    return { valid: false, message: "Verification code has expired. Please request a new code." };
  }

  // Increment failed attempts
  record.attempts += 1;

  if (record.attempts > 5) {
    otpStore.delete(userId);
    return { valid: false, message: "Too many failed attempts. This code has been invalidated for security. Please request a new code." };
  }
  
  // Check if code matches
  if (record.code === code.trim()) {
    otpStore.delete(userId); // Consume the OTP immediately on success
    return { valid: true };
  }
  
  const remaining = 5 - record.attempts;
  return { 
    valid: false, 
    message: `Invalid verification code. ${remaining > 0 ? `${remaining} attempts remaining.` : "Code invalidated."}` 
  };
}
