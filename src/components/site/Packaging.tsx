import { Link } from "@tanstack/react-router";
import { ArrowRight, Box, FileCheck2, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PACKAGING, PRODUCTS } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * Pack sizes drawn to scale against each other.
 *
 * A row of identical chips would say nothing about what a buyer is actually
 * choosing between, so each format is sized by the cube root of its weight:
 * volume scales with mass, and the eye reads a box by its side length, so the
 * cube root is what makes 1kg look like 1kg beside 100g. The weights are the
 * point, and the labels carry them regardless.
 */
const GRAMS: Record<string, number> = {
  "50g": 50,
  "100g": 100,
  "200g": 200,
  "500g": 500,
  "1kg": 1000,
  "5kg": 5000,
  "25kg": 25000,
};

const MIN = 42;
const MAX = 150;
const scale = (label: string) => {
  const g = GRAMS[label] ?? 100;
  const t = (Math.cbrt(g) - Math.cbrt(50)) / (Math.cbrt(25000) - Math.cbrt(50));
  return Math.round(MIN + t * (MAX - MIN));
};

const FORMATS = [
  {
    icon: Package,
    title: "Retail packs",
    sizes: PACKAGING.retail,
    text: "Printed laminate pouches with a zip-lock top, as shown on the product pages. Shelf-ready for grocery and modern trade.",
    meta: "Consumer · zip-lock pouch",
  },
  {
    icon: Box,
    title: "Bulk packing",
    sizes: PACKAGING.bulk,
    text: "Plain or printed bags for repackers, food service and spice houses buying to blend or re-pack under their own label.",
    meta: "Trade · bag",
  },
] as const;

const SERVICES = [
  {
    icon: FileCheck2,
    title: "Private label",
    text: "We pack to your artwork and your declarations. Send the design and the pack size and we will quote the run.",
  },
  {
    icon: Truck,
    title: "Export cartons",
    text: "Retail packs are cased into export cartons, palletised and shrink-wrapped, with carton marking to your instruction.",
  },
  {
    icon: Package,
    title: "Any line, any size",
    text: "All twelve spice lines are available across the full range of formats. Mixed-SKU containers are not a problem.",
  },
] as const;

export function Packaging() {
  return (
    <>
      <section
        id="packaging"
        aria-labelledby="packaging-title"
        className="scroll-mt-24 bg-background py-20 md:py-28"
      >
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="packaging-title"
              eyebrow="Packaging"
              title="Seven formats, drawn to scale"
              description="Every one of the twelve spice lines is offered in all seven. Sizes below are shown in proportion to each other."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {FORMATS.map(({ icon: Icon, title, sizes, text, meta }, i) => (
              <Reveal as="div" key={title} delay={i * 100}>
                <div className="flex h-full flex-col rounded-[1.6rem] border border-sand-line bg-surface p-7 md:p-9">
                  <div className="flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-green-deep text-white">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.3rem] font-bold text-ink">{title}</h3>
                      <p className="eyebrow mt-1 text-[0.6rem] text-gold-deep">{meta}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-[0.92rem] leading-relaxed text-muted-foreground">
                    {text}
                  </p>

                  {/* Baseline-aligned so the blocks read as a size ladder. */}
                  <ul className="mt-9 flex flex-wrap items-end gap-4 border-t border-sand-line pt-8">
                    {sizes.map((s) => (
                      <li key={s} className="flex flex-col items-center gap-2.5">
                        <span
                          className="rounded-[0.6rem] border border-brand-green-deep/25 bg-brand-green-soft"
                          style={{ width: scale(s), height: scale(s) }}
                          aria-hidden
                        />
                        <span className="font-display text-[0.85rem] font-bold tabular-nums text-ink">
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <ul className="mt-6 grid gap-px overflow-hidden rounded-[1.6rem] border border-sand-line bg-sand-line md:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="bg-background p-7 md:p-8">
                <Icon className="size-5 text-brand-green-deep" strokeWidth={1.7} aria-hidden />
                <h3 className="mt-5 font-display text-[1.05rem] font-bold text-ink">{title}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* What the retail pouch actually looks like, using the real pack shots. */}
      <section aria-labelledby="packshots-title" className="bg-surface py-20 md:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="packshots-title"
              align="center"
              eyebrow="The Retail Pouch"
              title="How the 500g pack looks"
              description="The printed pouch carries the spice name, the grade, the net weight and the vegetarian mark."
            />
          </Reveal>

          <Reveal delay={80} variant="fade" className="mt-14">
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {PRODUCTS.slice(0, 6).map((p, i) => (
                <li key={p.slug}>
                  <Link
                    to="/contact"
                    search={{ product: p.slug }}
                    className="group block overflow-hidden rounded-[1.2rem] border border-sand-line bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <img
                      src={p.image}
                      alt={p.alt}
                      width={1000}
                      height={1000}
                      loading={i < 3 ? "eager" : "lazy"}
                      decoding="async"
                      className="aspect-square w-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={60}
            className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Tell us the line, the pack size and the quantity, and whether you want it under our
              label or your own.
            </p>
            <Button asChild variant="brand" size="xl" className="shrink-0">
              <Link to="/contact">
                Request a packing quote
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
