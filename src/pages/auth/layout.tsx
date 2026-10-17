import { AuthHeader } from "@/components/features/auth/auth-header";
import { BrandMark } from "@/components/common/brand";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/components/context/use-auth";

const highlights = [
  "A private recipe book for every account",
  "Ingredients, steps, tags and cook time in one view",
  "An admin view across the whole collection",
];

export default function AuthLayout() {
  const { user, ready } = useAuth();

  if (ready && user) return <Navigate to={user.role === "ADMIN" ? "/admin" : "/user"} replace />;

  return (
    <main className="min-h-svh lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel — large screens only */}
      <aside className="relative hidden overflow-hidden bg-ink-900 p-12 text-cream-50 lg:flex lg:flex-col lg:justify-between">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(40rem 40rem at 120% 0%, rgba(224,120,79,.35), transparent 60%), radial-gradient(30rem 30rem at -10% 110%, rgba(124,138,82,.35), transparent 60%)",
          }}
        />
        <div className="relative flex items-center gap-3">
          <BrandMark className="h-11 w-11 bg-cream-50 text-spice-600" />
          <span className="font-display text-xl font-semibold tracking-tight">Recipe Book</span>
        </div>

        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.28em] text-spice-200 uppercase">Your kitchen companion</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-semibold xl:text-5xl">
            Every favorite meal,
            <br />
            gathered in one place.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/70">
            Save family classics, plan weeknight dinners, and keep your ingredients and steps neatly organized.
          </p>
          <ul className="mt-8 grid gap-3 text-sm text-cream-100/85">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-spice-500/25 text-spice-200">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12 4.5 4.5L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-cream-100/50">React · Express · Drizzle ORM · PostgreSQL</p>
      </aside>

      {/* Form panel */}
      <div className="flex min-h-svh items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <AuthHeader />
          {ready && <Outlet />}
        </div>
      </div>
    </main>
  );
}
