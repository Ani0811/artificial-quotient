import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminUsers, updateAdminUserPassword } from "@/lib/auth-store";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

function getEnvRecoveryKeys(): string[] {
  const envKeys = process.env.ADMIN_RECOVERY_KEYS;
  if (!envKeys) return [];
  return envKeys.split(",").map((key) => key.trim()).filter(Boolean);
}

export async function POST(request: Request) {
  // Rate limit: max 5 attempts per minute per IP
  const rateLimit = checkRateLimit(request, 5, 60000);
  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        message: `Too many password reset attempts. Please wait ${Math.ceil(rateLimit.resetMs / 1000)} seconds before trying again.`,
      },
      { status: 429 }
    );
  }

  try {
    const { email, recoveryKey, newPassword } = await request.json();

    if (!email || !recoveryKey || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Admin Email Address, Security Recovery Key, and New Password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 4) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 4 characters long." },
        { status: 400 }
      );
    }

    const adminUsers = await getAdminUsers();
    const envKeys = getEnvRecoveryKeys();

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedKey = recoveryKey.trim().toLowerCase();

    // 1. Find user strictly by email
    const targetUser = adminUsers.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "No admin account found matching this email address." },
        { status: 404 }
      );
    }

    if (targetUser.status !== "Active") {
      return NextResponse.json(
        { success: false, message: "This admin account is inactive. Please contact a System Administrator." },
        { status: 403 }
      );
    }

    // 2. Verify recovery key against target user or env master key
    const isUserKeyMatch = targetUser.recoveryKey.trim().toLowerCase() === normalizedKey;
    const isEnvKeyValid = envKeys.some((k) => k.toLowerCase() === normalizedKey);

    if (!isUserKeyMatch && !isEnvKeyValid) {
      return NextResponse.json(
        { success: false, message: "Invalid Security Recovery Key for this admin email address." },
        { status: 401 }
      );
    }

    // 3. Update password safely for this specific user
    await updateAdminUserPassword(targetUser.id, newPassword);

    // 4. Authenticate user strictly under their own account identity
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    
    cookieStore.set("admin_user_id", targetUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: targetUser,
      message: `Password reset successfully for ${targetUser.email}! Authenticated as ${targetUser.role}.`,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
