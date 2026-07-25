"use client";

import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Search, BookOpen } from "lucide-react";
import { fetchBooks } from "@/lib/api/book";
import BookCard from "@/components/products/BookCard";

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

const LIMIT = 8;

export default function BooksPage() {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [genre, setGenre] = useState("All genres");
    const [language, setLanguage] = useState("All languages");
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(timer);
    }, [search]);

    // Reset to page 1 whenever filters change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, genre, language, sort]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["books", { search: debouncedSearch, genre, language, sort, page }],
        queryFn: () =>
            fetchBooks({
                search: debouncedSearch,
                genre,
                language,
                sort,
                page,
                limit: LIMIT,
            }),
        placeholderData: keepPreviousData,
    });

    const books = data?.items ?? [];
    const pagination = data?.pagination;
    const totalPages = pagination?.totalPages ?? 1;

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
            {!isLoading && pagination && (
                <p className="mb-4 text-sm text-[var(--text-muted)]">
                    {pagination.total} {pagination.total === 1 ? "book" : "books"} found
                </p>
            )}

            {/* Loading skeleton */}
            {isLoading && (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="aspect-[3/4.6] w-full animate-pulse rounded-[24px] border border-white/40 bg-white/20"
                        />
                    ))}
                </div>
            )}

            {/* Error state */}
            {isError && !isLoading && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-red-300 bg-red-50/40 py-20 text-center">
                    <p className="text-sm font-medium text-red-600">Something went wrong</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                        Could not load books. Please try again.
                    </p>
                </div>
            )}

            {/* Empty state */}
            {!isLoading && !isError && books.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--glass-border)] bg-white/10 py-20 text-center">
                    <BookOpen size={36} className="mb-3 text-[var(--primary-accent)]" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-[var(--text-color)]">No books found</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                        Try adjusting your search or filters.
                    </p>
                </div>
            )}

            {/* Book grid */}
            {!isLoading && !isError && books.length > 0 && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                    {books.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
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
                            className={`h-9 w-9 rounded-full text-sm font-medium transition-colors ${page === p
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