import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./SectionHeading";

/**
 * The spice stage. Instead of a row per product, one stage that changes
 * colour and pack as you move through the range: the numbered index on the
 * left is the selector, the right is the spice itself. Hover previews on
 * desktop, tap selects everywhere.
 */
const STAGE: Record<string, { from: string; to: string; glow: string }> = {
  chilli: {
    from: "oklch(0.44 0.17 27)",
    to: "oklch(0.22 0.07 22)",
    glow: "oklch(0.72 0.2 32 / 0.5)",
  },
  turmeric: {
    from: "oklch(0.55 0.13 78)",
    to: "oklch(0.28 0.06 62)",
    glow: "oklch(0.88 0.17 92 / 0.5)",
  },
  cumin: {
    from: "oklch(0.42 0.06 62)",
    to: "oklch(0.2 0.03 55)",
    glow: "oklch(0.78 0.09 72 / 0.45)",
  },
};

export function ProductShowcase() {
  const base = PRODUCTS.filter((p) => !p.variant);
  const [i, setI] = useState(0);
  const p = base[i]!;
  const s = STAGE[p.group] ?? STAGE["cumin"]!;
  const family = PRODUCTS.filter((q) => q.name === p.name);

  return (
    <section
      id="products"
      aria-labelledby="showcase-title"
      className="scroll-mt-24 bg-ink py-20 md:py-28"
    >
      <div className="container-site">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow invert>The Range</Eyebrow>
            <h2 id="showcase-title" className="headline-section mt-4 max-w-xl text-white">
              Our spice range
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green hover:underline"
          >
            See all twelve <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-white/10 lg:grid-cols-12">
          {/* Index */}
          <ol
            className="flex gap-2 overflow-x-auto bg-ink-soft p-3 lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:p-0"
            role="tablist"
            aria-label="Spices"
          >
            {base.map((b, n) => (
              <li key={b.slug} className="shrink-0 lg:border-b lg:border-white/10 lg:last:border-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={n === i}
                  aria-controls="spice-stage"
                  onClick={() => setI(n)}
                  onMouseEnter={() => setI(n)}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-full px-4 py-2.5 text-left transition-colors lg:rounded-none lg:px-8 lg:py-6",
                    n === i
                      ? "bg-white text-ink lg:bg-white/[0.06] lg:text-white"
                      : "text-white/55 hover:text-white",
                  )}
                >
                  <span
                    className={cn(
                      "hidden font-display text-sm font-bold tabular-nums lg:block",
                      n === i ? "text-brand-green" : "text-white/30",
                    )}
                  >
                    0{n + 1}
                  </span>
                  <span className="whitespace-nowrap font-display text-[0.95rem] font-bold lg:text-[1.35rem]">
                    {b.name}
                  </span>
                  <ArrowRight
                    className={cn(
                      "ml-auto hidden size-5 transition-all lg:block",
                      n === i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                    )}
                    aria-hidden
                  />
                </button>
              </li>
            ))}
          </ol>

          {/* Stage */}
          <div
            id="spice-stage"
            role="tabpanel"
            aria-label={p.name}
            className="relative grid min-h-[520px] items-center gap-6 overflow-hidden p-8 transition-[background] duration-700 md:grid-cols-2 md:p-12 lg:col-span-8"
            style={{
              background: `radial-gradient(circle at 70% 45%, ${s.glow}, transparent 60%), linear-gradient(140deg, ${s.from}, ${s.to})`,
            }}
          >
            <span
              className="pointer-events-none absolute -bottom-6 -left-2 whitespace-nowrap font-display text-[clamp(4rem,11vw,9rem)] font-bold uppercase leading-none tracking-tighter text-white/[0.07]"
              aria-hidden
            >
              {p.name.split(" ")[0]}
            </span>

            <div key={`t-${p.slug}`} className="animate-rise relative text-white md:order-1">
              <p className="eyebrow text-[0.62rem] text-white/60">
                0{i + 1} / 0{base.length}
              </p>
              <h3 className="mt-3 font-display text-[clamp(1.9rem,1.4rem+1.8vw,2.8rem)] font-bold uppercase leading-[1.02] tracking-tight">
                {p.name}
              </h3>
              <p className="mt-4 max-w-sm leading-relaxed text-white/80">{p.blurb}</p>

              {family.length > 1 && (
                <div className="mt-7">
                  <p className="eyebrow text-[0.6rem] text-white/55">{family.length} varieties</p>
                  <div className="mt-3 flex gap-2">
                    {family.map((f) => (
                      <Link
                        key={f.slug}
                        to="/products/$slug"
                        params={{ slug: f.slug }}
                        title={f.variant ?? "Regular"}
                        className="size-14 rounded-xl border border-white/20 bg-white/10 p-1 transition-transform hover:-translate-y-1 hover:border-white"
                      >
                        <img
                          src={f.image}
                          alt={f.variant ?? "Regular"}
                          width={1000}
                          height={1000}
                          className="size-full object-contain"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Explore {p.name.split(" ")[0]} <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>

            <img
              key={`i-${p.slug}`}
              src={p.image}
              alt={p.alt}
              width={1000}
              height={1000}
              className="animate-rise relative mx-auto w-full max-w-[360px] object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.5)] md:order-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
