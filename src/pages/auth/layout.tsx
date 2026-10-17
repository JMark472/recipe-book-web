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
        {/* Sky wash — cool blue overhead light fading down into the brand gradient. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(125,211,252,.50) 0%, rgba(37,99,235,.26) 42%, rgba(5,150,105,0) 74%)",
          }}
        />
        {/* Animation "clouds" — two tiled strips of clouds drifting across the sky. */}
        <svg
          aria-hidden="true"
          className="animate-clouds pointer-events-none absolute top-0 left-0 w-[200%]"
          viewBox="0 0 2880 300"
          fill="#ffffff"
        >
          <defs>
            <g id="cloudTileA">
              <g opacity="0.5" transform="translate(170 82)">
                <ellipse cx="0" cy="0" rx="72" ry="26" />
                <ellipse cx="-38" cy="10" rx="42" ry="20" />
                <ellipse cx="44" cy="10" rx="48" ry="22" />
                <ellipse cx="4" cy="-18" rx="46" ry="26" />
              </g>
              <g opacity="0.32" transform="translate(640 44) scale(0.7)">
                <ellipse cx="0" cy="0" rx="72" ry="26" />
                <ellipse cx="-38" cy="10" rx="42" ry="20" />
                <ellipse cx="44" cy="10" rx="48" ry="22" />
                <ellipse cx="4" cy="-18" rx="46" ry="26" />
              </g>
              <g opacity="0.4" transform="translate(1090 118) scale(0.86)">
                <ellipse cx="0" cy="0" rx="72" ry="26" />
                <ellipse cx="-38" cy="10" rx="42" ry="20" />
                <ellipse cx="44" cy="10" rx="48" ry="22" />
                <ellipse cx="4" cy="-18" rx="46" ry="26" />
              </g>
            </g>
          </defs>
          <use href="#cloudTileA" />
          <use href="#cloudTileA" transform="translate(1440 0)" />
        </svg>
        <svg
          aria-hidden="true"
          className="animate-clouds-slow pointer-events-none absolute top-28 left-0 w-[200%]"
          viewBox="0 0 2880 300"
          fill="#ffffff"
        >
          <defs>
            <g id="cloudTileB">
              <g opacity="0.28" transform="translate(360 150) scale(1.15)">
                <ellipse cx="0" cy="0" rx="72" ry="26" />
                <ellipse cx="-38" cy="10" rx="42" ry="20" />
                <ellipse cx="44" cy="10" rx="48" ry="22" />
                <ellipse cx="4" cy="-18" rx="46" ry="26" />
              </g>
              <g opacity="0.22" transform="translate(900 76) scale(0.62)">
                <ellipse cx="0" cy="0" rx="72" ry="26" />
                <ellipse cx="-38" cy="10" rx="42" ry="20" />
                <ellipse cx="44" cy="10" rx="48" ry="22" />
                <ellipse cx="4" cy="-18" rx="46" ry="26" />
              </g>
              <g opacity="0.3" transform="translate(1300 190) scale(0.92)">
                <ellipse cx="0" cy="0" rx="72" ry="26" />
                <ellipse cx="-38" cy="10" rx="42" ry="20" />
                <ellipse cx="44" cy="10" rx="48" ry="22" />
                <ellipse cx="4" cy="-18" rx="46" ry="26" />
              </g>
            </g>
          </defs>
          <use href="#cloudTileB" />
          <use href="#cloudTileB" transform="translate(1440 0)" />
        </svg>
        {/* Animation "waves" — two tiled wave layers drifting across the blue/green panel. */}
        <svg
          aria-hidden="true"
          className="animate-waves pointer-events-none absolute -bottom-1 left-0 w-[200%] opacity-25"
          viewBox="0 0 2880 220"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveFillA" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#ecfdf5" stopOpacity="0.55" />
              <stop offset="1" stopColor="#bfdbfe" stopOpacity="0.3" />
            </linearGradient>
            <path
              id="wavePathA"
              d="M0 100C120 40 240 40 360 100C480 160 600 160 720 100C840 40 960 40 1080 100C1200 160 1320 160 1440 100L1440 220L0 220Z"
              fill="url(#waveFillA)"
            />
          </defs>
          <use href="#wavePathA" />
          <use href="#wavePathA" transform="translate(1440 0)" />
        </svg>
        <svg
          aria-hidden="true"
          className="animate-waves-slow pointer-events-none absolute -bottom-1 left-0 w-[200%] opacity-20"
          viewBox="0 0 2880 220"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveFillB" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="1" stopColor="#a7f3d0" stopOpacity="0.25" />
            </linearGradient>
            <path
              id="wavePathB"
              d="M0 140C120 90 240 90 360 140C480 190 600 190 720 140C840 90 960 90 1080 140C1200 190 1320 190 1440 140L1440 220L0 220Z"
              fill="url(#waveFillB)"
            />
          </defs>
          <use href="#wavePathB" />
          <use href="#wavePathB" transform="translate(1440 0)" />
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
