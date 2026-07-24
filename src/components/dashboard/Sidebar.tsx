"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookPlus,
  BookOpenText,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const buyerNavItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const adminNavItems = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Add Item", href: "/dashboard/admin/items/add", icon: BookPlus },
  { label: "Manage Items", href: "/dashboard/admin/items/manage", icon: BookOpenText },
];

export default function Sidebar({ role }: { role?: string }) {
  const pathname = usePathname();
  const navItems = role === "admin" ? adminNavItems : buyerNavItems;

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 shrink-0 flex-col rounded-[28px] border border-white/60 bg-white/15 p-5 shadow-[0_16px_50px_rgba(58,42,29,0.16)] backdrop-blur-xl md:flex">
      {/* Brand */}
      <Link href="/" className="flex items-baseline gap-1 px-2">
        <span className="text-xl font-medium tracking-tight text-[var(--text-color)]">
          Adhunik
        </span>
        <span className="text-xl font-medium italic tracking-tight text-[var(--primary-accent)]">
          Boighor
        </span>
      </Link>

      {/* Nav links */}
      <nav className="mt-8 flex flex-1 flex-col gap-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[var(--primary-accent)] text-white shadow-[0_8px_20px_rgba(201,123,74,0.25)]"
                  : "text-[var(--text-color)] hover:bg-white/25"
              }`}
            >
              <Icon size={18} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        className="mt-4 flex items-center gap-3 rounded-2xl border border-[var(--glass-border)] bg-white/20 px-3.5 py-2.5 text-sm font-medium text-[var(--text-color)] transition-all duration-200 hover:border-[var(--primary-accent)] hover:bg-white/30 hover:text-[var(--primary-accent)]"
      >
        <LogOut size={18} strokeWidth={1.75} />
        Sign out
      </button>
    </aside>
  );
}