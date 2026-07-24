"use client";

import Link from "next/link";
import NavLink from "./NavLink";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import CustomTrigger from "../profiles/CustomTrigger";

export default function Navbar() {
    const links = [
        { label: "Home", href: "/" },
        { label: "Books", href: "/books" },
        { label: "About", href: "/about" },
        { label: "Blogs", href: "/blogs" },
    ];
    const router = useRouter();
    const {data:sessionData, isPending} = authClient.useSession();
    const user = sessionData?.user;
    console.log(user);

    return (
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/50 bg-white/15 px-5 py-3 shadow-[0_12px_40px_rgba(58,42,29,0.16)] backdrop-blur-lg">
            <Link href="/" className="flex items-baseline gap-1">
                <span className="text-[26px] font-medium tracking-tight text-[var(--text-color)]">
                    Adhunik
                </span>
                <span className="text-[26px] font-medium italic tracking-tight text-[var(--primary-accent)]">
                    Boighor
                </span>
            </Link>

            <div className="hidden items-center gap-2 md:flex">
                {links.map((link) => (
                    <NavLink key={link.label} href={link.href} label={link.label} />
                ))}
            </div>

            <div className="flex items-center gap-2">
                { user? (<CustomTrigger userData={user}/>):(
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
        </nav>
    );
}