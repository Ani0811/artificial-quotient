import { NextResponse } from "next/server";
import { initDatabase } from "@/lib/db";
import { getCountriesFromDb } from "@/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initDatabase();
    const countries = await getCountriesFromDb();
    return NextResponse.json({ countries }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err: any) {
    console.error("GET /api/admin/countries error:", err);
    return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 });
  }
}
