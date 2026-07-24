"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Lognform() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await authClient.signIn.email({
      email: form.email,
      password: form.password,
    });

    if(!error){
      toast.success("Login success");
      router.push("/");
      window.location.href = "/";
    }
    else{
      toast.error(error.message || "Login failed");
      return;
    }
    console.log("Login submitted", form);
  };

  return (
    <div className="min-h-screen mt-20 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/15 shadow-[0_20px_60px_rgba(58,42,29,0.18)] backdrop-blur-xl lg:flex-row">
        <div className="flex flex-1 flex-col justify-between bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_55%)] p-8 sm:p-10 lg:p-12 lg:justify-center">
          <div className="flex flex-col items-center gap-4 text-center lg:items-center lg:justify-center lg:py-8">
            <Image src="/assets/logo.svg" alt="Adhunikboighor logo" width={192} height={192} className="drop-shadow-[0_10px_20px_rgba(58,42,29,0.18)]" />
            <div>
              <span className="text-[26px] font-medium tracking-tight text-[var(--text-color)]">
                Adhunik
              </span>
              <span className="text-[26px] font-medium italic tracking-tight text-[var(--primary-accent)]">
                Boighor
              </span>
              <h2 className="mt-2 text-xl font-semibold text-[var(--text-color)]">Welcome back</h2>
            </div>
          </div>

          <div className="mt-8 space-y-4 lg:mt-10">
            <p className="text-center text-sm leading-7 text-[var(--text-muted)] lg:px-4">
              Step back into the stacks and continue your reading journey with ease.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 sm:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[var(--primary-accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(201,123,74,0.2)] transition-all duration-200 hover:-translate-y-0.5"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-[var(--text-muted)]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-[var(--secondary-accent)]">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
