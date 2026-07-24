"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, BookOpen } from "lucide-react";
import BookCard from "@/components/products/BookCard";

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

const genreOptions = [
  "All genres",
  "Adventure",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Biography",
  "History",
  "Poetry",
  "Children",
  "Self-Help",
];

const languageOptions = ["All languages", "Bengali", "English", "Hindi", "Urdu", "Other"];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest rated", value: "rating_desc" },
];

const PAGE_SIZE = 8;

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All genres");
  const [language, setLanguage] = useState("All languages");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/items");
        const data = await res.json();
        setBooks(data.items || []);
      } catch {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [search, genre, language, sort]);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }

    if (genre !== "All genres") {
      result = result.filter((b) => b.genre === genre);
    }

    if (language !== "All languages") {
      result = result.filter((b) => b.language === language);
    }

    switch (sort) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating_desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break; // "newest" — already sorted by API (createdAt desc)
    }

    return result;
  }, [books, search, genre, language, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-[var(--text-color)]">Explore books</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Browse our full collection and find your next favorite read.
        </p>
      </div>

      {/* Search + filters */}
      <div className="mb-8 flex flex-col gap-3 rounded-[24px] border border-white/50 bg-white/15 p-4 shadow-[0_10px_30px_rgba(58,42,29,0.1)] backdrop-blur-lg sm:flex-row sm:items-center">
        {/* Search bar */}
        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full rounded-full border border-white/50 bg-white/25 py-2.5 pl-11 pr-4 text-sm text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Genre filter */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="rounded-full border border-white/50 bg-white/25 px-4 py-2.5 text-sm text-[var(--text-color)] outline-none sm:w-44"
        >
          {genreOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Language filter */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-full border border-white/50 bg-white/25 px-4 py-2.5 text-sm text-[var(--text-color)] outline-none sm:w-44"
        >
          {languageOptions.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-white/50 bg-white/25 px-4 py-2.5 text-sm text-[var(--text-color)] outline-none sm:w-48"
        >
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="mb-4 text-sm text-[var(--text-muted)]">
          {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"} found
        </p>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4.6] w-full animate-pulse rounded-[24px] border border-white/40 bg-white/20"
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredBooks.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--glass-border)] bg-white/10 py-20 text-center">
          <BookOpen size={36} className="mb-3 text-[var(--primary-accent)]" strokeWidth={1.5} />
          <p className="text-sm font-medium text-[var(--text-color)]">No books found</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      {/* Book grid */}
      {!loading && paginatedBooks.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {paginatedBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-full border border-[var(--glass-border)] bg-white/20 px-4 py-2 text-sm font-medium text-[var(--text-color)] transition-colors hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-9 w-9 rounded-full text-sm font-medium transition-colors ${
                page === p
                  ? "bg-[var(--primary-accent)] text-white shadow-[0_8px_20px_rgba(201,123,74,0.25)]"
                  : "border border-[var(--glass-border)] bg-white/20 text-[var(--text-color)] hover:bg-white/30"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-full border border-[var(--glass-border)] bg-white/20 px-4 py-2 text-sm font-medium text-[var(--text-color)] transition-colors hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}