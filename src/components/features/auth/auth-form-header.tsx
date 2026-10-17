type AuthFormHeaderProps = {
  title: string;
  description: string;
};

// Reuse the same heading style while each auth page supplies its own text.
export function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <header>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-deep-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-deep-500">{description}</p>
    </header>
  );
}
