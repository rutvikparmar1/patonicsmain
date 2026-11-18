import { ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TIMELINE } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./SectionHeading";
import farmerImg from "@/assets/about-farmer.jpg";
import cottonImg from "@/assets/about-cotton.jpg";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-24 bg-background py-20 md:py-28 lg:py-32"
    >
      <div className="container-site">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Visual */}
          <Reveal variant="left" className="relative lg:col-span-6">
            <div className="relative mr-10 sm:mr-24 lg:mr-20">
              <div
                className="absolute -left-5 -top-5 h-2/3 w-2/3 rounded-[2rem] border border-brand-green/25 bg-brand-green-soft sm:-left-7 sm:-top-7"
                aria-hidden
              />
              <figure className="relative overflow-hidden rounded-[2rem] shadow-lift">
                <img
                  src={farmerImg}
                  alt="Indian farmer inspecting ripe wheat ears in a field at golden hour"
                  width={1200}
                  height={1440}
                  loading="lazy"
                  className="aspect-[5/6] w-full object-cover"
                />
              </figure>
            </div>

            <figure className="absolute -bottom-10 right-0 w-[44%] overflow-hidden rounded-[1.5rem] border-[7px] border-background shadow-deep">
              <img
                src={cottonImg}
                alt="Hands holding freshly harvested raw cotton over a jute sack"
                width={816}
                height={816}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </figure>

            <div className="absolute left-5 top-5 rounded-full bg-background/95 px-4 py-2 shadow-soft backdrop-blur">
              <p className="eyebrow text-[0.66rem] text-ink">
                Est. <span className="text-brand-green-deep">1983</span> · Gujarat, India
              </p>
            </div>
          </Reveal>

          {/* Story */}
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>About Patonics International</Eyebrow>
              <h2 id="about-title" className="headline-section mt-5 text-ink">
                Four decades of trust.{" "}
                <span className="text-brand-green-deep">One global vision.</span>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-7 text-lg leading-relaxed text-ink/80">
                Rooted in India's agricultural heritage, Patonics International connects quality
                Indian products with businesses across the world. Our foundation is long-standing
                relationships, dependable sourcing, and a working knowledge of international trade.
              </p>
              <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-muted-foreground">
                <p>
                  The business began in 1983 as Patel Chamanbhai Mavjibhai &amp; Co., founded in
                  Chachka Village, Gujarat, by Shri Chamanbhai Patel (Patidar). Patonics
                  International Trading Co. carries that legacy forward, established in Gujarat on
                  22 January 2023 by Mr. Nikunj Patel.
                </p>
                <p>
                  Our team brings hands-on experience across agricultural sourcing, farming,
                  ginning, spinning, sortex cleaning, ceramics and paper, which is why our portfolio
                  reaches well beyond a single commodity.
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <blockquote className="relative mt-9 rounded-2xl border border-sand-line bg-surface p-7 pl-14">
                <Quote className="absolute left-5 top-6 size-6 text-brand-green" aria-hidden />
                <p className="font-display text-xl font-semibold leading-snug text-ink">
                  Passion for quality, dedication to customers.
                </p>
                <footer className="mt-3 text-xs text-muted-foreground">
                  The principle the firm has traded on since 1983
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={200}>
              <Button asChild variant="brand" size="xl" className="mt-9">
                <a href="#divisions">
                  See what we trade
                  <ArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </Button>
            </Reveal>
          </div>
        </div>

        {/* Milestones. Horizontal on desktop, a stacked rail on narrow screens. */}
        <Reveal className="mt-24 md:mt-32" delay={60}>
          <ol className="grid gap-10 border-t border-sand-line pt-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {TIMELINE.map((t) => (
              <li key={t.year} className="relative lg:pr-6">
                <span
                  className="absolute -top-[3.3rem] left-0 hidden size-3 rounded-full border-2 border-brand-green bg-background lg:block"
                  aria-hidden
                />
                <p className="font-display text-sm font-semibold tracking-wide text-gold-deep">
                  {t.year}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">{t.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
