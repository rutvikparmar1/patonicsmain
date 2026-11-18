import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCT_GROUPS, type ProductGroup } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Products() {
  const [group, setGroup] = useState<ProductGroup>("all");
  const shown = group === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.group === group);

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
              title="Eleven agri categories"
              description="Bought in the growing regions, graded to the specification you agree with us, and consolidated into one shipment where the volumes allow it."
            />
          </Reveal>

          <Reveal delay={100} variant="fade">
            {/*
              A group of toggle buttons, not a tablist: there are no tabpanels
              here, so aria-pressed describes what these controls actually do.
            */}
            <div
              role="group"
              aria-label="Filter products by type"
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

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={Math.min(i, 7) * 60} variant="scale">
              <div id={`product-${c.slug}`} className="scroll-mt-28">
                <Link
                  to="/contact"
                  search={{ category: c.name }}
                  aria-label={`${c.name} — send an inquiry about this category`}
                  className="group relative block overflow-hidden rounded-[1.4rem] bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                >
                  <img
                    src={c.image}
                    alt={c.alt}
                    width={800}
                    height={960}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                  />

                  {/* Permanent base scrim keeps the title legible on any photo. */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/35"
                    aria-hidden
                  />

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-[1.2rem] font-semibold leading-tight tracking-tight text-white">
                        {c.name}
                      </h3>
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:border-brand-green group-hover:bg-brand-green group-hover:text-ink">
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </span>
                    </div>

                    {/*
                      The item list is what a trade buyer scans for. It stays in
                      the DOM and slides up on hover rather than being swapped in.
                    */}
                    <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100">
                      <p className="mt-3 text-[0.8rem] leading-relaxed text-white/70">{c.blurb}</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {c.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[0.7rem] font-medium text-white/90 backdrop-blur-sm"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </div>
            </Reveal>
          ))}

          <Reveal as="li" variant="scale" delay={120} className="sm:col-span-2 lg:col-span-1">
            <div className="flex h-full flex-col justify-between gap-7 rounded-[1.4rem] border border-sand-line bg-surface p-7">
              <div>
                <span className="flex size-11 items-center justify-center rounded-full bg-brand-green-deep text-white">
                  <ArrowRight className="size-5" aria-hidden />
                </span>
                <p className="mt-6 font-display text-[1.35rem] font-semibold leading-snug text-ink">
                  Looking for something not listed?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Send the product, grade, quantity and destination port, and we will come back with
                  a price or tell you we cannot source it.
                </p>
              </div>
              <Button asChild variant="brand" size="xl" className="w-full">
                <Link to="/contact">
                  Send a requirement
                  <ArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
