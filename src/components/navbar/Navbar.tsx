"use client";

import { useState } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";
import CustomTrigger from "../profiles/CustomTrigger";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Books", href: "/books" },
    { label: "About", href: "/about" },
    { label: "Blogs", href: "/blogs" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const { data: sessionData } = authClient.useSession();
  const user = sessionData?.user;

  return (
    <nav className="mx-auto w-full max-w-6xl">
      {/* Top bar */}
      <div className="flex items-center justify-between rounded-full border border-white/50 bg-white/15 px-5 py-3 shadow-[0_12px_40px_rgba(58,42,29,0.16)] backdrop-blur-lg">
        <Link href="/" className="flex items-baseline gap-1">
          <span className="text-[22px] font-medium tracking-tight text-[var(--text-color)] sm:text-[26px]">
            Adhunik
          </span>
          <span className="text-[22px] font-medium italic tracking-tight text-[var(--primary-accent)] sm:text-[26px]">
            Boighor
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.label} href={link.href} label={link.label} />
          ))}
        </div>

        {/* Desktop auth area */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <CustomTrigger userData={user} />
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-[var(--glass-border)] bg-white/20 px-4 py-2 text-sm font-medium text-[var(--text-color)] transition-all duration-200 hover:border-[var(--primary-accent)] hover:bg-white/30"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-[var(--primary-accent)] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(201,123,74,0.25)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile: user avatar (if logged in) + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {user && <CustomTrigger userData={user} />}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/20 text-[var(--text-color)]"
          >
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 rounded-[24px] border border-white/50 bg-white/20 p-4 shadow-[0_12px_40px_rgba(58,42,29,0.16)] backdrop-blur-lg">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-4 py-2.5 text-sm font-medium text-[var(--text-color)] transition-colors hover:bg-white/30"
            >
              {link.label}
            </Link>
          ))}

          {!user && (
            <div className="mt-2 flex flex-col gap-2 border-t border-white/40 pt-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-[var(--glass-border)] bg-white/20 px-4 py-2.5 text-center text-sm font-medium text-[var(--text-color)] transition-all duration-200 hover:border-[var(--primary-accent)] hover:bg-white/30"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-[var(--primary-accent)] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_8px_20px_rgba(201,123,74,0.25)]"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}