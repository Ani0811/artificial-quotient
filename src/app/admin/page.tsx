import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { getAdminUsers } from "@/lib/auth-store";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const userIdCookie = cookieStore.get("admin_user_id");

  if (!session || session.value !== "authenticated" || !userIdCookie?.value) {
    redirect("/admin/login?notice=not-admin");
  }

  const users = await getAdminUsers();
  const currentUser = users.find((u) => u.id === userIdCookie.value && u.status === "Active");
  
  if (!currentUser) {
    redirect("/admin/login?notice=not-admin");
  }

  return <DashboardClient currentUser={currentUser} />;
}
