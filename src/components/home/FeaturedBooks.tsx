"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCard from "../products/BookCard";
import { fetchBooks } from "@/lib/api/book";

export default function FeaturedBooks() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-books"],
    queryFn: () => fetchBooks({ sort: "rating_desc", limit: 4 }),
  });

  const books = data?.items ?? [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary-accent)]">
            Handpicked
          </span>
          <h2 className="mt-2 text-3xl font-medium text-[var(--text-color)]">
            Featured books
          </h2>
        </div>
        <Link
          href="/books"
          className="hidden items-center gap-1.5 text-sm font-medium text-[var(--primary-accent)] hover:underline sm:flex"
        >
          View all books <ArrowRight size={15} />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {isLoading &&
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4.6] w-full animate-pulse rounded-[24px] border border-white/40 bg-white/20"
            />
          ))}

        {!isLoading && books.map((book) => <BookCard key={book._id} book={book} />)}
      </div>

      <Link
        href="/books"
        className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-[var(--primary-accent)] hover:underline sm:hidden"
      >
        View all books <ArrowRight size={15} />
      </Link>
    </section>
  );
}