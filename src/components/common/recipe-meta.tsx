import type { ReactNode } from "react";

type RecipeMetaProps = {
  cuisine: string;
  mealType: string[];
  difficulty: string;
  cookTimeMinutes: number;
};

function MetaItem({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-ink-900/10 bg-cream-50/70 px-3 py-2.5">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-spice-50 text-spice-600">{icon}</span>
      <div className="min-w-0">
        <dt className="text-[11px] font-medium tracking-wide text-ink-400 uppercase">{label}</dt>
        <dd className="truncate text-sm font-semibold text-ink-800">{value}</dd>
      </div>
    </div>
  );
}

export default function RecipeMeta({ cuisine, mealType, difficulty, cookTimeMinutes }: RecipeMetaProps) {
  return (
    <dl className="grid grid-cols-2 gap-3">
      <MetaItem
        label="Cuisine"
        value={cuisine}
        icon={
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <circle cx="12" cy="12" r="8" />
            <path d="M4 12h16M12 4c2.5 2.4 2.5 13.6 0 16M12 4c-2.5 2.4-2.5 13.6 0 16" />
          </svg>
        }
      />
      <MetaItem
        label="Meal"
        value={mealType.join(", ")}
        icon={
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
            <path d="M7 3v8M4.5 3v4a2.5 2.5 0 0 0 5 0V3M7 11v10" />
            <path d="M17 3c-1.7 0-3 2-3 5s1 4 3 4v9" />
          </svg>
        }
      />
      <MetaItem
        label="Difficulty"
        value={difficulty}
        icon={
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c0-1 0-1.5-.3-2 2 1.4 3.3 3.5 3.3 6a5 5 0 0 1-10 0c0-4 3-6 5-11Z" />
          </svg>
        }
      />
      <MetaItem
        label="Cook time"
        value={`${cookTimeMinutes} min`}
        icon={
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 7.5V12l3 2" />
          </svg>
        }
      />
    </dl>
  );
}
