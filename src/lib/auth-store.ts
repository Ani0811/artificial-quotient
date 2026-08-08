import fs from "fs/promises";
import path from "path";
import { getKnex, initDatabase } from "./db";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "Super Admin" | "Editor" | "Viewer";
  permissions: string[];
  recoveryKey: string;
  status: "Active" | "Inactive";
  lastLogin?: string;
}

const usersFilePath = path.join(process.cwd(), "src", "data", "admin-users.json");

let currentAdminPassword = process.env.ADMIN_PASSWORD || "admin123";

export function getAdminPassword(): string {
  return currentAdminPassword;
}

export function setAdminPassword(newPassword: string): void {
  currentAdminPassword = newPassword;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  try {
    await initDatabase();
    const k = getKnex();
    const rows = await k("admin_users").select("*").orderBy("created_at", "asc");

    if (rows && rows.length > 0) {
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
  } catch (err) {
    console.error("MySQL query failed in getAdminUsers:", err);
  }

  try {
    const fileContents = await fs.readFile(usersFilePath, "utf8");
    return JSON.parse(fileContents);
  } catch {
    return [
      {
        id: "admin-1",
        name: "Primary Admin",
        email: "admin@artificialquotient.com",
        password: currentAdminPassword,
        role: "Super Admin",
        permissions: ["stats", "case-studies", "what-performs", "tools", "blog", "backup", "users"],
        recoveryKey: "AQ-SEC-9842",
        status: "Active",
        lastLogin: new Date().toISOString(),
      },
    ];
  }
}

export async function saveAdminUsers(users: AdminUser[]): Promise<void> {
  try {
    await initDatabase();
    const k = getKnex();
    await k("admin_users").truncate();
    
    if (users.length > 0) {
      const rows = users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password,
        role: u.role,
        permissions_json: JSON.stringify(u.permissions || []),
        recovery_key: u.recoveryKey,
        status: u.status || "Active",
        last_login: u.lastLogin ? new Date(u.lastLogin) : new Date(),
      }));
      await k("admin_users").insert(rows);
    }
  } catch (err) {
    console.error("MySQL save failed in saveAdminUsers:", err);
  }

  const formatted = JSON.stringify(users, null, 2);
  await fs.writeFile(usersFilePath, formatted, "utf8");
}
