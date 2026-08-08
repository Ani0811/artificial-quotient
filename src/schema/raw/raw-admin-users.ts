import { getKnex } from "@/lib/db";
import { AdminUser } from "@/lib/auth-store";

export async function getRawAdminUsers(): Promise<AdminUser[]> {
  const k = getKnex();
  const res: any = await k.raw("SELECT * FROM admin_users ORDER BY created_at ASC");
  const rows = res[0] || [];

  return rows.map((u: any) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    password: u.password,
    role: u.role,
    permissions: u.permissions_json ? JSON.parse(u.permissions_json) : [],
    recoveryKey: u.recovery_key,
    status: u.status,
    lastLogin: u.last_login ? new Date(u.last_login).toISOString() : undefined,
  }));
}

export async function syncRawAdminUsers(users: AdminUser[]) {
  const k = getKnex();
  await k.raw("TRUNCATE TABLE admin_users;");

  if (users.length > 0) {
    for (const u of users) {
      await k.raw(
        `INSERT INTO admin_users
          (id, name, email, password, role, permissions_json, recovery_key, status, last_login)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          u.id || `admin-${Date.now()}`,
          u.name,
          u.email,
          u.password,
          u.role || "Editor",
          JSON.stringify(u.permissions || []),
          u.recoveryKey || `AQ-SEC-${Math.floor(1000 + Math.random() * 9000)}`,
          u.status || "Active",
          u.lastLogin ? new Date(u.lastLogin) : new Date(),
        ]
      );
    }
  }
}
