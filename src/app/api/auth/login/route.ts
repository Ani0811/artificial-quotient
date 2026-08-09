import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminPassword, getAdminUsers, saveAdminUsers } from "@/lib/auth-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
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

    // Try matching email + password
    if (email) {
      const targetUserIndex = adminUsers.findIndex(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (targetUserIndex !== -1) {
        const user = adminUsers[targetUserIndex];
        if (user.status !== "Active") {
          return NextResponse.json(
            { success: false, message: "This admin account has been deactivated." },
            { status: 403 }
          );
        }

        if (user.password === password || password === masterPassword) {
          // Update last login
          adminUsers[targetUserIndex].lastLogin = new Date().toISOString();
          await saveAdminUsers(adminUsers);

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

          return NextResponse.json({ success: true, user: adminUsers[targetUserIndex] });
        }
      }
    }

    // Try matching password against any active user or master password
    const matchingUser = adminUsers.find(
      (u) => u.status === "Active" && u.password === password
    );

    if (password === masterPassword || matchingUser) {
      let userId = "admin-1"; // Fallback to primary admin
      if (matchingUser) {
        userId = matchingUser.id;
        const idx = adminUsers.findIndex((u) => u.id === matchingUser.id);
        if (idx !== -1) {
          adminUsers[idx].lastLogin = new Date().toISOString();
          await saveAdminUsers(adminUsers);
        }
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

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Invalid administrator credentials." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
