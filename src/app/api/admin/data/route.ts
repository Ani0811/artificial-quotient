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

function sanitizeStats(rawStats: any) {
  const defaults = defaultSiteData.stats;
  const s = rawStats || {};
  return {
    ...defaults,
    ...s,
    subscribers: (s.subscribers && String(s.subscribers).trim() !== "" && s.subscribers !== "0") ? s.subscribers : defaults.subscribers,
    monthlyViews: (s.monthlyViews && String(s.monthlyViews).trim() !== "" && s.monthlyViews !== "0") ? s.monthlyViews : defaults.monthlyViews,
    videosCount: (s.videosCount && String(s.videosCount).trim() !== "" && s.videosCount !== "0") ? s.videosCount : defaults.videosCount,
    retention: (s.retention && String(s.retention).trim() !== "" && s.retention !== "0") ? s.retention : defaults.retention,
    uniqueViewers: (s.uniqueViewers && String(s.uniqueViewers).trim() !== "" && s.uniqueViewers !== "0") ? s.uniqueViewers : defaults.uniqueViewers,
  };
}

function sanitizeHeroConfig(rawHero: any, rawStats?: any) {
  const defaults = defaultSiteData.heroConfig;
  const h = rawHero || {};
  const currentMetric = (rawStats?.uniqueViewers && String(rawStats.uniqueViewers).trim() !== "" && rawStats.uniqueViewers !== "0")
    ? rawStats.uniqueViewers
    : (defaultSiteData.stats?.uniqueViewers || "130K+");

  let subheadline = h.subheadline || defaults.subheadline;
  if (typeof subheadline === "string" && /55k/i.test(subheadline)) {
    subheadline = subheadline.replace(/55k\+?/gi, currentMetric);
  }

  return {
    ...defaults,
    ...h,
    subheadline,
    subscribersCount: (h.subscribersCount && String(h.subscribersCount).trim() !== "" && h.subscribersCount !== "0") ? h.subscribersCount : defaults.subscribersCount,
    monthlyViewsCount: (h.monthlyViewsCount && String(h.monthlyViewsCount).trim() !== "" && h.monthlyViewsCount !== "0") ? h.monthlyViewsCount : defaults.monthlyViewsCount,
    subscribersBadge: (h.subscribersBadge && String(h.subscribersBadge).trim() !== "") ? h.subscribersBadge : defaults.subscribersBadge,
    monthlyViewsBadge: (h.monthlyViewsBadge && String(h.monthlyViewsBadge).trim() !== "") ? h.monthlyViewsBadge : defaults.monthlyViewsBadge,
    retentionPercent: (h.retentionPercent && String(h.retentionPercent).trim() !== "" && h.retentionPercent !== "0%") ? h.retentionPercent : defaults.retentionPercent,
    retentionLabel: (h.retentionLabel && String(h.retentionLabel).trim() !== "") ? h.retentionLabel : defaults.retentionLabel,
    retentionLeftText: (h.retentionLeftText && String(h.retentionLeftText).trim() !== "") ? h.retentionLeftText : defaults.retentionLeftText,
    retentionRightText: (h.retentionRightText && String(h.retentionRightText).trim() !== "") ? h.retentionRightText : defaults.retentionRightText,
  };
}

export async function GET() {
  // Trigger automatic live YouTube synchronization non-blockingly (throttled by 15-minute cache)
  try {
    syncYouTubeData({ force: false }).catch((ytErr) => {
      console.warn("Background YouTube auto-sync warning in GET /api/admin/data:", ytErr);
    });
  } catch { }

  try {
    const isDbReady = await initDatabase();

    if (!isDbReady) {
      let fallbackData: any = defaultSiteData;
      try {
        const fileContents = await fs.readFile(filePath, "utf8");
        fallbackData = JSON.parse(fileContents);
      } catch { }

      return NextResponse.json(
        {
          ...fallbackData,
          stats: sanitizeStats(fallbackData?.stats),
          heroConfig: sanitizeHeroConfig(fallbackData?.heroConfig, fallbackData?.stats),
          dbStatus: "Fallback Local JSON Store",
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

    const siteConfigData = await getSiteConfig();
    const allDbCountries = await getCountriesFromDb();

    if (siteConfigData) {
      let sponsorResults = await getSponsorCaseStudies();
      let whatPerforms = await getWhatPerforms();
      let tools = await getToolItems();
      let brandItems = await getBrandItems();

      // Only seed database tables if they are empty
      try {
        let fileData: any = defaultSiteData;
        try {
          const fileContents = await fs.readFile(filePath, "utf8");
          fileData = JSON.parse(fileContents);
        } catch {
          // Use bundled defaultSiteData
        }

        if (sponsorResults.length === 0 && fileData.sponsorResults && Array.isArray(fileData.sponsorResults) && fileData.sponsorResults.length > 0) {
          await syncSponsorCaseStudies(fileData.sponsorResults);
          sponsorResults = await getSponsorCaseStudies();
        }

        if (brandItems.length === 0 && fileData.brandItems && Array.isArray(fileData.brandItems) && fileData.brandItems.length > 0) {
          await syncBrandItems(fileData.brandItems);
          brandItems = await getBrandItems();
        }

        if (whatPerforms.length === 0 && fileData.whatPerforms && Array.isArray(fileData.whatPerforms) && fileData.whatPerforms.length > 0) {
          await syncWhatPerforms(fileData.whatPerforms);
          whatPerforms = await getWhatPerforms();
        }

        if (tools.length === 0 && fileData.tools && Array.isArray(fileData.tools) && fileData.tools.length > 0) {
          await syncToolItems(fileData.tools);
          tools = await getToolItems();
        }
      } catch (e) {
        console.warn("Seeding check warning in GET /api/admin/data:", e);
      }

      return NextResponse.json(
        {
          stats: sanitizeStats(siteConfigData.stats),
          heroConfig: sanitizeHeroConfig(siteConfigData.heroConfig, siteConfigData.stats),
          rates: siteConfigData.rates,
          demographics: siteConfigData.demographics,
          geographies: siteConfigData.geographies,
          audienceInterests: siteConfigData.audienceInterests,
          shoppingInterests: siteConfigData.shoppingInterests,
          channelSnapshots: siteConfigData.channelSnapshots,
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
    let fallbackData: any = defaultSiteData;
    try {
      const fileContents = await fs.readFile(filePath, "utf8");
      fallbackData = JSON.parse(fileContents);
    } catch { }

    return NextResponse.json(
      {
        ...fallbackData,
        stats: sanitizeStats(fallbackData?.stats),
        heroConfig: sanitizeHeroConfig(fallbackData?.heroConfig, fallbackData?.stats),
        dbStatus: "Fallback JSON Data Store",
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (err: any) {
    if (process.env.NODE_ENV === "development") {
      console.warn("GET site data notice (using fallback JSON):", err.message || err);
    } else {
      console.error("GET site data error:", err);
    }
    let fallbackData: any = defaultSiteData;
    try {
      const fileContents = await fs.readFile(filePath, "utf8");
      fallbackData = JSON.parse(fileContents);
    } catch { }

    return NextResponse.json(
      {
        ...fallbackData,
        stats: sanitizeStats(fallbackData?.stats),
        heroConfig: sanitizeHeroConfig(fallbackData?.heroConfig, fallbackData?.stats),
        dbStatus: "Fallback Bundled JSON (MySQL Error)",
      },
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
  try {
    const auth = await verifyAdminSession(undefined, false);
    if (!auth.isAuthenticated || auth.errorResponse) {
      return NextResponse.json(
        { success: false, message: auth.errorResponse?.message || "Unauthorized: Admin session required." },
        { status: auth.errorResponse?.status || 401 }
      );
    }

    const data = await request.json();
    const isDbReady = await initDatabase();

    let dbUpdated = false;
    let dbErrorMessage = "";

    if (isDbReady) {
      try {
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

        dbUpdated = true;
      } catch (dbErr: any) {
        console.error("Database operation error in POST /api/admin/data:", dbErr);
        dbErrorMessage = dbErr.message || "Database write error";
      }
    }

    // Always write JSON file backup snapshot so fallback store & local files stay in sync
    let fileUpdated = false;
    try {
      const formattedData = JSON.stringify(data, null, 2);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, formattedData, "utf8");

      await fs.mkdir(backupDir, { recursive: true });
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const snapshotPath = path.join(backupDir, `site-data-${timestamp}.json`);
      await fs.writeFile(snapshotPath, formattedData, "utf8");
      fileUpdated = true;
    } catch (fsErr: any) {
      console.warn("Filesystem snapshot write warning in POST /api/admin/data:", fsErr);
    }

    if (!dbUpdated && !fileUpdated) {
      return NextResponse.json(
        {
          success: false,
          message: dbErrorMessage ? `Failed to save changes: ${dbErrorMessage}` : "Failed to persist changes to database or local storage."
        },
        { status: 500 }
      );
    }

    const message = dbUpdated
      ? "All changes successfully saved and published live to database!"
      : "Saved changes to local data store (Database offline).";

    return NextResponse.json({
      success: true,
      message,
      dbStatus: dbUpdated ? "Connected to MySQL (AQ-Dashboard)" : "Saved to Local JSON Storage"
    });
  } catch (err: any) {
    console.error("POST site data error:", err);
    return NextResponse.json({ success: false, message: err.message || "Failed to update site data" }, { status: 500 });
  }
}
