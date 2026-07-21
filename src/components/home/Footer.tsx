"use client";

import Link from "next/link";
import { Mail, MapPin, Clock } from "lucide-react";
import { FaSquareFacebook, FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
];

const supportLinks = [
  { label: "Help & Support", href: "/help" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FaSquareFacebook
 },
  { label: "Instagram", href: "https://instagram.com", icon: FiInstagram
 },
  { label: "Twitter", href: "https://twitter.com", icon: FaXTwitter
 },
];

export default function Footer() {
  return (
    <footer className="mx-auto mt-12 w-full max-w-6xl px-6 pb-10">
      <div className="rounded-[28px] border border-white/60 bg-white/15 p-8 shadow-[0_16px_50px_rgba(58,42,29,0.16)] backdrop-blur-xl sm:p-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + blurb */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-baseline gap-1">
              <span className="text-[26px] font-medium tracking-tight text-[var(--text-color)]">
                Adhunik
              </span>
              <span className="text-[26px] font-medium italic tracking-tight text-[var(--primary-accent)]">
                Boighor
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--text-muted)]">
              A warm corner for stories, discovery, and timeless reading —
              crafted with the charm of a classic library, reimagined for
              modern readers.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/20 text-[var(--text-color)] transition-all duration-200 hover:border-[var(--primary-accent)] hover:bg-white/30 hover:text-[var(--primary-accent)]"
                >
                  <Icon size={17} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary-accent)]">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-color)]">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[var(--primary-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary-accent)]">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-color)]">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[var(--primary-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-9 grid grid-cols-1 gap-4 border-t border-white/40 pt-6 text-sm text-[var(--text-muted)] sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[var(--primary-accent)]" />
            <span>Bookstore Lane, Dhaka</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[var(--primary-accent)]" />
            <span>Open daily, 9am – 9pm</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-[var(--primary-accent)]" />
            <a
              href="mailto:hello@adhunikboighor.com"
              className="transition-colors hover:text-[var(--primary-accent)]"
            >
              hello@adhunikboighor.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/40 pt-5 text-xs text-[var(--text-muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} Adhunik Boighor. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-[var(--primary-accent)]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--primary-accent)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}