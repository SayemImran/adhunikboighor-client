"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, Pencil, Trash2, BookOpen } from "lucide-react";

type Book = {
    _id: string;
    title: string;
    author: string;
    coverImage?: string;
    price: number;
    stock: number;
};

export default function ManageItemsPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/items");
            if (!res.ok) throw new Error("Failed to fetch books");
            const data = await res.json();
            setBooks(data.items || []);
        } catch (err) {
            toast.error("Could not load books");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`);
        if (!confirmed) return;

        setDeletingId(id);
        try {
            const tokenRes = await fetch("/api/auth/token", { credentials: "include" });
            if (!tokenRes.ok) throw new Error("Not authenticated");
            const { token } = await tokenRes.json();

            const res = await fetch(`http://localhost:5000/api/items/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.message || "Failed to delete book");
            }

            toast.success(`"${title}" deleted successfully`);
            setBooks((prev) => prev.filter((b) => b._id !== id));
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-[var(--text-color)]">Manage books</h1>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                        View, edit, or remove titles listed in your shop.
                    </p>
                </div>
                <Link
                    href="/items/add"
                    className="rounded-full bg-[var(--primary-accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(201,123,74,0.25)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                    + Add book
                </Link>
            </div>

            {/* Loading state */}
            {loading && (
                <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-16 w-full animate-pulse rounded-2xl border border-white/40 bg-white/20"
                        />
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!loading && books.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--glass-border)] bg-white/10 py-16 text-center">
                    <BookOpen size={36} className="mb-3 text-[var(--primary-accent)]" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-[var(--text-color)]">No books added yet</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                        Start by adding your first title to the shop.
                    </p>
                </div>
            )}

            {/* Table */}
            {!loading && books.length > 0 && (
                <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/15 shadow-[0_10px_30px_rgba(58,42,29,0.1)]">
                    {/* Desktop table */}
                    <table className="hidden w-full text-left text-sm sm:table">
                        <thead>
                            <tr className="border-b border-white/40 text-xs font-semibold uppercase tracking-wide text-[var(--secondary-accent)]">
                                <th className="px-5 py-3.5">Book</th>
                                <th className="px-5 py-3.5">Price</th>
                                <th className="px-5 py-3.5">Stock</th>
                                <th className="px-5 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr
                                    key={book._id}
                                    className="border-b border-white/30 last:border-0 hover:bg-white/15"
                                >
                                    <td className="flex items-center gap-3 px-5 py-3.5">
                                        <div className="h-12 w-9 shrink-0 overflow-hidden rounded-md bg-white/30">
                                            {book.coverImage ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={book.coverImage}
                                                    alt={book.title}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = "none";
                                                    }}
                                                />
                                            ) : null}
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-color)]">{book.title}</p>
                                            <p className="text-xs text-[var(--text-muted)]">{book.author}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-[var(--text-color)]">৳{book.price}</td>
                                    <td className="px-5 py-3.5">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${book.stock > 0
                                                    ? "bg-[var(--secondary-accent)]/15 text-[var(--secondary-accent)]"
                                                    : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/books/${book._id}`}
                                                title="View"
                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/20 text-[var(--text-color)] transition-colors hover:bg-white/30"
                                            >
                                                <Eye size={15} strokeWidth={1.75} />
                                            </Link>
                                            <Link
                                                href={`/items/edit/${book._id}`}
                                                title="Edit"
                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/20 text-[var(--text-color)] transition-colors hover:bg-white/30"
                                            >
                                                <Pencil size={15} strokeWidth={1.75} />
                                            </Link>
                                            <button
                                                title="Delete"
                                                onClick={() => handleDelete(book._id, book.title)}
                                                disabled={deletingId === book._id}
                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/20 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
                                            >
                                                <Trash2 size={15} strokeWidth={1.75} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Mobile cards */}
                    <div className="flex flex-col divide-y divide-white/30 sm:hidden">
                        {books.map((book) => (
                            <div key={book._id} className="flex items-center gap-3 p-4">
                                <div className="h-16 w-12 shrink-0 overflow-hidden rounded-md bg-white/30">
                                    {book.coverImage ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = "none";
                                            }}
                                        />
                                    ) : null}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-medium text-[var(--text-color)]">{book.title}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{book.author}</p>
                                    <div className="mt-1 flex items-center gap-3 text-xs text-[var(--text-muted)]">
                                        <span>৳{book.price}</span>
                                        <span>{book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}</span>
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <Link
                                        href={`/books/${book._id}`}
                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/20 text-[var(--text-color)]"
                                    >
                                        <Eye size={15} strokeWidth={1.75} />
                                    </Link>
                                    <Link
                                        href={`/items/edit/${book._id}`}
                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/20 text-[var(--text-color)]"
                                    >
                                        <Pencil size={15} strokeWidth={1.75} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(book._id, book.title)}
                                        disabled={deletingId === book._id}
                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/20 text-red-500 disabled:opacity-50"
                                    >
                                        <Trash2 size={15} strokeWidth={1.75} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}