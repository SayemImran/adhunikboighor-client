import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, BookOpen, Globe2, Calendar, Building2, PackageCheck } from "lucide-react";

type Book = {
    _id: string;
    title: string;
    author: string;
    genre: string;
    language: string;
    price: number;
    stock: number;
    rating: number;
    publisher: string;
    publishedYear: number;
    coverImage?: string;
    description: string;
    isFeatured?: boolean;
};

async function getBook(id: string): Promise<Book | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data.item;
    } catch {
        return null;
    }
}

export default async function BookDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const book = await getBook(id);

    if (!book) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[32px] border border-white/60 bg-white/15 shadow-[0_20px_60px_rgba(58,42,29,0.18)] backdrop-blur-xl">
                <div className="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-[300px_1fr]">
                    {/* Cover */}
                    <div className="mx-auto w-full max-w-[260px] lg:mx-0">
                        <div className="aspect-[2/3] w-full overflow-hidden rounded-2xl border border-white/50 bg-white/25 shadow-[0_16px_40px_rgba(58,42,29,0.2)]">
                            {book.coverImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <BookOpen size={40} className="text-[var(--primary-accent)]" strokeWidth={1.5} />
                                </div>
                            )}
                        </div>

                        {book.isFeatured && (
                            <span className="mt-4 inline-block rounded-full bg-[var(--primary-accent)]/15 px-3 py-1 text-xs font-semibold text-[var(--primary-accent)]">
                                ★ Featured title
                            </span>
                        )}
                    </div>

                    {/* Info */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary-accent)]">
                            {book.genre}
                        </p>
                        <h1 className="mt-2 text-3xl font-medium leading-tight text-[var(--text-color)] sm:text-4xl">
                            {book.title}
                        </h1>
                        <p className="mt-2 text-base text-[var(--text-muted)]">by {book.author}</p>

                        <div className="mt-4 flex items-center gap-1.5">
                            <Star size={17} className="fill-[var(--primary-accent)] text-[var(--primary-accent)]" />
                            <span className="text-sm font-medium text-[var(--text-color)]">{book.rating}</span>
                            <span className="text-sm text-[var(--text-muted)]">/ 5</span>
                        </div>

                        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
                            {book.description}
                        </p>

                        {/* Key info grid */}
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl border border-white/50 bg-white/20 p-4">
                                <Globe2 size={16} className="mb-1.5 text-[var(--primary-accent)]" />
                                <p className="text-xs text-[var(--text-muted)]">Language</p>
                                <p className="text-sm font-medium text-[var(--text-color)]">{book.language}</p>
                            </div>
                            <div className="rounded-2xl border border-white/50 bg-white/20 p-4">
                                <Calendar size={16} className="mb-1.5 text-[var(--primary-accent)]" />
                                <p className="text-xs text-[var(--text-muted)]">Published</p>
                                <p className="text-sm font-medium text-[var(--text-color)]">{book.publishedYear}</p>
                            </div>
                            <div className="rounded-2xl border border-white/50 bg-white/20 p-4">
                                <Building2 size={16} className="mb-1.5 text-[var(--primary-accent)]" />
                                <p className="text-xs text-[var(--text-muted)]">Publisher</p>
                                <p className="text-sm font-medium text-[var(--text-color)]">{book.publisher}</p>
                            </div>
                            <div className="rounded-2xl border border-white/50 bg-white/20 p-4">
                                <PackageCheck size={16} className="mb-1.5 text-[var(--primary-accent)]" />
                                <p className="text-xs text-[var(--text-muted)]">Availability</p>
                                <p className="text-sm font-medium text-[var(--text-color)]">
                                    {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
                                </p>
                            </div>
                        </div>

                        {/* Price + CTA */}
                        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/40 pt-6">
                            <p className="text-3xl font-semibold text-[var(--text-color)]">৳{book.price}</p>
                            <button
                                disabled={book.stock === 0}
                                className="rounded-full bg-[var(--primary-accent)] px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(201,123,74,0.25)] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {book.stock > 0 ? "Add to cart" : "Out of stock"}
                            </button>
                            <Link
                                href="/books"
                                className="rounded-full border border-[var(--glass-border)] bg-white/20 px-6 py-3 text-sm font-medium text-[var(--text-color)] transition-all duration-200 hover:bg-white/30"
                            >
                                Back to books
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}