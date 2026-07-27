import { requireRole } from "@/lib/proxy";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("admin", "/");

  return <>{children}</>;
}