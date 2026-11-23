import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PACKAGING, PRODUCTS, PRODUCT_GROUPS, type ProductGroup } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * A wash behind each pack, keyed to the spice. The supplied pack shots keep
 * their transparent background, so they sit straight on the tint with no
 * plate or faked drop shadow behind them.
 */
const TINT: Record<string, string> = {
  chilli: "oklch(0.955 0.035 28)",
  turmeric: "oklch(0.962 0.045 92)",
  cumin: "oklch(0.955 0.028 72)",
};

export function Products() {
  const [group, setGroup] = useState<ProductGroup>("all");
  const shown = group === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.group === group);

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="scroll-mt-24 bg-background py-20 md:py-28"
    >
      <div className="container-site">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              id="products-title"
              eyebrow="Products"
              title="Our ground spice range"
              description="Twelve lines across red chilli, turmeric, cumin and coriander, milled and packed under the Patonics label."
            />
          </Reveal>

          <Reveal delay={100} variant="fade">
            {/*
              Toggle buttons, not a tablist: there are no tabpanels here, so
              aria-pressed is what describes these controls.
            */}
            <div
              role="group"
              aria-label="Filter products by spice"
              className="flex flex-wrap gap-1.5 rounded-full border border-sand-line bg-surface p-1.5"
            >
              {PRODUCT_GROUPS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={group === g.id}
                  onClick={() => setGroup(g.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.82rem] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    group === g.id
                      ? "bg-ink text-white shadow-soft"
                      : "text-ink/60 hover:bg-background hover:text-ink",
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={Math.min(i, 7) * 60} variant="scale">
              <div id={`product-${p.slug}`} className="scroll-mt-28">
                <Link
                  to="/contact"
                  search={{ product: p.slug }}
                  aria-label={`${p.name}${p.variant ? ` ${p.variant}` : ""} — send an enquiry`}
                  className="group block rounded-[1.4rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                >
                  <div
                    className="relative overflow-hidden rounded-[1.4rem] border border-sand-line"
                    style={{ backgroundColor: TINT[p.group] }}
                  >
                    <img
                      src={p.image}
                      alt={p.alt}
                      width={1000}
                      height={1000}
                      loading={i < 4 ? "eager" : "lazy"}
                      decoding="async"
                      className="aspect-square w-full scale-[1.06] object-contain p-3 transition-transform duration-[700ms] ease-out group-hover:scale-[1.14]"
                    />
                    {p.variant && (
                      <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                        {p.variant}
                      </span>
                    )}
                  </div>

                  <div className="mt-3.5 flex items-start justify-between gap-2 px-0.5">
                    <div className="min-w-0">
                      <h3 className="font-display text-[0.98rem] font-bold leading-snug text-ink sm:text-[1.05rem]">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground">
                        {p.blurb}
                      </p>
                    </div>
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/12 text-ink transition-all duration-300 group-hover:border-brand-green-deep group-hover:bg-brand-green-deep group-hover:text-white">
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Every line comes in the same formats, so this sits once under the grid. */}
        <Reveal delay={80} className="mt-14">
          <div className="flex flex-col gap-7 rounded-[1.6rem] border border-sand-line bg-surface p-7 md:flex-row md:items-center md:justify-between md:p-9">
            <div className="flex items-start gap-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-green-deep text-white">
                <Package className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-[1.2rem] font-bold text-ink">
                  Every line, in seven pack sizes
                </h3>
                <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-muted-foreground">
                  Retail from {PACKAGING.retail[0]} to {PACKAGING.retail.at(-1)}, bulk at{" "}
                  {PACKAGING.bulk.join(" and ")}. Private-label and retail-ready packing to your own
                  artwork.
                </p>
              </div>
            </div>
            <Button asChild variant="brandOutline" size="xl" className="shrink-0">
              <Link to="/packaging">
                View packaging
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
