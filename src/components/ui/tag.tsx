import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = { children: ReactNode; className?: string };

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-deep-900/10 bg-mist-100 px-2.5 py-1 text-xs font-medium text-deep-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
