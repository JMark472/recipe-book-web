import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

// Shared page heading. Optional children provide actions such as Sign out.
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="animate-rise mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-deep-900/10 pb-6">
      <div>
        <span aria-hidden="true" className="mb-3 block h-1 w-12 rounded-full bg-brand-gradient" />
        <p className="text-xs font-semibold tracking-[0.22em] text-azure-600 uppercase">{eyebrow}</p>
        <h1 className="text-brand-gradient mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-deep-500">{description}</p>
      </div>
      {children}
    </header>
  );
}
