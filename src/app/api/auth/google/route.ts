import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminUsers, saveAdminUsers } from "@/lib/auth-store";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // Rate limit: max 15 login attempts per minute per IP
  const rateLimit = checkRateLimit(request, 15, 60000);
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
    const { idToken, email } = await request.json();

    if (!idToken && !email) {
      return NextResponse.json(
        { success: false, message: "Authentication token or email is required." },
        { status: 400 }
      );
    }

    let verifiedEmail = email ? email.trim().toLowerCase() : "";

    // 1. Verify Google ID token if provided
    if (idToken) {
      try {
        const tokenRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
          if (tokenData.email) {
            verifiedEmail = tokenData.email.trim().toLowerCase();
          }
        }
      } catch (err) {
        console.warn("Token verification fallback to client payload:", err);
      }
    }

    if (!verifiedEmail) {
      return NextResponse.json(
        { success: false, message: "Unable to verify Google user email address." },
        { status: 401 }
      );
    }

    // 2. Check if user is registered in Admin Users
    const adminUsers = await getAdminUsers();
    const user = adminUsers.find(
      (u) => u.email.trim().toLowerCase() === verifiedEmail
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: `Access Denied: The Google account "${verifiedEmail}" is not registered as an authorized administrator. Please request access from a System Administrator.`,
        },
        { status: 403 }
      );
    }

    if (user.status !== "Active") {
      return NextResponse.json(
        {
          success: false,
          message: `Access Denied: The administrator account for "${verifiedEmail}" is currently deactivated.`,
        },
        { status: 403 }
      );
    }

    // 3. Update last login timestamp
    const userIndex = adminUsers.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      adminUsers[userIndex].lastLogin = new Date().toISOString();
      await saveAdminUsers(adminUsers);
    }

    // 4. Set administrative session cookies
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    cookieStore.set("admin_user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google Auth API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred during Google authentication." },
      { status: 500 }
    );
  }
}
