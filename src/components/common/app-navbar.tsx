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
    <header className="animate-gradient sticky top-0 z-40 bg-brand-gradient backdrop-blur-md">
      {/* Animation "pattern" — drifting light dot grid across the blue bar. */}
      <span aria-hidden="true" className="pattern-dots-light animate-pattern pointer-events-none absolute inset-0 opacity-60" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/25" />
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to={home} className="flex items-center gap-2.5">
          <BrandMark className="h-9 w-9 bg-white/15 text-white ring-1 ring-white/25" />
          <span className="font-display text-lg font-semibold tracking-tight text-white">Recipe Book</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {user && (
            <div className="hidden items-center gap-2.5 rounded-full border border-white/25 bg-white/15 py-1 pr-3 pl-1 sm:flex">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 text-xs font-semibold text-white">
                {initials}
              </span>
              <span className="max-w-40 truncate text-sm font-medium text-white">{user.name}</span>
              {user.role === "ADMIN" && (
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
                  Admin
                </span>
              )}
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={handleLogout} disabled={busy}>
            {busy ? "Signing out…" : "Sign out"}
          </Button>
        </div>
      </div>
    </header>
  );
}
