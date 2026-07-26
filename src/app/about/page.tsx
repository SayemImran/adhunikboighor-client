import { BookOpen, Heart, Users, Sparkles } from "lucide-react";

const values = [
  {
    icon: BookOpen,
    title: "Curated selection",
    description:
      "Every title on our shelves is chosen with care, spanning Bengali classics to contemporary voices from around the world.",
  },
  {
    icon: Heart,
    title: "Reader first",
    description:
      "We built Adhunik Boighor around the reading experience — fair prices, honest descriptions, and no clutter.",
  },
  {
    icon: Users,
    title: "Community driven",
    description:
      "Recommendations, reviews, and ratings come from real readers who share our love for stories.",
  },
  {
    icon: Sparkles,
    title: "Modern & timeless",
    description:
      "A digital shelf with the charm of a classic library — thoughtfully designed for today's readers.",
  },
];

const stats = [
  { value: "12k+", label: "Titles listed" },
  { value: "8k+", label: "Happy readers" },
  { value: "4.9", label: "Average rating" },
  { value: "2024", label: "Founded" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full border border-[var(--glass-border)] bg-white/20 px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--secondary-accent)] backdrop-blur-md">
          Our story
        </span>
        <h1 className="mt-5 text-4xl font-medium leading-tight text-[var(--text-color)] sm:text-5xl">
          A modern home for
          <br />
          <span className="italic text-[var(--primary-accent)]">timeless stories</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[var(--text-muted)]">
          Adhunik Boighor — "modern bookshop" — began with a simple idea: reading
          should feel warm, personal, and unhurried, even online. We bring together
          thousands of titles across genres and languages, wrapped in an experience
          that feels like your favorite corner bookstore.
        </p>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/50 bg-white/15 p-5 text-center shadow-[0_10px_30px_rgba(58,42,29,0.1)] backdrop-blur-lg"
          >
            <p className="text-2xl font-semibold text-[var(--text-color)]">{stat.value}</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mt-20">
        <h2 className="text-center text-2xl font-medium text-[var(--text-color)]">
          What we stand for
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="flex gap-4 rounded-[24px] border border-white/50 bg-white/15 p-6 shadow-[0_10px_30px_rgba(58,42,29,0.1)] backdrop-blur-lg"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary-accent)]/15 text-[var(--primary-accent)]">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-color)]">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                    {v.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Closing note */}
      <div className="mx-auto mt-20 max-w-2xl rounded-[28px] border border-white/60 bg-white/15 p-8 text-center shadow-[0_16px_50px_rgba(58,42,29,0.16)] backdrop-blur-xl sm:p-10">
        <h2 className="text-xl font-medium text-[var(--text-color)]">
          Thank you for reading with us
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
          Whether you're chasing an old favorite or discovering something new,
          we're glad to have you on our shelves. Happy reading.
        </p>
      </div>
    </div>
  );
}