import Link from "next/link";
import { BookOpen, ShoppingBag, Star, Clock, BookPlus, BookOpenText } from "lucide-react";
import { requireRole } from "@/lib/proxy";

export default async function DashboardOverviewPage() {
  const user = await requireRole(["admin", "buyer"]);
  const isAdmin = user.role === "admin";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[var(--text-color)]">
          Welcome back, {user.name?.split(" ")[0] || "there"}
        </h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          {isAdmin
            ? "Here's what's happening in your shop today."
            : "Here's a quick look at your reading activity."}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {isAdmin ? (
          <>
            <StatCard icon={BookOpen} label="Total books" value="—" />
            <StatCard icon={ShoppingBag} label="Orders today" value="—" />
            <StatCard icon={Star} label="Avg. rating" value="—" />
            <StatCard icon={Clock} label="Out of stock" value="—" />
          </>
        ) : (
          <>
            <StatCard icon={ShoppingBag} label="Orders placed" value="—" />
            <StatCard icon={BookOpen} label="Books wishlisted" value="—" />
            <StatCard icon={Star} label="Reviews given" value="—" />
            <StatCard icon={Clock} label="Member since" value={formatYear(user.createdAt)} />
          </>
        )}
      </div>

      {/* Quick actions */}
      <div className="mt-10">
        <h2 className="text-lg font-medium text-[var(--text-color)]">Quick actions</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {isAdmin ? (
            <>
              <QuickAction
                href="/dashboard/admin/items/add"
                icon={BookPlus}
                title="Add a new book"
                description="List a new title in the shop catalog."
              />
              <QuickAction
                href="/dashboard/admin/items/manage"
                icon={BookOpenText}
                title="Manage books"
                description="Edit, update stock, or remove existing titles."
              />
            </>
          ) : (
            <>
              <QuickAction
                href="/books"
                icon={BookOpen}
                title="Explore books"
                description="Browse the full collection and find your next read."
              />
              <QuickAction
                href="/dashboard/profile"
                icon={ShoppingBag}
                title="View your profile"
                description="Update your account details and preferences."
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/20 p-4">
      <Icon size={18} className="text-[var(--primary-accent)]" strokeWidth={1.75} />
      <p className="mt-3 text-xl font-semibold text-[var(--text-color)]">{value}</p>
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-4 rounded-2xl border border-white/50 bg-white/20 p-5 transition-colors hover:bg-white/30"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary-accent)]/15 text-[var(--primary-accent)]">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div>
        <p className="font-medium text-[var(--text-color)]">{title}</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{description}</p>
      </div>
    </Link>
  );
}

function formatYear(createdAt?: Date) {
  if (!createdAt) return "—";
  return new Date(createdAt).getFullYear().toString();
}