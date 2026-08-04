import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setAdminPassword } from "@/lib/auth-store";

export const dynamic = "force-dynamic";

// Valid recovery keys / master keys for verification
const VALID_RECOVERY_KEYS = [
  "AQ-RESET-2026",
  "sponsor@artificialquotient.com",
  "admin",
];

export async function POST(request: Request) {
  try {
    const { recoveryKey, newPassword } = await request.json();

    if (!recoveryKey || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Recovery key and new password are required." },
        { status: 400 }
      );
    }

    const isKeyValid = VALID_RECOVERY_KEYS.some(
      (key) => key.toLowerCase() === recoveryKey.trim().toLowerCase()
    );

    if (!isKeyValid) {
      return NextResponse.json(
        { success: false, message: "Invalid Recovery Key or Admin Security Email." },
        { status: 401 }
      );
    }

    if (newPassword.length < 4) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 4 characters long." },
        { status: 400 }
      );
    }

    // Update the password in memory
    setAdminPassword(newPassword);

    // Automatically authenticate the user
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Password reset successful! You are now logged in.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
