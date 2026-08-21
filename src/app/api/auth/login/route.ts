import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminPassword, getAdminUsers, saveAdminUsers } from "@/lib/auth-store";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
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
      const userIndex = adminUsers.findIndex(
        (u) => u.email.toLowerCase() === normalizedEmail
      );

      if (userIndex === -1) {
        return NextResponse.json(
          { success: false, message: "Invalid administrator credentials. Permission to access the Admin Portal must be granted by an existing System Administrator." },
          { status: 401 }
        );
      }

      const user = adminUsers[userIndex];

      if (user.status !== "Active") {
        return NextResponse.json(
          { success: false, message: "Access Denied: This account is inactive. Permission must be granted by an active System Administrator." },
          { status: 403 }
        );
      }

      if (user.password === password || password === masterPassword) {
        // Update last login timestamp
        adminUsers[userIndex].lastLogin = new Date().toISOString();
        await saveAdminUsers(adminUsers);

        // Set session cookies
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
          message: `Welcome back, ${user.name}! Redirecting...`,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
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

      return NextResponse.json({
        success: true,
        message: "Authenticated with Master Key! Redirecting...",
        user: {
          id: userId,
          name: primaryAdmin?.name || "System Admin",
          email: primaryAdmin?.email || "admin@artificialquotient.com",
          role: primaryAdmin?.role || "Super Admin",
        },
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
