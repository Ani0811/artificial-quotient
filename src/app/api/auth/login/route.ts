import { NextResponse } from "next/server";
import { getAdminPassword, getAdminUsers } from "@/lib/auth-store";
import { generateOTP } from "@/lib/otp-store";
import { send2FACodeEmail } from "@/lib/email-service";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, 5, 60000);
  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        message: `Too many login attempts. Please wait ${Math.ceil(rateLimit.resetMs / 1000)} seconds before trying again.`,
      },
      { status: 429 }
    );
  }

  try {
    const { email, password } = await request.json();

    const masterPassword = getAdminPassword();
    const adminUsers = await getAdminUsers();

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    // 1. Strict email + password authentication
    if (email) {
      const normalizedEmail = email.trim().toLowerCase();
      const user = adminUsers.find(
        (u) => u.email.toLowerCase() === normalizedEmail
      );

      if (!user) {
        return NextResponse.json(
          { success: false, message: "Invalid administrator credentials. Permission to access the Admin Portal must be granted by an existing System Administrator." },
          { status: 401 }
        );
      }

      if (user.status !== "Active") {
        return NextResponse.json(
          { success: false, message: "Access Denied: This account is inactive. Permission must be granted by an active System Administrator." },
          { status: 403 }
        );
      }

      if (user.password === password || password === masterPassword) {
        // Generate OTP
        const code = generateOTP(user.id);
        
        // Send Email
        const emailSent = await send2FACodeEmail(user.email, code);
        if (!emailSent) {
          return NextResponse.json(
            { success: false, message: "Failed to send verification code. Please check email configuration." },
            { status: 500 }
          );
        }

        return NextResponse.json({ 
          success: true, 
          require2FA: true, 
          userId: user.id, 
          message: "Verification code sent to email." 
        });
      }

      return NextResponse.json(
        { success: false, message: "Invalid administrator credentials. Permission to access the Admin Portal must be granted by an existing System Administrator." },
        { status: 401 }
      );
    }

    // 2. Fallback for non-email master password login
    if (password === masterPassword) {
      const primaryAdmin = adminUsers.find((u) => u.status === "Active" && u.role === "Super Admin") || adminUsers[0];
      const userId = primaryAdmin?.id || "admin-1";
      const userEmail = primaryAdmin?.email || process.env.CONTACT_RECEIVER_EMAIL || "admin@artificialquotient.com";

      const code = generateOTP(userId);
      const emailSent = await send2FACodeEmail(userEmail, code);
      if (!emailSent) {
        return NextResponse.json(
          { success: false, message: "Failed to send verification code. Please check email configuration." },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        success: true, 
        require2FA: true, 
        userId: userId, 
        message: "Verification code sent to email." 
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid administrator credentials. Permission to access the Admin Portal must be granted by an existing System Administrator." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
