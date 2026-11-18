import { useScrollProgress } from "@/lib/use-reveal";

/** A thin reading indicator pinned above the sticky header. */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden>
      <div
        className="h-full origin-left bg-gradient-to-r from-brand-green-deep via-brand-green to-gold transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
