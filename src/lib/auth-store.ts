import fs from "fs/promises";
import path from "path";
import { initDatabase } from "./db";
import {
  getAdminUsersFromDb,
  syncAdminUsersToDb,
  updateAdminUserPassword as updateAdminUserPasswordDb,
} from "@/schema/admin-users";

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
    const dbUsers = await getAdminUsersFromDb();
    if (dbUsers && dbUsers.length > 0) {
      return dbUsers;
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
        email: process.env.ADMIN_EMAIL || "admin@artificialquotient.com",
        password: currentAdminPassword,
        role: "Super Admin",
        permissions: ["hero", "stats", "case-studies", "what-performs", "brands", "backup", "users"],
        recoveryKey: process.env.ADMIN_RECOVERY_KEY || "AQ-SEC-0000",
        status: "Active",
        lastLogin: new Date().toISOString(),
      },
    ];
  }
}

export async function saveAdminUsers(users: AdminUser[]): Promise<void> {
  try {
    await initDatabase();
    await syncAdminUsersToDb(users);
  } catch (err) {
    console.error("MySQL save failed in saveAdminUsers:", err);
  }

  const formatted = JSON.stringify(users, null, 2);
  await fs.writeFile(usersFilePath, formatted, "utf8");
}

export async function updateAdminUserPassword(id: string, newPassword: string): Promise<void> {
  const lastLogin = new Date();
  
  try {
    await initDatabase();
    await updateAdminUserPasswordDb(id, newPassword, lastLogin);
  } catch (err) {
    console.error("MySQL update failed in updateAdminUserPassword:", err);
  }

  try {
    const fileContents = await fs.readFile(usersFilePath, "utf8");
    const users: AdminUser[] = JSON.parse(fileContents);
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) {
      users[idx].password = newPassword;
      users[idx].lastLogin = lastLogin.toISOString();
      const formatted = JSON.stringify(users, null, 2);
      await fs.writeFile(usersFilePath, formatted, "utf8");
    }
  } catch (err) {
    console.error("JSON update failed in updateAdminUserPassword:", err);
  }
}
