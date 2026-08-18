import { cookies } from "next/headers";
import { getAdminUsers, AdminUser } from "@/lib/auth-store";

export interface AuthResult {
  isAuthenticated: boolean;
  user: AdminUser | null;
  errorResponse?: { message: string; status: number };
}

/**
 * Validates admin authentication session and checks optional permission.
 */
export async function verifyAdminSession(
  requiredPermission?: string,
  allowViewer: boolean = false
): Promise<AuthResult> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const userId = cookieStore.get("admin_user_id")?.value;

  if (!session || session !== "authenticated" || !userId) {
    return {
      isAuthenticated: false,
      user: null,
      errorResponse: { message: "Unauthorized: Active administrative session required.", status: 401 },
    };
  }

  const users = await getAdminUsers();
  const currentUser = users.find((u) => u.id === userId && u.status === "Active");

  if (!currentUser) {
    return {
      isAuthenticated: false,
      user: null,
      errorResponse: { message: "Unauthorized: User account not found or is inactive.", status: 401 },
    };
  }

  if (!allowViewer && currentUser.role === "Viewer") {
    return {
      isAuthenticated: true,
      user: currentUser,
      errorResponse: { message: "Forbidden: Viewer accounts have read-only access.", status: 403 },
    };
  }

  if (requiredPermission) {
    const isSuperAdmin = currentUser.role === "Super Admin";
    const hasPermission = currentUser.permissions?.includes(requiredPermission);

    if (!isSuperAdmin && !hasPermission) {
      return {
        isAuthenticated: true,
        user: currentUser,
        errorResponse: { message: `Forbidden: You do not have '${requiredPermission}' permissions.`, status: 403 },
      };
    }
  }

  return {
    isAuthenticated: true,
    user: currentUser,
  };
}
