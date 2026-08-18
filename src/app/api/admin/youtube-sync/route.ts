import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { initDatabase } from "@/lib/db";
import { getSiteConfig, upsertSiteConfig, getWhatPerforms, syncWhatPerforms } from "@/schema";
import { getAdminUsers } from "@/lib/auth-store";

function getYoutubeId(url?: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
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
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("admin_user_id")?.value;
    if (userId) {
      const users = await getAdminUsers();
      const currentUser = users.find((u: any) => u.id === userId && u.status === "Active");
      if (currentUser?.role === "Viewer") {
        return NextResponse.json(
          { success: false, message: "Forbidden: Viewer accounts have read-only access." },
          { status: 403 }
        );
      }
    }

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

    // 1. Sync Channel Stats
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
    );
    const channelData = await channelRes.json();
    
    if (channelData.items && channelData.items.length > 0) {
      const stats = channelData.items[0].statistics;
      const currentConfig = await getSiteConfig();
      if (currentConfig) {
        currentConfig.stats = {
          ...currentConfig.stats,
          subscribers: formatViews(stats.subscriberCount),
          videosCount: stats.videoCount + "+",
          monthlyViews: formatViews(stats.viewCount),
        };
        await upsertSiteConfig(currentConfig);
        updatedCount++;
      }
    }

    // 2. Sync What Performs Videos
    const wpList = await getWhatPerforms();
    const videoIdsToWpId = new Map<string, string>();
    const videoIds: string[] = [];

    for (const item of wpList) {
      const vId = getYoutubeId(item.ytUrl);
      if (vId) {
        videoIds.push(vId);
        videoIdsToWpId.set(vId, item.id);
      }
    }

    if (videoIds.length > 0) {
      const idsStr = videoIds.join(",");
      const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${idsStr}&key=${apiKey}`
      );
      const videosData = await videosRes.json();

      if (videosData.items && videosData.items.length > 0) {
        const updatedWpList = [...wpList];
        for (const v of videosData.items) {
          const vId = v.id;
          const wpId = videoIdsToWpId.get(vId);
          if (wpId) {
            const wpItem = updatedWpList.find(i => i.id === wpId);
            if (wpItem) {
              const viewCount = v.statistics?.viewCount;
              if (viewCount) {
                wpItem.views = formatViews(viewCount);
              }
              const snippet = v.snippet;
              if (snippet) {
                wpItem.title = snippet.title;
                const bestThumb = snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.standard?.url || snippet.thumbnails?.default?.url;
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

    return NextResponse.json({
      success: true,
      message: `Successfully synced YouTube stats (${updatedCount} items updated).`,
    });
  } catch (error: any) {
    console.error("YouTube sync error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to sync YouTube stats." },
      { status: 500 }
    );
  }
}
