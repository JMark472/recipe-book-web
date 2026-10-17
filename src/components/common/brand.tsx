import { cn } from "@/lib/cn";

/**
 * The Recipe Book logo mark. Used by the navbar and the auth screens so the
 * brand stays consistent everywhere.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn("grid place-items-center rounded-2xl shadow-sm", className)}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 16.5h16" />
        <path d="M6.2 16.5c0-3.4 2.6-6.2 5.8-6.2s5.8 2.8 5.8 6.2" />
        <path d="M12 10.3c-.4-2.4 1.1-4.4 3.9-5.5-.3 2.6-1.5 4.4-3.9 5.5Z" fill="currentColor" stroke="none" />
        <path d="M11.6 10.4c-1.6-1.3-3.6-1.6-5.6-.9 1.3 1.9 3.3 2.6 5.6 2.2Z" fill="currentColor" stroke="none" opacity=".7" />
      </svg>
    </span>
  );
}
