import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { PRODUCTS } from "@/lib/site-data";
import farmerImg from "@/assets/about-farmer.jpg";

const NAMES = [...new Set(PRODUCTS.map((p) => p.variant ?? p.name.replace(" Powder", "")))];

/** A slow line of spice names on sand. Decorative; the range is listed properly below. */
export function SpiceTicker() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {NAMES.map((n) => (
        <li key={n} className="flex items-center">
          <span className="px-6 font-display text-xl italic text-ink/80 md:text-2xl">{n}</span>
          <span className="text-brand-green" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-sand-line bg-sand py-4" aria-label="Our spices">
      <div className="animate-marquee flex w-max motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

const FACTS = [
  ["ISO 9001:2015", "certified"],
  ["Gujarat", "near Mundra port"],
  ["10 markets", "on four continents"],
] as const;

export function Story() {
  return (
    <section id="about" className="bg-background py-20 md:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <img
            src={farmerImg}
            alt="A farmer in a spice field in Gujarat"
            width={1200}
            height={900}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover"
          />
        </Reveal>
        <Reveal delay={80}>
          <p className="eyebrow text-brand-green-deep">Our story</p>
          <h2 className="headline-section mt-4 text-ink">Four decades of honest spice</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Patonics began in 1983 as a family trading house in Gujarat, the heart of India's spice
            belt. We buy from growers we know, mill in clean conditions and check every batch before
            it is packed.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Today our powders reach shelves and kitchens in ten countries, under our name and under
            our buyers' own labels.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-sand-line pt-6">
            {FACTS.map(([k, v]) => (
              <div key={k}>
                <dt className="font-display text-lg font-semibold text-ink">{k}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-green-deep hover:underline"
          >
            More about us <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

const TILE_BG = ["bg-[#f6e3dc]", "bg-[#f8ecd0]", "bg-[#efe6d6]", "bg-[#e9eedb]", "bg-[#f1e7da]"];

export function RangeTiles() {
  const main = PRODUCTS.filter((p) => p.variant === null);
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-site">
        <div className="text-center">
          <p className="eyebrow text-brand-green-deep">Our spices</p>
          <h2 className="headline-section mt-4 text-ink">Our main products</h2>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-5">
          {main.map((p, i) => (
            <Reveal
              as="li"
              key={p.slug}
              delay={i * 70}
              className={i === main.length - 1 ? "col-span-2 lg:col-span-1" : ""}
            >
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className={`group flex h-full flex-col items-center rounded-[1.6rem] p-5 text-center transition-transform duration-300 hover:-translate-y-1 md:p-6 ${TILE_BG[i % TILE_BG.length]}`}
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className="h-40 w-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105 md:h-48"
                />
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-ink">
                  {p.name}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-deep">
                  View <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-semibold text-brand-green-deep hover:underline"
          >
            See all products <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

const POINTS = [
  "Sourced from growing regions we have worked with for years",
  "Every batch checked for colour, moisture and purity",
  "Packs from 50g pouches to 25kg bags",
  "Your own brand on our spices, with private labeling",
] as const;

export function WhyPatonics() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-brand-green-deep">Why Patonics</p>
          <h2 className="headline-section mt-4 text-ink">Tradition in every pack</h2>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3 leading-relaxed text-ink/85">
                <Check className="mt-1 size-5 shrink-0 text-brand-green-deep" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex h-full flex-col justify-center rounded-[2rem] bg-ink p-10 text-white md:p-12">
            <p className="eyebrow text-brand-green">Private labeling</p>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight">
              Our flavors, your brand identity
            </h3>
            <p className="mt-4 leading-relaxed text-white/70">
              Premium spices and blends packed under your name, made to your taste and pack size.
            </p>
            <Link
              to="/private-labeling"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand-green px-6 py-3 font-semibold text-ink"
            >
              Learn more <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
