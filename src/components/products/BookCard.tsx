import Link from "next/link";
import { Star, BookOpen } from "lucide-react";

type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  language: string;
  price: number;
  stock: number;
  rating: number;
  coverImage?: string;
  isFeatured?: boolean;
};

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/books/${book._id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/50 bg-white/15 shadow-[0_10px_30px_rgba(58,42,29,0.12)] backdrop-blur-lg transition-transform duration-200 hover:-translate-y-1"
    >
      {/* Cover */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/25">
        {book.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen size={32} className="text-[var(--primary-accent)]" strokeWidth={1.5} />
          </div>
        )}

        {book.isFeatured && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--primary-accent)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
            Featured
          </span>
        )}

        {book.stock === 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            Out of stock
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--secondary-accent)]">
          {book.genre}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[var(--text-color)]">
          {book.title}
        </h3>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">{book.author}</p>

        <div className="mt-2 flex items-center gap-1">
          <Star size={13} className="fill-[var(--primary-accent)] text-[var(--primary-accent)]" />
          <span className="text-xs font-medium text-[var(--text-color)]">{book.rating}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-base font-semibold text-[var(--text-color)]">৳{book.price}</p>
          <span className="rounded-full border border-[var(--glass-border)] bg-white/20 px-3 py-1.5 text-xs font-medium text-[var(--text-color)] transition-colors group-hover:bg-white/30">
            View details
          </span>
        </div>
      </div>
    </Link>
  );
}