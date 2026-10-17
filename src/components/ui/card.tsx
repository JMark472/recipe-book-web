import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = { children: ReactNode; className?: string };

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-ink-900/10 bg-white/85 shadow-sm shadow-ink-900/5 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
