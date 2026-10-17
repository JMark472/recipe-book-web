import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/components/context/use-auth";
import { BrandMark } from "@/components/common/brand";
import { Button } from "@/components/ui/button";

// Sticky application bar shared by the USER and ADMIN areas.
export function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const home = user?.role === "ADMIN" ? "/admin" : "/user";
  const initials = user?.name?.trim().charAt(0).toUpperCase() || "U";

  async function handleLogout() {
    setBusy(true);
    try {
      await logout();
      navigate("/auth/login", { replace: true });
    } finally {
      setBusy(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-cream-50/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to={home} className="flex items-center gap-2.5">
          <BrandMark className="h-9 w-9" />
          <span className="font-display text-lg font-semibold tracking-tight text-ink-900">Recipe Book</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {user && (
            <div className="hidden items-center gap-2.5 rounded-full border border-ink-900/10 bg-white/70 py-1 pr-3 pl-1 sm:flex">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-spice-600 text-xs font-semibold text-cream-50">
                {initials}
              </span>
              <span className="max-w-40 truncate text-sm font-medium text-ink-700">{user.name}</span>
              {user.role === "ADMIN" && (
                <span className="rounded-full bg-herb-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-herb-700 uppercase">
                  Admin
                </span>
              )}
            </div>
          )}
          <Button variant="secondary" size="sm" onClick={handleLogout} disabled={busy}>
            {busy ? "Signing out…" : "Sign out"}
          </Button>
        </div>
      </div>
    </header>
  );
}
