import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Nusrat Jahan",
    role: "Avid reader",
    quote:
      "The AI assistant helped me find exactly the kind of adventure novel I was in the mood for. Delivery was quick too.",
    rating: 5,
  },
  {
    name: "Rafiul Islam",
    role: "College student",
    quote:
      "Prices are fair and the collection of Bengali classics is honestly better than most physical stores near me.",
    rating: 5,
  },
  {
    name: "Farhana Akter",
    role: "Book club organizer",
    quote:
      "Clean interface, easy checkout, and the featured picks are genuinely well chosen. My book club orders from here every month.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary-accent)]">
          Reader stories
        </span>
        <h2 className="mt-2 text-3xl font-medium text-[var(--text-color)]">
          Loved by our readers
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col rounded-[24px] border border-white/50 bg-white/15 p-6 shadow-[0_10px_30px_rgba(58,42,29,0.1)] backdrop-blur-lg"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  className={
                    i < t.rating
                      ? "fill-[var(--primary-accent)] text-[var(--primary-accent)]"
                      : "text-[var(--text-muted)]/30"
                  }
                />
              ))}
            </div>

            <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-color)]">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="mt-5 flex items-center gap-3 border-t border-white/40 pt-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-accent)] text-sm font-semibold text-white">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-color)]">{t.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}