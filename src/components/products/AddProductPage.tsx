"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const initialState = {
    title: "",
    author: "",
    genre: "",
    language: "",
    price: "",
    stock: "",
    rating: "",
    publisher: "",
    publishedYear: "",
    coverImage: "",
    description: "",
    isFeatured: false,
};

const genreOptions = [
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

const languageOptions = ["Bengali", "English", "Hindi", "Urdu", "Other"];

export default function AddProductPage() {
    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setForm((prev) => ({ ...prev, [name]: checked }));
            return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            title: form.title.trim(),
            author: form.author.trim(),
            genre: form.genre,
            language: form.language,
            price: Number(form.price),
            stock: Number(form.stock),
            rating: Number(form.rating),
            publisher: form.publisher.trim(),
            publishedYear: Number(form.publishedYear),
            coverImage: form.coverImage.trim(),
            description: form.description.trim(),
            isFeatured: form.isFeatured,
        };

        try {
            const tokenRes = await fetch("/api/auth/token", {
                credentials: "include",
            });

            if (!tokenRes.ok) {
                throw new Error("Not authenticated");
            }

            const { token } = await tokenRes.json();

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.message || "Failed to add book");
            }

            toast.success("Book added successfully!");
            setForm(initialState);
            router.push("/dashboard/admin/items/manage");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-[var(--text-color)]">Add a new book</h1>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Fill in the details below to list a new title in the shop.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Cover preview + basic info */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">
                            Cover image URL
                        </label>
                        <div className="mb-3 flex h-56 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/50 bg-white/25">
                            {form.coverImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={form.coverImage}
                                    alt="Cover preview"
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />
                            ) : (
                                <span className="px-4 text-center text-xs text-[var(--text-muted)]">
                                    Cover preview will appear here
                                </span>
                            )}
                        </div>
                        <input
                            name="coverImage"
                            value={form.coverImage}
                            onChange={handleChange}
                            placeholder="https://images.example.com/books/cover.jpg"
                            className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-sm text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">
                                Title
                            </label>
                            <input
                                required
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Chander Pahar"
                                className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">
                                Author
                            </label>
                            <input
                                required
                                name="author"
                                value={form.author}
                                onChange={handleChange}
                                placeholder="Bibhutibhushan Bandyopadhyay"
                                className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">
                                Publisher
                            </label>
                            <input
                                required
                                name="publisher"
                                value={form.publisher}
                                onChange={handleChange}
                                placeholder="Signet Press"
                                className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">
                                Genre
                            </label>
                            <select
                                required
                                name="genre"
                                value={form.genre}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none"
                            >
                                <option value="" disabled>
                                    Select genre
                                </option>
                                {genreOptions.map((g) => (
                                    <option key={g} value={g}>
                                        {g}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">
                                Language
                            </label>
                            <select
                                required
                                name="language"
                                value={form.language}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none"
                            >
                                <option value="" disabled>
                                    Select language
                                </option>
                                {languageOptions.map((l) => (
                                    <option key={l} value={l}>
                                        {l}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">
                                Published year
                            </label>
                            <input
                                required
                                type="number"
                                name="publishedYear"
                                value={form.publishedYear}
                                onChange={handleChange}
                                placeholder="1937"
                                className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">
                                Rating
                            </label>
                            <input
                                required
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                name="rating"
                                value={form.rating}
                                onChange={handleChange}
                                placeholder="4.8"
                                className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
                            />
                        </div>
                    </div>
                </div>

                {/* Price / stock / featured */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">
                            Price (৳)
                        </label>
                        <input
                            required
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="320"
                            className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">
                            Stock
                        </label>
                        <input
                            required
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="45"
                            className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
                        />
                    </div>

                    <div className="flex items-end">
                        <label className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-white/50 bg-white/25 px-4 py-3">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={form.isFeatured}
                                onChange={handleChange}
                                className="h-4 w-4 accent-[var(--primary-accent)]"
                            />
                            <span className="text-sm font-medium text-[var(--text-color)]">
                                Mark as featured
                            </span>
                        </label>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">
                        Description
                    </label>
                    <textarea
                        required
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={5}
                        placeholder="An iconic adventure novel following Shankar's thrilling journey..."
                        className="w-full resize-none rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-full bg-[var(--primary-accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(201,123,74,0.2)] transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Adding book..." : "Add book"}
                    </button>

                    <button
                        type="button"
                        onClick={() => setForm(initialState)}
                        className="rounded-full border border-[var(--glass-border)] bg-white/20 px-6 py-3 text-sm font-medium text-[var(--text-color)] transition-all duration-200 hover:bg-white/30"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}