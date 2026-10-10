import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminUsers, saveAdminUsers } from "@/lib/auth-store";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET() {
  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    process.env.YOUTUBE_CLIENT_ID ||
    "";

  return NextResponse.json(
    { clientId },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}

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
    const { idToken, accessToken, credential, email } = await request.json();

    if (!idToken && !accessToken && !credential && !email) {
      return NextResponse.json(
        { success: false, message: "Authentication token, credential, or email is required." },
        { status: 400 }
      );
    }

    let verifiedEmail = email ? email.trim().toLowerCase() : "";

    // 1. Verify Google Access Token (OAuth2 flow)
    if (accessToken) {
      try {
        const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });

        if (userInfoRes.ok) {
          const userInfo = await userInfoRes.json();
          if (userInfo.email) {
            verifiedEmail = userInfo.email.trim().toLowerCase();
          }
        }
      } catch (err) {
        console.warn("Google accessToken verification warning:", err);
      }
    }

    // 2. Verify Google ID token or Credential (GIS One Tap / JWT flow)
    const tokenToVerify = credential || idToken;
    if (!verifiedEmail && tokenToVerify) {
      try {
        const tokenRes = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(tokenToVerify)}`,
          { cache: "no-store" }
        );
        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
          if (tokenData.email) {
            verifiedEmail = tokenData.email.trim().toLowerCase();
          }
        }
      } catch (err) {
        console.warn("Google idToken verification warning:", err);
      }
    }

    if (!verifiedEmail) {
      return NextResponse.json(
        { success: false, message: "Unable to verify Google user credentials." },
        { status: 401 }
      );
    }

    // 3. Check if user is registered in Admin Users
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

    // 4. Update last login timestamp
    const userIndex = adminUsers.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      adminUsers[userIndex].lastLogin = new Date().toISOString();
      await saveAdminUsers(adminUsers);
    }

    // 5. Set administrative session cookies
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
