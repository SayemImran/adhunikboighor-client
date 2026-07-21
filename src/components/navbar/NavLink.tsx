"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "border-white/40 bg-white/25 text-[var(--secondary-accent)] shadow-[0_8px_24px_rgba(255,255,255,0.22)] backdrop-blur-md"
          : "border-transparent text-[var(--text-color)] hover:border-white/30 hover:bg-white/15 hover:text-[var(--primary-accent)]"
      }`}
    >
      {label}
    </Link>
  );
}
