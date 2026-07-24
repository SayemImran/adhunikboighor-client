import Sidebar from "@/components/dashboard/Sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Not logged in at all
  if (!session) {
    redirect("/login");
  }

  const role = (session.user as { role?: string }).role;

  // Only admin and buyer roles are allowed into the dashboard
  if (role !== "admin" && role !== "buyer") {
    redirect("/");
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <Sidebar role={role} />

      <main className="min-w-0 flex-1 rounded-[28px] border border-white/60 bg-white/15 p-6 shadow-[0_16px_50px_rgba(58,42,29,0.16)] backdrop-blur-xl sm:p-8">
        {children}
      </main>
    </div>
  );
}