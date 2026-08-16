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
  syncToolItems,
  getBrandItems,
  syncBrandItems
} from "@/schema";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
    },
  });
}

const filePath = path.join(process.cwd(), "src", "data", "site-data.json");
const backupDir = path.join(process.cwd(), "src", "data", "backups");

export async function GET() {
  try {
    await initDatabase();

    const siteConfigData = await getSiteConfig();
    if (siteConfigData) {
      let sponsorResults = await getSponsorCaseStudies();
      let whatPerforms = await getWhatPerforms();
      let tools = await getToolItems();
      let brandItems = await getBrandItems();

      // Auto-sync missing/outdated seed data from site-data.json into MySQL database
      try {
        const fileContents = await fs.readFile(filePath, "utf8");
        const fileData = JSON.parse(fileContents);

        if (fileData.sponsorResults && Array.isArray(fileData.sponsorResults)) {
          const hasAllCases = fileData.sponsorResults.every((fileCs: any) =>
            sponsorResults.some((dbCs: any) => dbCs.id === fileCs.id && dbCs.partnerName === fileCs.partnerName && (dbCs.logoUrl || "") === (fileCs.logoUrl || ""))
          ) && sponsorResults.length >= fileData.sponsorResults.length;

          if (!hasAllCases) {
            await syncSponsorCaseStudies(fileData.sponsorResults);
            sponsorResults = await getSponsorCaseStudies();
          }
        }

        if (fileData.brandItems && Array.isArray(fileData.brandItems)) {
          const hasAllBrands = fileData.brandItems.every((fileB: any) =>
            brandItems.some((dbB: any) => dbB.id === fileB.id && (dbB.logoUrl || "") === (fileB.logoUrl || ""))
          ) && brandItems.length === fileData.brandItems.length;

          if (!hasAllBrands) {
            await syncBrandItems(fileData.brandItems);
            brandItems = await getBrandItems();
          }
        }
      } catch {
        // Ignore file sync check error
      }

      return NextResponse.json(
        {
          stats: siteConfigData.stats,
          rates: siteConfigData.rates,
          demographics: siteConfigData.demographics,
          geographies: siteConfigData.geographies,
          audienceInterests: siteConfigData.audienceInterests,
          shoppingInterests: siteConfigData.shoppingInterests,
          sponsorResults,
          whatPerforms,
          tools,
          brandItems,
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

    if (data.brandItems && Array.isArray(data.brandItems)) {
      await syncBrandItems(data.brandItems);
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
