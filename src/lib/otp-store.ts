export interface OTPRecord {
  code: string;
  expiresAt: number;
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
  
  // Store it with a 5 minute expiration
  otpStore.set(userId, {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });
  
  // LOG FOR LOCAL TESTING:
  console.log(`\n\n[SECURITY] 2FA OTP for User ${userId}: ${code}\n\n`);

  return code;
}

export function verifyOTP(userId: string, code: string): boolean {
  const record = otpStore.get(userId);
  
  if (!record) return false;
  
  // Check if expired
  if (Date.now() > record.expiresAt) {
    otpStore.delete(userId);
    return false;
  }
  
  // Check if code matches
  if (record.code === code) {
    otpStore.delete(userId); // Consume the OTP
    return true;
  }
  
  return false;
}
