import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { getAdminUsers } from "@/lib/auth-store";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin/login?notice=not-admin");
  }

  const userIdCookie = cookieStore.get("admin_user_id");
  const users = await getAdminUsers();
  
  let currentUser = null;
  if (userIdCookie?.value) {
    currentUser = users.find((u) => u.id === userIdCookie.value && u.status === "Active") || null;
  }
  
  if (!currentUser) {
    currentUser = users.find((u) => u.id === "admin-1" && u.status === "Active") || users.find((u) => u.status === "Active") || null;
  }

  if (!currentUser) {
    redirect("/admin/login?notice=not-admin");
  }

  return <DashboardClient currentUser={currentUser} />;
}
