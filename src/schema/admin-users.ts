import { getKnex } from "@/lib/db";
import { AdminUser } from "@/lib/auth-store";

export async function createAdminUsersTable() {
  const k = getKnex();
  if (!(await k.schema.hasTable("admin_users"))) {
    await k.schema.createTable("admin_users", (t) => {
      t.string("id", 64).primary();
      t.string("name", 128).notNullable();
      t.string("email", 128).notNullable().unique();
      t.string("password", 255).notNullable();
      t.string("role", 32).notNullable().defaultTo("Editor");
      t.text("permissions_json");
      t.string("recovery_key", 64).notNullable();
      t.string("status", 32).notNullable().defaultTo("Active");
      t.dateTime("last_login");
      t.timestamp("created_at").defaultTo(k.raw("CURRENT_TIMESTAMP"));
      t.timestamp("updated_at").defaultTo(k.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  }
}

export async function getAdminUsersFromDb(): Promise<AdminUser[]> {
  const k = getKnex();
  const rows = await k("admin_users").select("*").orderBy("created_at", "asc");

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

export async function syncAdminUsersToDb(users: AdminUser[]) {
  const k = getKnex();
  await k("admin_users").truncate();

  if (users.length > 0) {
    const rows = users.map((u) => ({
      id: u.id || `admin-${Date.now()}`,
      name: u.name ? u.name.trim() : "",
      email: u.email ? u.email.trim() : "",
      password: u.password,
      role: u.role || "Editor",
      permissions_json: JSON.stringify(u.permissions || []),
      recovery_key: u.recoveryKey || `AQ-SEC-${Math.floor(1000 + Math.random() * 9000)}`,
      status: u.status || "Active",
      last_login: u.lastLogin ? new Date(u.lastLogin) : new Date(),
    }));
    await k("admin_users").insert(rows);
  }
}

export async function updateAdminUserPassword(id: string, newPassword: string, lastLogin: Date = new Date()) {
  const k = getKnex();
  await k("admin_users")
    .where("id", id)
    .update({
      password: newPassword,
      last_login: lastLogin,
    });
}
