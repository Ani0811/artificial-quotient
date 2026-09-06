import { getSiteConfig, upsertSiteConfig, getWhatPerforms, syncWhatPerforms, getSponsorCaseStudies, syncSponsorCaseStudies } from "@/schema";
import { initDatabase } from "@/lib/db";
import { getYoutubeId, formatViewsCount, estimateClicksFromViews } from "@/app/admin/utils";
import fs from "fs/promises";
import path from "path";

export interface LiveChannelStats {
  subscribers: string;
  monthlyViews: string;
  videosCount: string;
  rawViews?: number;
  rawSubscribers?: number;
  rawVideos?: number;
}

const DEFAULT_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCRrI3ugDo-xzEqGSyPI9Nag";
const DEFAULT_CHANNEL_HANDLE = "@ArtificialQuotient01";
const SYNC_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache throttle

let lastChannelSyncTimestamp = 0;
let isChannelSyncRunning = false;

/**
 * Fetch live channel statistics using YouTube Data API v3, with automatic
 * resilient fallback to public channel metadata scraping.
 */
export async function fetchLiveChannelStats(
  channelId: string = DEFAULT_CHANNEL_ID,
  channelHandle: string = DEFAULT_CHANNEL_HANDLE
): Promise<LiveChannelStats | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  // STAGE 1: Official YouTube Data API v3 (if configured)
  if (apiKey) {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const stats = data.items[0].statistics;
          const subCount = parseInt(stats.subscriberCount, 10);
          const viewCount = parseInt(stats.viewCount, 10);
          const vidCount = parseInt(stats.videoCount, 10);

          return {
            subscribers: formatViewsCount(subCount),
            monthlyViews: formatViewsCount(viewCount),
            videosCount: vidCount ? `${vidCount}` : "",
            rawSubscribers: subCount,
            rawViews: viewCount,
            rawVideos: vidCount,
          };
        }
      }
    } catch (apiErr) {
      console.warn("YouTube Data API call failed, using public scraper fallback:", apiErr);
    }
  }

  // STAGE 2: Public YouTube Channel Scraper Fallback (Zero Config Needed)
  const candidateUrls = [
    `https://www.youtube.com/channel/${channelId}/about`,
    `https://www.youtube.com/${channelHandle}/about`,
    `https://www.youtube.com/${channelHandle}`,
  ];

  for (const targetUrl of candidateUrls) {
    try {
      const pageRes = await fetch(targetUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
        },
        cache: "no-store",
      });

      if (!pageRes.ok) continue;

      const html = await pageRes.text();

      // Extract Subscriber Count
      let subscribers = "";
      let rawSubs = 0;
      const subMatch =
        html.match(/"subscriberCountText":\s*"([^"]+)"/i) ||
        html.match(/"subscriberCountText":\s*\{\s*"accessibility":\s*\{[^}]*\}\s*,\s*"simpleText":\s*"([^"]+)"/i) ||
        html.match(/"subscriberCountText":\s*\{\s*"simpleText":\s*"([^"]+)"/i) ||
        html.match(/([0-9.]+[kKmM]?\s+subscribers)/i);

      if (subMatch && subMatch[1]) {
        subscribers = formatViewsCount(subMatch[1]);
      }

      // Extract Total Channel Views
      let monthlyViews = "";
      let rawViews = 0;
      const viewMatch =
        html.match(/"viewCountText":\s*"([^"]+)"/i) ||
        html.match(/"viewCountText":\s*\{\s*"simpleText":\s*"([^"]+)"/i) ||
        html.match(/([0-9,]+)\s+views/i);

      if (viewMatch && viewMatch[1]) {
        const cleaned = viewMatch[1].replace(/views/i, "").replace(/,/g, "").trim();
        const parsed = parseInt(cleaned, 10);
        if (!isNaN(parsed) && parsed > 0) {
          rawViews = parsed;
          monthlyViews = formatViewsCount(parsed);
        }
      }

      // Extract Videos Count
      let videosCount = "";
      const vidMatch =
        html.match(/"content":"([0-9,]+)\s+videos"/i) ||
        html.match(/"text":"([0-9,]+)\s+videos"/i) ||
        html.match(/(?:^|[^0-9a-zA-Z\\])([0-9,]+)\s+videos/i);

      if (vidMatch && vidMatch[1]) {
        videosCount = vidMatch[1].replace(/,/g, "").trim();
      }

      if (subscribers || monthlyViews) {
        return {
          subscribers: subscribers || "",
          monthlyViews: monthlyViews || "",
          videosCount: videosCount || "",
          rawViews: rawViews || undefined,
          rawSubscribers: rawSubs || undefined,
        };
      }
    } catch (scrapeErr) {
      console.warn(`Scraping attempt failed for ${targetUrl}:`, scrapeErr);
    }
  }

  return null;
}

/**
 * Fetch video view count and title from public watch page as fallback when API key is unavailable.
 */
export async function fetchPublicVideoStats(videoId: string): Promise<{ views?: string; title?: string; thumbnail?: string } | null> {
  try {
    const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      cache: "no-store",
    });

    if (!pageRes.ok) return null;

    const html = await pageRes.text();
    let views: string | undefined;
    let title: string | undefined;

    const viewCountMatch =
      html.match(/"viewCount":\s*"(\d+)"/i) ||
      html.match(/\\"viewCount\\":\s*\\"(\d+)\\"/i) ||
      html.match(/"views":\s*\{\s*"simpleText":\s*"([0-9,]+)\s+views"/i);

    if (viewCountMatch && viewCountMatch[1]) {
      const parsed = parseInt(viewCountMatch[1].replace(/,/g, ""), 10);
      if (!isNaN(parsed) && parsed > 0) {
        views = formatViewsCount(parsed);
      }
    }

    const titleMatch =
      html.match(/<meta\s+name="title"\s+content="([^"]+)"/i) ||
      html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
      html.match(/<title>([^<]+)<\/title>/i);

    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].replace(/ - YouTube$/i, "").trim();
    }

    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return { views, title, thumbnail };
  } catch (err) {
    console.warn(`Failed to scrape public stats for video ${videoId}:`, err);
    return null;
  }
}

export interface SyncResult {
  success?: boolean;
  skipped?: boolean;
  reason?: string;
  message?: string;
  data?: {
    stats?: any;
    heroConfig?: any;
    whatPerforms?: any[];
    sponsorResults?: any[];
  };
}

/**
 * Automatically sync YouTube statistics into MySQL and local site-data.json.
 * Safe to call on request (rate-limited via TTL) or forcefully via admin action.
 */
export async function syncYouTubeData({ force = false, syncVideos = false }: { force?: boolean; syncVideos?: boolean } = {}): Promise<SyncResult> {
  const now = Date.now();

  // Throttle automatic requests unless forced
  if (!force && now - lastChannelSyncTimestamp < SYNC_CACHE_TTL_MS) {
    return { skipped: true, reason: "Cache valid" };
  }

  if (isChannelSyncRunning) {
    return { skipped: true, reason: "Sync already in progress" };
  }

  isChannelSyncRunning = true;

  try {
    // 1. Fetch live YouTube channel metrics first
    const liveStats = await fetchLiveChannelStats();
    if (!liveStats) {
      return { success: false, message: "Could not retrieve live stats from YouTube." };
    }

    const filePath = path.join(process.cwd(), "src", "data", "site-data.json");
    let existingData: any = {};
    try {
      const fileContents = await fs.readFile(filePath, "utf8");
      existingData = JSON.parse(fileContents);
    } catch {}

    let updatedStats: any = {
      ...(existingData.stats || {}),
      subscribers: liveStats.subscribers,
      monthlyViews: liveStats.monthlyViews,
      ...(liveStats.videosCount ? { videosCount: `${liveStats.videosCount}+` } : {}),
    };
    let updatedHeroConfig: any = {
      ...(existingData.heroConfig || {}),
      subscribersCount: liveStats.subscribers,
      monthlyViewsCount: liveStats.monthlyViews,
    };
    let updatedWpList: any[] = [];
    let updatedCsList: any[] = [];

    // 2. Attempt MySQL Database Update (Gracefully handled if DB is offline)
    try {
      await initDatabase();
      const currentConfig = await getSiteConfig();

      if (currentConfig) {
        currentConfig.stats = {
          ...currentConfig.stats,
          subscribers: liveStats.subscribers,
          monthlyViews: liveStats.monthlyViews,
          videosCount: liveStats.videosCount ? `${liveStats.videosCount}+` : currentConfig.stats.videosCount,
        };

        if (!currentConfig.heroConfig) {
          currentConfig.heroConfig = {};
        }
        currentConfig.heroConfig.subscribersCount = liveStats.subscribers;
        currentConfig.heroConfig.monthlyViewsCount = liveStats.monthlyViews;

        await upsertSiteConfig(currentConfig);
        updatedStats = currentConfig.stats;
        updatedHeroConfig = currentConfig.heroConfig;
      }

      // Sync individual What Performs & Case Studies videos if requested
      if (syncVideos) {
        const wpList = await getWhatPerforms();
        updatedWpList = [...wpList];
        for (const item of updatedWpList) {
          const vId = getYoutubeId(item.ytUrl);
          if (vId) {
            const vStats = await fetchPublicVideoStats(vId);
            if (vStats?.views) {
              item.views = vStats.views;
              item.clicks = estimateClicksFromViews(vStats.views);
            }
            if (vStats?.thumbnail && !item.thumbnail) {
              item.thumbnail = vStats.thumbnail;
            }
            if (vStats?.title && (!item.title || item.title.includes("New Highlight"))) {
              item.title = vStats.title;
            }
          }
        }
        if (updatedWpList.length > 0) {
          await syncWhatPerforms(updatedWpList);
        }

        const csList = await getSponsorCaseStudies();
        updatedCsList = [...csList];
        for (const item of updatedCsList) {
          const vId = getYoutubeId(item.ytUrl);
          if (vId && item.thumbnailUrl !== "none") {
            const vStats = await fetchPublicVideoStats(vId);
            if (vStats?.thumbnail && (!item.thumbnailUrl || item.thumbnailUrl.includes("maxresdefault"))) {
              item.thumbnailUrl = vStats.thumbnail;
            }
          }
        }
        if (updatedCsList.length > 0) {
          await syncSponsorCaseStudies(updatedCsList);
        }
      }
    } catch (dbErr) {
      console.warn("MySQL sync notice (proceeding with filesystem data store):", dbErr);
    }

    // 3. Update site-data.json for full consistency across all environments
    try {
      const filePath = path.join(process.cwd(), "src", "data", "site-data.json");
      const fileContents = await fs.readFile(filePath, "utf8");
      const jsonData = JSON.parse(fileContents);

      if (!jsonData.stats) jsonData.stats = {};
      jsonData.stats.subscribers = liveStats.subscribers;
      jsonData.stats.monthlyViews = liveStats.monthlyViews;
      if (liveStats.videosCount) {
        jsonData.stats.videosCount = liveStats.videosCount;
      }

      if (!jsonData.heroConfig) jsonData.heroConfig = {};
      jsonData.heroConfig.subscribersCount = liveStats.subscribers;
      jsonData.heroConfig.monthlyViewsCount = liveStats.monthlyViews;
      if (updatedWpList.length > 0) {
        jsonData.whatPerforms = updatedWpList;
      }
      if (updatedCsList.length > 0) {
        jsonData.sponsorResults = updatedCsList;
      }

      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8");
    } catch (fsErr) {
      console.warn("Could not write updated stats to site-data.json:", fsErr);
    }

    lastChannelSyncTimestamp = Date.now();

    return {
      success: true,
      data: {
        stats: updatedStats,
        heroConfig: updatedHeroConfig,
        whatPerforms: updatedWpList,
        sponsorResults: updatedCsList,
      },
    };
  } catch (err: any) {
    console.error("Auto YouTube sync error:", err);
    return { success: false, message: err.message || "Sync failed" };
  } finally {
    isChannelSyncRunning = false;
  }
}
