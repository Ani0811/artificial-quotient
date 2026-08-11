import { NextResponse } from "next/server";
import { initDatabase } from "@/lib/db";
import { 
  getSiteConfig, 
  upsertSiteConfig, 
  getSponsorCaseStudies, 
  syncSponsorCaseStudies, 
  getWhatPerforms, 
  syncWhatPerforms, 
  getToolItems, 
  syncToolItems 
} from "@/schema";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "src", "data", "site-data.json");
const backupDir = path.join(process.cwd(), "src", "data", "backups");

export async function GET() {
  try {
    await initDatabase();

    const siteConfigData = await getSiteConfig();
    if (siteConfigData) {
      const sponsorResults = await getSponsorCaseStudies();
      const whatPerforms = await getWhatPerforms();
      const tools = await getToolItems();

      return NextResponse.json(
        {
          stats: siteConfigData.stats,
          rates: siteConfigData.rates,
          demographics: siteConfigData.demographics,
          geographies: siteConfigData.geographies,
          sponsorResults,
          whatPerforms,
          tools,
          dbStatus: "Connected to MySQL (AQ-Dashboard) via Knex",
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=30, stale-while-revalidate=59",
          },
        }
      );
    }

    // Fallback to JSON if database rows empty
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return NextResponse.json({ ...data, dbStatus: "Fallback JSON Data Store" });
  } catch (err: any) {
    console.error("GET site data error:", err);
    try {
      const fileContents = await fs.readFile(filePath, "utf8");
      const data = JSON.parse(fileContents);
      return NextResponse.json({ ...data, dbStatus: "Fallback JSON (MySQL Error)" });
    } catch {
      return NextResponse.json({ error: "Failed to read site data" }, { status: 500 });
    }
  }
}

import { cookies } from "next/headers";
import { getAdminUsers } from "@/lib/auth-store";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("admin_user_id")?.value;
    if (userId) {
      const users = await getAdminUsers();
      const currentUser = users.find((u) => u.id === userId && u.status === "Active");
      if (currentUser?.role === "Viewer") {
        return NextResponse.json(
          { success: false, message: "Forbidden: Viewer accounts have read-only access." },
          { status: 403 }
        );
      }
    }

    const data = await request.json();
    await initDatabase();

    // Delegate database operations to specialized schema modules
    await upsertSiteConfig(data);

    if (data.sponsorResults && Array.isArray(data.sponsorResults)) {
      await syncSponsorCaseStudies(data.sponsorResults);
    }

    if (data.whatPerforms && Array.isArray(data.whatPerforms)) {
      await syncWhatPerforms(data.whatPerforms);
    }

    if (data.tools && Array.isArray(data.tools)) {
      await syncToolItems(data.tools);
    }

    // Also write JSON file backup snapshot
    const formattedData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, formattedData, "utf8");

    await fs.mkdir(backupDir, { recursive: true });
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const snapshotPath = path.join(backupDir, `site-data-${timestamp}.json`);
    await fs.writeFile(snapshotPath, formattedData, "utf8");

    return NextResponse.json({ success: true, message: "Saved to MySQL (AQ-Dashboard) via Knex Schema Modules!" });
  } catch (err: any) {
    console.error("POST site data error:", err);
    return NextResponse.json({ success: false, message: err.message || "Failed to update site data" }, { status: 500 });
  }
}
