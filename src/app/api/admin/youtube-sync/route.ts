import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-auth";
import { syncYouTubeData } from "@/lib/youtube-sync";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await verifyAdminSession(undefined, false);
  if (!auth.isAuthenticated || auth.errorResponse) {
    return NextResponse.json(
      { success: false, message: auth.errorResponse?.message || "Unauthorized" },
      { status: auth.errorResponse?.status || 401 }
    );
  }

  try {
    const result = await syncYouTubeData({ force: true, syncVideos: true });

    if (!result.success && !result.data) {
      return NextResponse.json(
        { success: false, message: result.message || "Failed to sync YouTube stats." },
        { status: 500 }
      );
    }

    const data: any = result.data || {};
    return NextResponse.json({
      success: true,
      message: "Successfully synchronized live YouTube channel stats, subscribers, views, and videos!",
      data: {
        stats: data.stats,
        heroConfig: data.heroConfig,
        whatPerforms: data.whatPerforms || [],
        sponsorResults: data.sponsorResults || [],
        whatPerformsCount: data.whatPerforms?.length || 0,
        sponsorResultsCount: data.sponsorResults?.length || 0,
      },
    });
  } catch (error: any) {
    console.error("YouTube sync error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to sync YouTube stats." },
      { status: 500 }
    );
  }
}
