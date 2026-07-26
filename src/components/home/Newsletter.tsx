"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    // Simulated subscribe — wire to a real endpoint when ready
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setEmail("");
    toast.success("You're subscribed! Watch your inbox for new arrivals.");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 rounded-[32px] border border-white/60 bg-white/15 p-8 text-center shadow-[0_16px_50px_rgba(58,42,29,0.16)] backdrop-blur-xl sm:p-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-accent)]/15 text-[var(--primary-accent)]">
          <Mail size={22} strokeWidth={1.75} />
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[var(--text-color)] sm:text-3xl">
            Never miss a new arrival
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
            Subscribe for weekly picks, new releases, and reader-favorite recommendations.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-full border border-white/50 bg-white/30 px-5 py-3 text-sm text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[var(--primary-accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(201,123,74,0.25)] transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}