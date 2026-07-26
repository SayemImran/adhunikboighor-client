import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

const posts = [
  {
    slug: "bengali-classics-to-start-with",
    title: "5 Bengali Classics Every Reader Should Start With",
    excerpt:
      "From Bibhutibhushan's wilderness adventures to Rabindranath's quiet reflections, these five titles are the perfect gateway into Bengali literature.",
    category: "Reading Lists",
    date: "June 12, 2026",
    readTime: "6 min read",
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
  },
  {
    slug: "building-a-reading-habit",
    title: "How to Build a Reading Habit That Actually Sticks",
    excerpt:
      "Small, consistent choices beat ambitious reading goals. Here's a practical approach to reading more without burning out.",
    category: "Reading Tips",
    date: "May 28, 2026",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
  },
  {
    slug: "translated-fiction-worth-reading",
    title: "Translated Fiction That Deserves a Spot on Your Shelf",
    excerpt:
      "Great stories shouldn't be limited by language. We round up standout translated works available in our collection.",
    category: "Recommendations",
    date: "May 14, 2026",
    readTime: "7 min read",
    coverImage:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80",
  },
  {
    slug: "why-adventure-novels-endure",
    title: "Why Adventure Novels Never Go Out of Style",
    excerpt:
      "From Chander Pahar to modern survival stories, adventure fiction keeps pulling readers back. We explore why.",
    category: "Deep Dive",
    date: "April 30, 2026",
    readTime: "4 min read",
    coverImage:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&q=80",
  },
  {
    slug: "gifting-books-guide",
    title: "A Thoughtful Guide to Gifting Books",
    excerpt:
      "Picking the right book for someone is an art. Here's how to match a title to a person, not just an occasion.",
    category: "Guides",
    date: "April 9, 2026",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&q=80",
  },
  {
    slug: "poetry-for-beginners",
    title: "New to Poetry? Start Here",
    excerpt:
      "Poetry can feel intimidating. These accessible collections ease you in without losing any of the craft's depth.",
    category: "Reading Lists",
    date: "March 22, 2026",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&q=80",
  },
];

export default function BlogsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full border border-[var(--glass-border)] bg-white/20 px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--secondary-accent)] backdrop-blur-md">
          From the shelf
        </span>
        <h1 className="mt-5 text-4xl font-medium leading-tight text-[var(--text-color)] sm:text-5xl">
          Stories about stories
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
          Reading lists, recommendations, and reflections from the Adhunik
          Boighor team.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-[24px] border border-white/50 bg-white/15 shadow-[0_10px_30px_rgba(58,42,29,0.12)] backdrop-blur-lg transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="aspect-[16/10] w-full overflow-hidden bg-white/25">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--secondary-accent)]">
                {post.category}
              </span>
              <h2 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-[var(--text-color)]">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
                {post.excerpt}
              </p>

              <div className="mt-auto flex items-center gap-4 pt-5 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}