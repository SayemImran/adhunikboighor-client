import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.3),_transparent_50%),linear-gradient(135deg,_var(--background)_0%,_var(--background-end)_100%)] px-4">
      <div className="w-full max-w-lg rounded-[32px] border border-white/60 bg-white/15 p-8 text-center shadow-[0_20px_60px_rgba(58,42,29,0.18)] backdrop-blur-xl sm:p-10">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full border border-white/50 bg-white/20 p-4 shadow-[0_10px_30px_rgba(58,42,29,0.12)]">
            <Image src="/assets/logo.svg" alt="Adhunikboighor logo" width={84} height={84} />
          </div>
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--secondary-accent)]">
          404 • Page not found
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--text-color)] sm:text-5xl">
          The page you seek has wandered off.
        </h1>
        <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
          The shelf you were looking for seems to be missing. Return to the main collection and continue your reading journey.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-[var(--primary-accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(201,123,74,0.2)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Go home
          </Link>
          <Link
            href="/books"
            className="rounded-full border border-[var(--glass-border)] bg-white/20 px-6 py-3 text-sm font-medium text-[var(--text-color)] backdrop-blur-md transition-all duration-200 hover:border-[var(--primary-accent)] hover:bg-white/30"
          >
            Explore books
          </Link>
        </div>
      </div>
    </div>
  );
}
