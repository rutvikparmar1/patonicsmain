import { ArrowRight, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CREDENTIALS } from "@/lib/site-data";
import heroImg from "@/assets/hero-commodities.jpg";

export function Hero() {
  // The min height is set against the sticky header (utility strip + bar) so
  // the credential row lands just above the fold rather than below it.
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-8rem)] flex-col justify-end overflow-hidden bg-ink"
    >
      {/* Backdrop: a slow push-in keeps the frame alive without demanding attention. */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <img
          src={heroImg}
          alt=""
          width={1280}
          height={1440}
          fetchPriority="high"
          decoding="async"
          className="animate-kenburns size-full object-cover object-center"
        />
        {/* Left-weighted scrim carries the headline; the bottom scrim carries the credential bar. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/55" />
        <div className="absolute inset-0 grain-layer" />
      </div>

      <div className="container-site flex flex-1 flex-col justify-center pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow animate-rise flex items-center gap-3 text-brand-green">
            <span className="h-px w-10 bg-gold" aria-hidden />
            Established 1983 · Gujarat, India
          </p>

          <h1
            id="hero-title"
            className="headline-display animate-rise mt-7 text-white [animation-delay:90ms]"
          >
            Bringing the best of India to{" "}
            <span className="underline-brand text-brand-green">global markets</span>.
          </h1>

          <p className="animate-rise mt-7 max-w-xl text-[1.08rem] leading-relaxed text-white/70 [animation-delay:180ms] md:text-lg">
            An ISO 9001:2015 certified trading house moving agricultural commodities, agro-processed
            goods, ceramics, textiles and packaging from Indian growing regions to buyers across
            four continents.
          </p>

          <div className="animate-rise mt-10 flex flex-col gap-3 [animation-delay:260ms] sm:flex-row">
            <Button asChild variant="onInk" size="2xl">
              <a href="#products">
                Explore our products
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
            </Button>
            <Button asChild variant="inkOutline" size="2xl">
              <a href="#contact">Send an inquiry</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Credential bar, seated on the hero rather than below it. */}
      <div className="relative border-t border-white/12 bg-ink/35 backdrop-blur-sm">
        <div className="container-site">
          <dl className="grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
            {CREDENTIALS.map(({ label, note }, i) => (
              <div
                key={label}
                className={`px-1 py-5 md:px-7 md:first:pl-0 ${i < 2 ? "border-b border-white/10 md:border-b-0" : ""} ${i % 2 === 1 ? "border-l border-white/10 md:border-l-0" : ""}`}
              >
                <dt className="font-display text-lg font-semibold text-white md:text-xl">
                  {label}
                </dt>
                <dd className="mt-1 text-[0.78rem] leading-snug text-white/55">{note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-[8.5rem] right-6 hidden size-14 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-brand-green hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green xl:right-12 xl:flex"
        aria-label="Scroll to the next section"
      >
        <MoveDown className="animate-float size-5" aria-hidden />
      </a>
    </section>
  );
}
