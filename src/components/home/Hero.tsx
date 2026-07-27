"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[65vh] w-full max-w-6xl items-center px-6 py-16">
      {/* Ambient glass orb — subtle, no hard clipping edge */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-[var(--primary-accent)]/10 blur-3xl"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 grid w-full items-center gap-12 md:grid-cols-2">
        {/* Left: copy */}
        <div>
          <motion.span
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
            className="inline-block rounded-full border border-[var(--glass-border)] bg-white/20 px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--secondary-accent)] backdrop-blur-md"
          >
            Curated for readers, since day one
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.1}
            className="mt-5 text-4xl font-medium leading-tight text-[var(--text-color)] sm:text-5xl"
          >
            Stories worth
            <br />
            <span className="italic text-[var(--primary-accent)]">losing time</span> to
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.2}
            className="mt-5 max-w-md text-base leading-relaxed text-[var(--text-muted)]"
          >
            Browse thousands of titles across every genre, handpicked
            recommendations, and a reading experience built for book lovers.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.3}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/books"
              className="rounded-full bg-[var(--primary-accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(201,123,74,0.3)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Explore books
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[var(--glass-border)] bg-white/20 px-6 py-3 text-sm font-medium text-[var(--text-color)] backdrop-blur-md transition-all duration-200 hover:border-[var(--primary-accent)] hover:bg-white/30"
            >
              Our story
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.4}
            className="mt-10 flex gap-8"
          >
            {[
              { value: "12k+", label: "Titles" },
              { value: "8k+", label: "Readers" },
              { value: "4.9", label: "Avg rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-medium text-[var(--text-color)]">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: floating glass book stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative mx-auto hidden h-80 w-full max-w-sm md:block"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-8 h-56 w-40 -translate-x-1/2 rotate-[-6deg] rounded-2xl border border-white/50 bg-white/20 shadow-[0_20px_50px_rgba(58,42,29,0.18)] backdrop-blur-lg"
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute left-1/2 top-14 h-56 w-40 -translate-x-1/2 rotate-[4deg] rounded-2xl border border-[var(--glass-border)] bg-white/25 shadow-[0_20px_50px_rgba(58,42,29,0.2)] backdrop-blur-lg"
          />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="absolute left-1/2 top-20 flex h-56 w-40 -translate-x-1/2 flex-col justify-between rounded-2xl border border-white/60 bg-white/30 p-5 shadow-[0_20px_50px_rgba(58,42,29,0.22)] backdrop-blur-lg"
          >
            <div className="h-1.5 w-10 rounded-full bg-[var(--primary-accent)]/60" />
            <div className="space-y-1.5">
              <div className="h-1 w-full rounded-full bg-[var(--text-color)]/15" />
              <div className="h-1 w-4/5 rounded-full bg-[var(--text-color)]/15" />
              <div className="h-1 w-3/5 rounded-full bg-[var(--text-color)]/15" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}