import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-auth";
import { getYoutubeId, formatViewsCount, estimateClicksFromViews } from "@/app/admin/utils";

export const dynamic = "force-dynamic";

function inferHighlightAndThumb(title: string): { highlight: string; thumb: string; type: string } {
  const lower = title.toLowerCase();

  let highlight = "High CTR";
  let thumb = "🎬";
  let type = "Dedicated Video";

  if (lower.includes("lip sync") || lower.includes("talking avatar") || lower.includes("avatar")) {
    highlight = "AI Lip Sync";
    thumb = "🎙️";
  } else if (lower.includes("motion graphics") || lower.includes("jitter") || lower.includes("animation")) {
    highlight = "Motion Graphics";
    thumb = "✨";
  } else if (lower.includes("cat") || lower.includes("story") || lower.includes("cartoon") || lower.includes("anime")) {
    highlight = "Viral Animation";
    thumb = "🐱";
  } else if (lower.includes("agent") || lower.includes("autonomous") || lower.includes("coding") || lower.includes("bot")) {
    highlight = "AI Agents";
    thumb = "🤖";
  } else if (lower.includes("workflow") || lower.includes("automation") || lower.includes("make.com")) {
    highlight = "AI Automation";
    thumb = "⚡";
  } else if (lower.includes("viral") || lower.includes("trending") || lower.includes("million")) {
    highlight = "Viral Creator";
    thumb = "🔥";
  } else if (lower.includes("review") || lower.includes("honest")) {
    highlight = "Deep Dive";
    thumb = "🔍";
  } else if (lower.includes("free") || lower.includes("guide") || lower.includes("tutorial")) {
    highlight = "Step-By-Step";
    thumb = "🚀";
  }

  if (lower.includes("integration") || lower.includes("sponsor segment") || lower.includes("sponsored")) {
    type = "Integration";
  }

  return { highlight, thumb, type };
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
    const body = await request.json();
    const rawUrl = body.url || body.ytUrl || body.videoId || "";

    const videoId = getYoutubeId(rawUrl);
    if (!videoId) {
      return NextResponse.json(
        { success: false, message: "Invalid YouTube URL or Video ID. Please provide a valid YouTube link." },
        { status: 400 }
      );
    }

    let title = "";
    let rawViews: number | null = null;
    let formattedViews = "";
    let thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const cleanYtUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // STAGE 1: YouTube Data API v3 (if configured)
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (apiKey) {
      try {
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;
        const res = await fetch(apiUrl, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            const item = data.items[0];
            title = item.snippet?.title || "";
            const viewCountStr = item.statistics?.viewCount;
            if (viewCountStr) {
              rawViews = parseInt(viewCountStr, 10);
              formattedViews = formatViewsCount(rawViews);
            }

            const thumbs = item.snippet?.thumbnails;
            if (thumbs?.maxres?.url) {
              thumbnail = thumbs.maxres.url;
            } else if (thumbs?.standard?.url) {
              thumbnail = thumbs.standard.url;
            } else if (thumbs?.high?.url) {
              thumbnail = thumbs.high.url;
            }
          }
        }
      } catch (apiErr) {
        console.warn("YouTube Data API call error, falling back to oEmbed/Scraper:", apiErr);
      }
    }

    // STAGE 2: oEmbed API Fallback (No Key Needed)
    if (!title) {
      try {
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
        const res = await fetch(oembedUrl, { cache: "no-store" });
        if (res.ok) {
          const oembedData = await res.json();
          if (oembedData.title) {
            title = oembedData.title;
          }
          if (oembedData.thumbnail_url) {
            thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
          }
        }
      } catch (oembedErr) {
        console.warn("YouTube oEmbed fetch error:", oembedErr);
      }
    }

    // STAGE 3: Public Watch Page Scraper Fallback
    if (!title || !formattedViews) {
      try {
        const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
          },
          cache: "no-store",
        });

        if (pageRes.ok) {
          const html = await pageRes.text();

          if (!title) {
            const ogTitleMatch = html.match(/<meta\s+name="title"\s+content="([^"]+)"/i) ||
                                 html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
                                 html.match(/<title>([^<]+)<\/title>/i);
            if (ogTitleMatch && ogTitleMatch[1]) {
              title = ogTitleMatch[1].replace(/ - YouTube$/i, "").trim();
            }
          }

          if (!formattedViews) {
            const viewCountMatch = html.match(/"viewCount":\s*"(\d+)"/i) ||
                                   html.match(/\\"viewCount\\":\s*\\"(\d+)\\"/i) ||
                                   html.match(/"views":\s*\{\s*"simpleText":\s*"([0-9,]+)\s+views"/i);
            if (viewCountMatch && viewCountMatch[1]) {
              const cleaned = viewCountMatch[1].replace(/,/g, "");
              const parsed = parseInt(cleaned, 10);
              if (!isNaN(parsed) && parsed > 0) {
                rawViews = parsed;
                formattedViews = formatViewsCount(parsed);
              }
            }
          }
        }
      } catch (scrapeErr) {
        console.warn("Public watch page scrape error:", scrapeErr);
      }
    }

    // Final Fallbacks if still empty
    if (!title) {
      title = `YouTube Video (${videoId})`;
    }
    if (!formattedViews) {
      formattedViews = "25.0k";
    }

    const clicks = estimateClicksFromViews(rawViews || 25000);
    const { highlight, thumb, type } = inferHighlightAndThumb(title);

    return NextResponse.json({
      success: true,
      data: {
        videoId,
        title,
        views: formattedViews,
        clicks,
        type,
        thumb,
        highlight,
        thumbnail,
        ytUrl: cleanYtUrl,
      },
    });
  } catch (error: any) {
    console.error("Fetch YouTube video error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch video details from YouTube." },
      { status: 500 }
    );
  }
}
