import { CATEGORIES } from "@/lib/site-data";

/**
 * A continuous strip of what the company actually ships. The list is rendered
 * twice and the track travels exactly -50%, so the loop has no visible seam.
 */
export function TrustBar() {
  const items = [...CATEGORIES, ...CATEGORIES];

  return (
    <section
      aria-label="Product range at a glance"
      className="border-y border-sand-line bg-surface"
    >
      <div className="relative overflow-hidden py-5">
        <ul className="animate-marquee flex w-max items-center gap-10 motion-reduce:animate-none">
          {items.map((c, i) => (
            <li
              key={`${c.slug}-${i}`}
              className="flex shrink-0 items-center gap-10"
              aria-hidden={i >= CATEGORIES.length}
            >
              <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink/70">
                {c.name}
              </span>
              <span className="size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
            </li>
          ))}
        </ul>
        {/* Feather both ends so words enter and leave rather than being clipped. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent"
          aria-hidden
        />
      </div>
    </section>
  );
}
