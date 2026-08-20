import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { initDatabase } from "@/lib/db";
import { 
  getSiteConfig, 
  upsertSiteConfig, 
  getWhatPerforms, 
  syncWhatPerforms,
  getSponsorCaseStudies,
  syncSponsorCaseStudies
} from "@/schema";
import { verifyAdminSession } from "@/lib/admin-auth";
import fs from "fs/promises";
import path from "path";

function getYoutubeId(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getHighResYoutubeThumbnail(thumbnails?: any, vId?: string | null): string {
  if (thumbnails?.maxres?.url) {
    return thumbnails.maxres.url;
  }
  if (vId) {
    return `https://img.youtube.com/vi/${vId}/maxresdefault.jpg`;
  }
  if (thumbnails?.standard?.url) {
    return thumbnails.standard.url;
  }
  if (thumbnails?.high?.url) {
    return thumbnails.high.url;
  }
  return thumbnails?.default?.url || "";
}

function formatViews(views: string): string {
  const num = parseInt(views, 10);
  if (isNaN(num)) return views;
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

export async function POST(request: Request) {
  const auth = await verifyAdminSession(undefined, false);
  if (!auth.isAuthenticated || auth.errorResponse) {
    return NextResponse.json(
      { success: false, message: auth.errorResponse?.message || "Unauthorized" },
      { status: auth.errorResponse?.status || 401 }
    );
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      return NextResponse.json(
        { success: false, message: "Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID in environment variables." },
        { status: 400 }
      );
    }

    await initDatabase();
    
    let updatedCount = 0;
    let syncedStats: any = null;

    // 1. Sync Channel Stats
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
    );
    const channelData = await channelRes.json();
    
    if (channelData.items && channelData.items.length > 0) {
      const stats = channelData.items[0].statistics;
      const currentConfig = await getSiteConfig();
      if (currentConfig) {
        const formattedSubs = formatViews(stats.subscriberCount);
        currentConfig.stats = {
          ...currentConfig.stats,
          subscribers: formattedSubs,
          videosCount: stats.videoCount + "+",
          monthlyViews: formatViews(stats.viewCount),
        };
        if (currentConfig.heroConfig) {
          currentConfig.heroConfig.subscribersCount = formattedSubs;
        }
        await upsertSiteConfig(currentConfig);
        syncedStats = currentConfig.stats;
        updatedCount++;
      }
    }

    // 2. Sync What Performs Videos & High-Res Thumbnails
    const wpList = await getWhatPerforms();
    const wpVideoIdsToId = new Map<string, string>();
    const wpVideoIds: string[] = [];

    for (const item of wpList) {
      const vId = getYoutubeId(item.ytUrl);
      if (vId) {
        wpVideoIds.push(vId);
        wpVideoIdsToId.set(vId, item.id);
      }
    }

    let updatedWpList = [...wpList];
    if (wpVideoIds.length > 0) {
      const idsStr = wpVideoIds.join(",");
      const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${idsStr}&key=${apiKey}`
      );
      const videosData = await videosRes.json();

      if (videosData.items && videosData.items.length > 0) {
        for (const v of videosData.items) {
          const vId = v.id;
          const wpId = wpVideoIdsToId.get(vId);
          if (wpId) {
            const wpItem = updatedWpList.find(i => i.id === wpId);
            if (wpItem) {
              const viewCount = v.statistics?.viewCount;
              if (viewCount) {
                wpItem.views = formatViews(viewCount);
              }
              const snippet = v.snippet;
              if (snippet) {
                if (!wpItem.title || wpItem.title.trim() === "" || wpItem.title.includes("New Highlight")) {
                  wpItem.title = snippet.title;
                }
                const bestThumb = getHighResYoutubeThumbnail(snippet.thumbnails, vId);
                if (bestThumb) {
                  wpItem.thumbnail = bestThumb;
                }
              }
            }
          }
        }
        await syncWhatPerforms(updatedWpList);
        updatedCount += videosData.items.length;
      }
    }

    // 3. Sync Sponsor Case Studies & High-Res Thumbnails
    const csList = await getSponsorCaseStudies();
    const csVideoIdsToId = new Map<string, string>();
    const csVideoIds: string[] = [];

    for (const item of csList) {
      const vId = getYoutubeId(item.ytUrl);
      if (vId && item.thumbnailUrl !== "none") {
        csVideoIds.push(vId);
        csVideoIdsToId.set(vId, item.id);
      }
    }

    let updatedCsList = [...csList];
    if (csVideoIds.length > 0) {
      const idsStr = csVideoIds.join(",");
      const csVideosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${idsStr}&key=${apiKey}`
      );
      const csVideosData = await csVideosRes.json();

      if (csVideosData.items && csVideosData.items.length > 0) {
        for (const v of csVideosData.items) {
          const vId = v.id;
          const csId = csVideoIdsToId.get(vId);
          if (csId) {
            const csItem = updatedCsList.find(i => i.id === csId);
            if (csItem && csItem.thumbnailUrl !== "none") {
              const snippet = v.snippet;
              const bestThumb = getHighResYoutubeThumbnail(snippet?.thumbnails, vId);
              if (bestThumb) {
                csItem.thumbnailUrl = bestThumb;
              }
            }
          }
        }
        await syncSponsorCaseStudies(updatedCsList);
        updatedCount += csVideosData.items.length;
      }
    }

    // 4. Update site-data.json local store for full consistency
    try {
      const filePath = path.join(process.cwd(), "src", "data", "site-data.json");
      const fileContents = await fs.readFile(filePath, "utf8");
      const jsonData = JSON.parse(fileContents);

      if (syncedStats) {
        jsonData.stats = syncedStats;
      }
      if (updatedWpList && updatedWpList.length > 0) {
        jsonData.whatPerforms = updatedWpList;
      }
      if (updatedCsList && updatedCsList.length > 0) {
        jsonData.sponsorResults = updatedCsList;
      }

      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8");
    } catch (fsErr) {
      console.warn("Could not write updated stats to site-data.json:", fsErr);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully synced live stats and upscaled thumbnails (${updatedCount} items updated).`,
      data: {
        stats: syncedStats,
        whatPerformsCount: updatedWpList.length,
        sponsorResultsCount: updatedCsList.length,
      }
    });
  } catch (error: any) {
    console.error("YouTube sync error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to sync YouTube stats." },
      { status: 500 }
    );
  }
}

