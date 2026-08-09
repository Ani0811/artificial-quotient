import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { getAdminUsers } from "@/lib/auth-store";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin/login");
  }

  const userIdCookie = cookieStore.get("admin_user_id");
  const users = await getAdminUsers();
  
  let currentUser = null;
  if (userIdCookie?.value) {
    currentUser = users.find(u => u.id === userIdCookie.value) || null;
  }
  
  if (!currentUser) {
    // Fallback to Primary Admin
    currentUser = users.find(u => u.id === "admin-1") || users[0];
  }

  return <DashboardClient currentUser={currentUser} />;
}
