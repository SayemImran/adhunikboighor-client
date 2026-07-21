import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.3),_transparent_50%),linear-gradient(135deg,_var(--background)_0%,_var(--background-end)_100%)] px-4">
      <div className="w-full max-w-md rounded-[32px] border border-white/60 bg-white/15 p-8 text-center shadow-[0_20px_60px_rgba(58,42,29,0.18)] backdrop-blur-xl">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full border border-white/50 bg-white/20 p-4 shadow-[0_10px_30px_rgba(58,42,29,0.12)]">
            <Image src="/assets/logo.svg" alt="Adhunikboighor logo" width={84} height={84} />
          </div>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-color)]">
          Adhunik Boighor
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
          Opening the shelves for your next favorite story...
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-3 w-3 animate-bounce rounded-full bg-[var(--primary-accent)] [animation-delay:-0.2s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[var(--secondary-accent)] [animation-delay:-0.1s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[var(--primary-accent)]" />
        </div>
      </div>
    </div>
  );
}
