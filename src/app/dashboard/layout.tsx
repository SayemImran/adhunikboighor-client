import Sidebar from "@/components/dashboard/Sidebar";
import { requireRole } from "@/lib/proxy";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireRole(["admin", "buyer"]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 md:flex-row">
      <Sidebar role={user.role} />
      <main className="min-w-0 flex-1 rounded-[28px] border border-white/60 bg-white/15 p-6 shadow-[0_16px_50px_rgba(58,42,29,0.16)] backdrop-blur-xl sm:p-8">
        {children}
      </main>
    </div>
  );
}