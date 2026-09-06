import { NextResponse } from "next/server";
import { initDatabase } from "@/lib/db";
import { getCountriesFromDb } from "@/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const isDbReady = await initDatabase();
    if (isDbReady) {
      const countries = await getCountriesFromDb();
      return NextResponse.json({ countries }, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }
    return NextResponse.json({ countries: [] });
  } catch (err: any) {
    return NextResponse.json({ countries: [] });
  }
}
