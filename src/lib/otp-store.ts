// Shared in-memory OTP store (server-side singleton)
export const otpStore: Record<string, { otp: string; expires: number }> = {};
