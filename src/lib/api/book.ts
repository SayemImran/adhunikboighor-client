export type Book = {
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

export type BooksResponse = {
  items: Book[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type BooksQuery = {
  search?: string;
  genre?: string;
  language?: string;
  featured?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
};

export async function fetchBooks(query: BooksQuery = {}): Promise<BooksResponse> {
  const params = new URLSearchParams();

  if (query.search) params.set("search", query.search);
  if (query.genre && query.genre !== "All genres") params.set("genre", query.genre);
  if (query.language && query.language !== "All languages")
    params.set("language", query.language);
  if (query.featured) params.set("featured", "true");
  if (query.sort) params.set("sort", query.sort);
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));

  const res = await fetch(`http://localhost:5000/api/items?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
}