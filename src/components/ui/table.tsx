import type { TableHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-deep-900/10 bg-white/85 shadow-sm shadow-deep-900/5">
      <table
        className={cn(
          "w-full text-left text-sm [&_th]:px-5 [&_th]:py-4 [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-wide [&_th]:text-deep-500 [&_th]:uppercase [&_td]:px-5 [&_td]:py-4 [&_td]:align-middle [&_thead]:bg-brand-gradient-soft [&_tbody_tr]:border-t [&_tbody_tr]:border-deep-900/10 [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-mist-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}
