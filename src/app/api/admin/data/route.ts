import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "site-data.json");
const backupDir = path.join(process.cwd(), "src", "data", "backups");

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, "utf8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to read site data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newData = await req.json();
    const formatted = JSON.stringify(newData, null, 2);

    // Write main data file
    await fs.writeFile(dataFilePath, formatted, "utf8");

    // Automatic server-side backup snapshot
    try {
      await fs.mkdir(backupDir, { recursive: true });
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backupPath = path.join(backupDir, `site-data-${timestamp}.json`);
      await fs.writeFile(backupPath, formatted, "utf8");

      // Maintain rolling limit of 20 backups
      const files = await fs.readdir(backupDir);
      const jsonBackups = files.filter(f => f.startsWith("site-data-") && f.endsWith(".json")).sort();
      if (jsonBackups.length > 20) {
        const toDelete = jsonBackups.slice(0, jsonBackups.length - 20);
        for (const file of toDelete) {
          await fs.unlink(path.join(backupDir, file)).catch(() => {});
        }
      }
    } catch {
      // Ignore backup error if write succeeded
    }

    return NextResponse.json({ success: true, data: newData });
  } catch {
    return NextResponse.json({ error: "Failed to save site data" }, { status: 500 });
  }
}
