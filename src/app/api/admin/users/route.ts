import { NextResponse } from "next/server";
import { initDatabase } from "@/lib/db";
import { getAdminUsersFromDb, syncAdminUsersToDb } from "@/schema";
import fs from "fs/promises";
import path from "path";

const usersFilePath = path.join(process.cwd(), "src", "data", "admin-users.json");

export async function GET() {
  try {
    await initDatabase();
    const users = await getAdminUsersFromDb();

    if (users && users.length > 0) {
      return NextResponse.json({ success: true, users, dbStatus: "Connected to MySQL (AQ-Dashboard) via Knex Schema" });
    }

    // Fallback to JSON file if table empty
    const fileContents = await fs.readFile(usersFilePath, "utf8");
    const jsonUsers = JSON.parse(fileContents);
    return NextResponse.json({ success: true, users: jsonUsers, dbStatus: "Fallback JSON Store" });
  } catch (err: any) {
    console.error("GET admin users error:", err);
    try {
      const fileContents = await fs.readFile(usersFilePath, "utf8");
      const users = JSON.parse(fileContents);
      return NextResponse.json({ success: true, users });
    } catch {
      return NextResponse.json({ success: false, users: [] }, { status: 500 });
    }
  }
}

export async function POST(req: Request) {
  try {
    const { users } = await req.json();
    if (!Array.isArray(users)) {
      return NextResponse.json({ success: false, message: "Invalid users list" }, { status: 400 });
    }

    await initDatabase();
    await syncAdminUsersToDb(users);

    // Sync to JSON file backup
    const formatted = JSON.stringify(users, null, 2);
    await fs.writeFile(usersFilePath, formatted, "utf8");

    return NextResponse.json({ success: true, users, message: "Saved admin users to MySQL via Knex Schema Modules!" });
  } catch (err: any) {
    console.error("POST admin users error:", err);
    return NextResponse.json({ success: false, message: err.message || "Failed to update admin users" }, { status: 500 });
  }
}
