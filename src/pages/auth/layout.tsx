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
      <aside className="animate-gradient relative hidden overflow-hidden bg-brand-gradient p-12 text-mist-50 lg:flex lg:flex-col lg:justify-between">
        {/* Layered pattern + ambient glow overlays. */}
        <div aria-hidden="true" className="bg-mesh pointer-events-none absolute inset-0 opacity-70" />
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-[0.18]" />
        {/* Subtle wave pattern at the bottom of the blue/green panel. */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1 left-0 right-0 w-full"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          opacity="0.25"
        >
          <path
            d="M0 120C240 60 480 200 720 120C960 40 1200 160 1440 80L1440 220L0 220Z"
            fill="url(#waveFill)"
          />
          <defs>
            <linearGradient id="waveFill" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ecfdf5" stopOpacity="0.5" />
              <stop offset="1" stopColor="#bfdbfe" stopOpacity="0.25" />
            </linearGradient>
          </defs>
        </svg>
        <div
          aria-hidden="true"
          className="animate-float pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-white/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="animate-float pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-jade-300/20 blur-3xl"
        />
        <div className="relative flex items-center gap-3">
          <BrandMark className="h-11 w-11 bg-white/15 text-white ring-1 ring-white/25 backdrop-blur" />
          <span className="font-display text-xl font-semibold tracking-tight">Recipe Book</span>
        </div>

        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.28em] text-jade-100 uppercase">Your kitchen companion</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-semibold xl:text-5xl">
            Every favorite meal,
            <br />
            gathered in one place.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist-100/70">
            Save family classics, plan weeknight dinners, and keep your ingredients and steps neatly organized.
          </p>
          <ul className="mt-8 grid gap-3 text-sm text-mist-100/85">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/20 text-white">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12 4.5 4.5L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-mist-100/50">React · Express · Drizzle ORM · PostgreSQL</p>
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
