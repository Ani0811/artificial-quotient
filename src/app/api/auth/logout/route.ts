import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "", { maxAge: 0, path: "/", httpOnly: true });
  cookieStore.set("admin_user_id", "", { maxAge: 0, path: "/", httpOnly: true });
  cookieStore.delete("admin_session");
  cookieStore.delete("admin_user_id");
  return NextResponse.json({ success: true });
}
