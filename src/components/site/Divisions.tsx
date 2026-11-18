import { ArrowUpRight } from "lucide-react";
import { DIVISIONS } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * Five business lines do not divide into a tidy grid, so they are presented as
 * full-width rows. Each row reveals its detail on hover or focus, which keeps
 * the list scannable while still carrying the full explanation.
 */
export function Divisions() {
  return (
    <section
      id="divisions"
      aria-labelledby="divisions-title"
      className="scroll-mt-24 bg-surface py-20 md:py-28"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeading
            id="divisions-title"
            eyebrow="Divisions"
            title="What we supply"
            description="Agricultural commodities are the bulk of what we ship. The company was also set up to supply ceramics, textiles, and paper and packaging, and the team has worked inside each of those industries."
          />
        </Reveal>

        <ul className="mt-14 border-t border-sand-line">
          {DIVISIONS.map((d, i) => (
            <Reveal as="li" key={d.id} delay={i * 70} className="border-b border-sand-line">
              <a
                href={d.href}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 transition-colors duration-300 hover:bg-background focus-visible:bg-background focus-visible:outline-none md:gap-8 md:px-5 md:py-9"
              >
                <span className="font-display text-sm font-semibold tabular-nums text-gold-deep md:text-base">
                  0{i + 1}
                </span>

                <div className="min-w-0 md:grid md:grid-cols-12 md:items-center md:gap-8">
                  <h3 className="font-display text-[1.45rem] font-semibold leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-brand-green-deep md:col-span-5 md:text-[1.75rem]">
                    {d.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground md:col-span-4 md:mt-0">
                    {d.tagline}
                  </p>
                  {/*
                    Kept in flow rather than collapsed: a hidden-until-hover
                    paragraph still reserved its height, which left every row
                    looking half empty. It now sits back at reduced contrast and
                    comes forward on hover.
                  */}
                  <p className="mt-3 text-sm leading-relaxed text-ink/70 transition-opacity duration-500 md:col-span-3 md:mt-0 md:opacity-70 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                    {d.text}
                  </p>
                </div>

                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/12 text-ink transition-all duration-300 group-hover:border-brand-green-deep group-hover:bg-brand-green-deep group-hover:text-white">
                  <ArrowUpRight className="size-4" aria-hidden />
                  <span className="sr-only">{d.cta}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
