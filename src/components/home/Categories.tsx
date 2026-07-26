import Link from "next/link";
import {
  Compass,
  Sparkles,
  Search,
  Heart,
  Rocket,
  Landmark,
  Feather,
  Baby,
} from "lucide-react";

const categories = [
  { label: "Adventure", icon: Compass, genre: "Adventure" },
  { label: "Fantasy", icon: Sparkles, genre: "Fantasy" },
  { label: "Mystery", icon: Search, genre: "Mystery" },
  { label: "Romance", icon: Heart, genre: "Romance" },
  { label: "Sci-Fi", icon: Rocket, genre: "Sci-Fi" },
  { label: "History", icon: Landmark, genre: "History" },
  { label: "Poetry", icon: Feather, genre: "Poetry" },
  { label: "Children", icon: Baby, genre: "Children" },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary-accent)]">
          Browse by
        </span>
        <h2 className="mt-2 text-3xl font-medium text-[var(--text-color)]">Categories</h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.label}
              href={`/books?genre=${encodeURIComponent(cat.genre)}`}
              className="group flex flex-col items-center gap-3 rounded-[24px] border border-white/50 bg-white/15 px-4 py-6 text-center shadow-[0_10px_30px_rgba(58,42,29,0.1)] backdrop-blur-lg transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] transition-colors group-hover:bg-[var(--primary-accent)] group-hover:text-white">
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <span className="text-sm font-medium text-[var(--text-color)]">
                {cat.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}