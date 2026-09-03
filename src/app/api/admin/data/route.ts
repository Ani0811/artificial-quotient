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
  syncBrandItems,
  getCountriesFromDb
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

import defaultSiteData from "@/data/site-data.json";

const filePath = path.join(process.cwd(), "src", "data", "site-data.json");
const backupDir = path.join(process.cwd(), "src", "data", "backups");

import { syncYouTubeData } from "@/lib/youtube-sync";

export async function GET() {
  try {
    await initDatabase();

    // Trigger automatic live YouTube synchronization (throttled by 15-minute cache)
    try {
      await syncYouTubeData({ force: false });
    } catch (ytErr) {
      console.warn("Background YouTube auto-sync warning in GET /api/admin/data:", ytErr);
    }

    const siteConfigData = await getSiteConfig();
    const allDbCountries = await getCountriesFromDb();

    if (siteConfigData) {
      let sponsorResults = await getSponsorCaseStudies();
      let whatPerforms = await getWhatPerforms();
      let tools = await getToolItems();
      let brandItems = await getBrandItems();

      // Auto-sync missing/outdated seed data into MySQL database
      try {
        let fileData: any = defaultSiteData;
        try {
          const fileContents = await fs.readFile(filePath, "utf8");
          fileData = JSON.parse(fileContents);
        } catch {
          // Use bundled defaultSiteData
        }

        if (fileData.sponsorResults && Array.isArray(fileData.sponsorResults)) {
          const hasAllCases = fileData.sponsorResults.every((fileCs: any) =>
            sponsorResults.some((dbCs: any) => 
              dbCs.id === fileCs.id && 
              dbCs.partnerName === fileCs.partnerName && 
              (dbCs.logoUrl || "") === (fileCs.logoUrl || "") &&
              (dbCs.thumbnailUrl || "") === (fileCs.thumbnailUrl || "") &&
              (dbCs.ytUrl || "") === (fileCs.ytUrl || "") &&
              Boolean(dbCs.hidden) === Boolean(fileCs.hidden)
            )
          ) && sponsorResults.length === fileData.sponsorResults.length;

          if (!hasAllCases) {
            await syncSponsorCaseStudies(fileData.sponsorResults);
            sponsorResults = await getSponsorCaseStudies();
          }
        }

        if (fileData.brandItems && Array.isArray(fileData.brandItems)) {
          const hasAllBrands = fileData.brandItems.every((fileB: any) =>
            brandItems.some((dbB: any) => 
              dbB.id === fileB.id && 
              dbB.name === fileB.name && 
              (dbB.logoUrl || "") === (fileB.logoUrl || "") &&
              (dbB.category || "") === (fileB.category || "") &&
              (dbB.tagline || "") === (fileB.tagline || "") &&
              Boolean(dbB.hidden) === Boolean(fileB.hidden)
            )
          ) && brandItems.length === fileData.brandItems.length;

          if (!hasAllBrands) {
            await syncBrandItems(fileData.brandItems);
            brandItems = await getBrandItems();
          }
        }

        if (fileData.whatPerforms && Array.isArray(fileData.whatPerforms)) {
          const hasOutdatedData = whatPerforms.some(
            (dbW: any) => dbW.title === "Revid.AI" || dbW.title === "Flashloop AI" || dbW.title === "Marky Agent"
          );
          const hasAllWhatPerforms = fileData.whatPerforms.every((fileW: any) =>
            whatPerforms.some((dbW: any) => 
              dbW.id === fileW.id && 
              dbW.title === fileW.title && 
              dbW.views === fileW.views &&
              (dbW.thumbnail || "") === (fileW.thumbnail || "") &&
              (dbW.ytUrl || "") === (fileW.ytUrl || "") &&
              Boolean(dbW.hidden) === Boolean(fileW.hidden)
            )
          ) && whatPerforms.length === fileData.whatPerforms.length;

          if (hasOutdatedData || !hasAllWhatPerforms) {
            await syncWhatPerforms(fileData.whatPerforms);
            whatPerforms = await getWhatPerforms();
          }
        }

        if (fileData.tools && Array.isArray(fileData.tools)) {
          const hasAllTools = fileData.tools.every((fileT: any) =>
            tools.some((dbT: any) => dbT.id === fileT.id && dbT.name === fileT.name)
          ) && tools.length === fileData.tools.length;

          if (!hasAllTools) {
            await syncToolItems(fileData.tools);
            tools = await getToolItems();
          }
        }
      } catch (e) {
        console.warn("Auto-sync warning in GET /api/admin/data:", e);
      }

      return NextResponse.json(
        {
          stats: siteConfigData.stats,
          heroConfig: siteConfigData.heroConfig,
          rates: siteConfigData.rates,
          demographics: siteConfigData.demographics,
          geographies: siteConfigData.geographies,
          audienceInterests: siteConfigData.audienceInterests,
          shoppingInterests: siteConfigData.shoppingInterests,
          sponsorResults,
          whatPerforms,
          tools,
          brandItems,
          countries: allDbCountries,
          dbStatus: "Connected to MySQL (AQ-Dashboard) via Knex",
        },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
          },
        }
      );
    }

    // Fallback to latest JSON if database rows empty
    let fallbackData = defaultSiteData;
    try {
      const fileContents = await fs.readFile(filePath, "utf8");
      fallbackData = JSON.parse(fileContents);
    } catch {}

    return NextResponse.json(
      { ...fallbackData, dbStatus: "Fallback JSON Data Store" },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (err: any) {
    console.error("GET site data error:", err);
    let fallbackData = defaultSiteData;
    try {
      const fileContents = await fs.readFile(filePath, "utf8");
      fallbackData = JSON.parse(fileContents);
    } catch {}

    return NextResponse.json(
      { ...fallbackData, dbStatus: "Fallback Bundled JSON (MySQL Error)" },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}

import { verifyAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const auth = await verifyAdminSession(undefined, false);
  if (!auth.isAuthenticated || auth.errorResponse) {
    return NextResponse.json(
      { success: false, message: auth.errorResponse?.message || "Unauthorized" },
      { status: auth.errorResponse?.status || 401 }
    );
  }

  try {
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
