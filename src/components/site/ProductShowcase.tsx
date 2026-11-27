import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./SectionHeading";

/**
 * Home-page product rows: full-bleed halves, image and text swapping sides on
 * each row. One row per spice (the variant-less line); the varieties live on
 * the product page.
 */
const TINT: Record<string, string> = {
  chilli: "oklch(0.93 0.05 28)",
  turmeric: "oklch(0.95 0.07 95)",
  cumin: "oklch(0.93 0.04 70)",
};

export function ProductShowcase() {
  const base = PRODUCTS.filter((p) => !p.variant);
  const count = (name: string) => PRODUCTS.filter((q) => q.name === name).length;

  return (
    <section
      id="products"
      aria-labelledby="showcase-title"
      className="scroll-mt-24 bg-background pt-20 md:pt-28"
    >
      <Reveal className="container-site text-center">
        <Eyebrow center>Patonics Spices</Eyebrow>
        <h2 id="showcase-title" className="headline-section mt-4 text-ink">
          Our Products
        </h2>
      </Reveal>

      <div className="mt-12 md:mt-16">
        {base.map((p, i) => {
          const flip = i % 2 === 1;
          const n = count(p.name);
          return (
            <div key={p.slug} className="grid md:grid-cols-2">
              <div
                className={`flex items-center justify-center p-8 md:min-h-[440px] ${flip ? "md:order-2" : ""}`}
                style={{ backgroundColor: TINT[p.group] }}
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  width={1000}
                  height={1000}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full max-w-[340px] object-contain"
                />
              </div>
              <div className="flex items-center justify-center bg-surface px-6 py-14 text-center md:px-12">
                <Reveal className="max-w-md">
                  <h3 className="font-display text-[1.6rem] font-bold uppercase tracking-tight text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {p.blurb}
                  </p>
                  {n > 1 && (
                    <p className="mt-3 text-sm font-semibold text-brand-green-deep">
                      Available in {n} varieties
                    </p>
                  )}
                  <Button asChild variant="brand" size="xl" className="mt-7">
                    <Link to="/products/$slug" params={{ slug: p.slug }}>
                      View Products
                      <ArrowRight
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  </Button>
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
