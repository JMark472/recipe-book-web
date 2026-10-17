import { BrandMark } from "@/components/common/brand";

// Compact branding shown on small screens; the split layout shows the full
// brand panel on large screens instead.
export function AuthHeader() {
  return (
    <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
      <BrandMark className="h-11 w-11" />
      <div>
        <p className="font-display text-2xl font-semibold tracking-tight text-ink-900">Recipe Book</p>
        <p className="text-xs tracking-[0.18em] text-spice-600 uppercase">Your kitchen companion</p>
      </div>
    </div>
  );
}
