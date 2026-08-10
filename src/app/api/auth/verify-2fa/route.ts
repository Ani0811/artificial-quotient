import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminUsers, saveAdminUsers } from "@/lib/auth-store";
import { verifyOTP } from "@/lib/otp-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { userId, code } = await request.json();

    if (!userId || !code) {
      return NextResponse.json(
        { success: false, message: "User ID and verification code are required" },
        { status: 400 }
      );
    }

    const isValid = verifyOTP(userId, code);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired verification code." },
        { status: 401 }
      );
    }

    const adminUsers = await getAdminUsers();
    const userIndex = adminUsers.findIndex((u) => u.id === userId);

    if (userIndex !== -1) {
      adminUsers[userIndex].lastLogin = new Date().toISOString();
      await saveAdminUsers(adminUsers);
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    cookieStore.set("admin_user_id", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Authentication successful" });
  } catch (error) {
    console.error("2FA Verification Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
