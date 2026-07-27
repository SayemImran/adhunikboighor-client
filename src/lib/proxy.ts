import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type SessionUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

/**
 * Fetches the current session on the server.
 * Redirects to /login if no session exists.
 */
export async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
}

/**
 * Guards a route to a specific role (or list of roles).
 * Redirects unauthenticated users to /login.
 * Redirects users with the wrong role to /(fallback), default "/".
 *
 * Usage in a layout.tsx:
 *   const user = await requireRole("admin");
 */
export async function requireRole(
  allowedRoles: string | string[],
  fallback: string = "/"
): Promise<SessionUser> {
  const session = await requireSession();
  const user = session.user as SessionUser;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!user.role || !roles.includes(user.role)) {
    redirect(fallback);
  }

  return user;
}