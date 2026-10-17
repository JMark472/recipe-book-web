import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <div>
      <textarea
        className={cn(
          "w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm leading-relaxed text-deep-900 shadow-sm shadow-deep-900/5 outline-none transition placeholder:text-deep-400 focus:border-azure-500 focus:ring-4 focus:ring-azure-500/10",
          error ? "border-rose-400" : "border-deep-900/15",
          className,
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>}
    </div>
  );
}
