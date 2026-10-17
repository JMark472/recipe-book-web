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
    <header className="sticky top-0 z-40 bg-mist-50/80 backdrop-blur-md">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-brand-gradient opacity-70" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to={home} className="flex items-center gap-2.5">
          <BrandMark className="h-9 w-9 bg-brand-gradient text-white shadow-azure-900/25" />
          <span className="font-display text-lg font-semibold tracking-tight text-deep-900">Recipe Book</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {user && (
            <div className="hidden items-center gap-2.5 rounded-full border border-deep-900/10 bg-white/70 py-1 pr-3 pl-1 sm:flex">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
                {initials}
              </span>
              <span className="max-w-40 truncate text-sm font-medium text-deep-700">{user.name}</span>
              {user.role === "ADMIN" && (
                <span className="rounded-full bg-jade-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-jade-700 uppercase">
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
