import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setAdminPassword, getAdminUsers, updateAdminUserPassword } from "@/lib/auth-store";

export const dynamic = "force-dynamic";

function getEnvRecoveryKeys(): string[] {
  const envKeys = process.env.ADMIN_RECOVERY_KEYS;
  if (!envKeys) return [];
  return envKeys.split(",").map((key) => key.trim()).filter(Boolean);
}

export async function POST(request: Request) {
  try {
    const { email, recoveryKey, newPassword } = await request.json();

    if (!recoveryKey || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Security recovery key and new password are required." },
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

    const normalizedKey = recoveryKey.trim().toLowerCase();

    // Check if recovery key matches an admin user
    let matchedUserIndex = -1;

    if (email) {
      const normalizedEmail = email.trim().toLowerCase();
      matchedUserIndex = adminUsers.findIndex(
        (u) =>
          u.email.toLowerCase() === normalizedEmail &&
          u.recoveryKey.trim().toLowerCase() === normalizedKey
      );
    }

    if (matchedUserIndex === -1) {
      matchedUserIndex = adminUsers.findIndex(
        (u) => u.recoveryKey.trim().toLowerCase() === normalizedKey
      );
    }

    const isEnvKeyValid = envKeys.some((k) => k.toLowerCase() === normalizedKey);

    if (matchedUserIndex === -1 && !isEnvKeyValid) {
      return NextResponse.json(
        { success: false, message: "Invalid Security Recovery Key or Admin Email." },
        { status: 401 }
      );
    }

    // Update password
    if (matchedUserIndex !== -1) {
      const user = adminUsers[matchedUserIndex];
      await updateAdminUserPassword(user.id, newPassword);
    } else {
      // Fallback: If no user matches but env key matched, we update master password
      setAdminPassword(newPassword);
    }

    // Automatically authenticate user
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    
    const userId = matchedUserIndex !== -1 ? adminUsers[matchedUserIndex].id : "admin-1";
    cookieStore.set("admin_user_id", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Password reset successfully! Authenticated and redirecting...",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
