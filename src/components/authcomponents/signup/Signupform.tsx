"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const initialState = {
  name: "",
  email: "",
  profileImage: "",
  password: "",
  confirmPassword: "",
};

export default function Signupform() {
  const [form, setForm] = useState(initialState);

  const passwordChecks = useMemo(() => {
    const password = form.password;
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
      match: password.length > 0 && password === form.confirmPassword,
    };
  }, [form.password, form.confirmPassword]);

  const isPasswordValid = Object.values(passwordChecks).slice(0, 4).every(Boolean);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid || !passwordChecks.match) return;
    console.log("Signup submitted", form);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
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
              <h2 className="mt-2 text-xl font-semibold text-[var(--text-color)]">Create your account</h2>
            </div>
          </div>

          <div className="mt-8 space-y-4 lg:mt-10">
            <p className="text-center text-sm leading-7 text-[var(--text-muted)] lg:px-4">
              Join the shelves of Adhunik Boighor and begin your next chapter in a cozy literary haven.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 sm:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">Full name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ayesha Rahman"
                className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none ring-0 placeholder:text-[var(--text-muted)]"
              />
            </div>

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
              <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">Profile image link</label>
              <input
                name="profileImage"
                value={form.profileImage}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
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
                placeholder="Create a strong password"
                className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
              />
              <div className="mt-2 space-y-1 text-sm text-[var(--text-muted)]">
                <p className={passwordChecks.length ? "text-[var(--secondary-accent)]" : ""}>• At least 8 characters</p>
                <p className={passwordChecks.upper ? "text-[var(--secondary-accent)]" : ""}>• One uppercase letter</p>
                <p className={passwordChecks.lower ? "text-[var(--secondary-accent)]" : ""}>• One lowercase letter</p>
                <p className={passwordChecks.number ? "text-[var(--secondary-accent)]" : ""}>• One number</p>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
              />
              {form.confirmPassword && !passwordChecks.match && (
                <p className="mt-2 text-sm text-[#a94d3d]">Passwords do not match.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isPasswordValid || !passwordChecks.match}
              className="w-full rounded-full bg-[var(--primary-accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(201,123,74,0.2)] transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Create account
            </button>

            <p className="text-center text-sm text-[var(--text-muted)]">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[var(--secondary-accent)]">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
