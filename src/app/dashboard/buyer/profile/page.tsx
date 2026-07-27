"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { User as UserIcon, Mail, Shield, Save } from "lucide-react";

export default function ProfilePage() {
  const { data: sessionData, isPending, refetch } = authClient.useSession();
  const user = sessionData?.user;

  const [name, setName] = useState(user?.name ?? "");
  const [image, setImage] = useState(user?.image ?? "");
  const [loading, setLoading] = useState(false);

  // Sync local state once session loads
  useState(() => {
    if (user) {
      setName(user.name);
      setImage(user.image ?? "");
    }
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name,
        image: image || undefined,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully");
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-white/25" />
        <div className="h-64 w-full max-w-xl animate-pulse rounded-2xl bg-white/20" />
      </div>
    );
  }

  if (!user) {
    return <p className="text-sm text-[var(--text-muted)]">Could not load profile.</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[var(--text-color)]">Your profile</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Manage your account details.
        </p>
      </div>

      <div className="max-w-xl">
        {/* Avatar preview */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/50 bg-white/30 text-2xl font-semibold text-[var(--primary-accent)]">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={name} className="h-full w-full object-cover" />
            ) : (
              name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <p className="font-medium text-[var(--text-color)]">{user.name}</p>
            <p className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
              <Shield size={13} className="text-[var(--primary-accent)]" />
              {(user as { role?: string }).role === "admin" ? "Administrator" : "Buyer"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--text-color)]">
              <UserIcon size={15} />
              Full name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
            />
          </div>

          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--text-color)]">
              <Mail size={15} />
              Email
            </label>
            <input
              value={user.email}
              disabled
              className="w-full cursor-not-allowed rounded-2xl border border-white/40 bg-white/15 px-4 py-3 text-[var(--text-muted)] outline-none"
            />
            <p className="mt-1.5 text-xs text-[var(--text-muted)]">
              Email cannot be changed at this time.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--text-color)]">
              Profile image URL
            </label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--text-muted)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-full bg-[var(--primary-accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(201,123,74,0.2)] transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} />
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}