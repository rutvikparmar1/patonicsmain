import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Boxes,
  Check,
  ChevronLeft,
  ChevronRight,
  Factory,
  Globe2,
  HandHeart,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Microscope,
  PackageCheck,
  Phone,
  Ship,
  Sprout,
  Tag,
  Truck,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CONTACT, PRODUCTS, telHref, waHref } from "@/lib/site-data";
import { COUNTRIES, MAP_H, MAP_W, project } from "@/lib/world-map";
import { ORIGIN, PINS, SEA_LANES, SERVED_COUNTRIES, smoothPath } from "@/lib/trade-lanes";
import { cn } from "@/lib/utils";
import farmerImg from "@/assets/about-farmer.jpg";
import chilliBowlImg from "@/assets/chilli-powder-bowl.jpg";
import chilliPortraitImg from "@/assets/chilli-powder-portrait.jpg";
import chilliesDarkImg from "@/assets/spices-chillies-dark.jpg";
import flatlayImg from "@/assets/spices-flatlay.jpg";
import portImg from "@/assets/trade-port.jpg";

type Slug = (typeof PRODUCTS)[number]["slug"];
const bySlug = (slug: Slug) => PRODUCTS.find((p) => p.slug === slug)!;
const phone = CONTACT.phones[0] ?? "";

/** Small centred heading with a leaf rule under it, as in the references. */
function Heading({
  eyebrow,
  children,
  center,
  light,
}: {
  eyebrow: string;
  children: React.ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={center ? "text-center" : undefined}>
      <p
        className={cn(
          "eyebrow flex items-center gap-3",
          center && "justify-center",
          light ? "text-brand-green" : "text-spice-deep",
        )}
      >
        <span className={cn("h-px w-8", light ? "bg-brand-green" : "bg-spice")} aria-hidden />
        {eyebrow}
        {center && (
          <span className={cn("h-px w-8", light ? "bg-brand-green" : "bg-spice")} aria-hidden />
        )}
      </p>
      <h2 className={cn("headline-section mt-4", light ? "text-white" : "text-ink")}>{children}</h2>
    </div>
  );
}

/* ===================================================================== hero */

const HERO_PACKS: { slug: Slug; cls: string }[] = [
  { slug: "turmeric-powder", cls: "left-[2%] top-[6%] w-[44%] -rotate-[9deg] z-10" },
  { slug: "cumin-powder", cls: "right-[0%] top-[4%] w-[42%] rotate-[8deg] z-10" },
  { slug: "red-chilli-powder", cls: "left-1/2 top-[12%] w-[52%] -translate-x-1/2 z-20" },
  { slug: "coriander-powder", cls: "left-[-2%] bottom-[0%] w-[38%] -rotate-[5deg] z-30" },
  { slug: "red-chilli-powder-kashmiri", cls: "right-[-2%] bottom-[0%] w-[38%] rotate-[6deg] z-30" },
];

const HERO_POINTS = [
  { icon: Leaf, label: "Pure & natural" },
  { icon: Microscope, label: "Batch tested" },
  { icon: Award, label: "ISO 9001:2015" },
] as const;

const SERVICES = [
  { icon: Ship, title: "Worldwide shipping", note: "Via Mundra & Kandla" },
  { icon: BadgeCheck, title: "Premium quality", note: "ISO 9001:2015 certified" },
  { icon: PackageCheck, title: "Export packaging", note: "50g pouch to 25kg bag" },
  { icon: Tag, title: "Private labeling", note: "Your brand, our spice" },
  { icon: Truck, title: "On-time dispatch", note: "Planned to your vessel" },
] as const;

export function LandingHero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-cream"
    >
      {/* Warm wash and a faint leaf in the corners. */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -right-40 top-10 size-[42rem] rounded-full bg-[radial-gradient(circle,oklch(0.9_0.08_70/0.55),transparent_65%)]" />
        <div className="absolute -left-40 bottom-0 size-[30rem] rounded-full bg-[radial-gradient(circle,oklch(0.88_0.08_128/0.35),transparent_65%)]" />
        <Leaf className="absolute left-[46%] top-32 size-10 rotate-45 text-brand-green/40 animate-float" />
        <Leaf className="absolute right-[6%] top-28 size-7 -rotate-12 text-brand-green/50 animate-float [animation-delay:1.5s]" />
      </div>

      <div className="container-site grid items-center gap-10 pb-16 pt-32 md:pt-36 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:pb-24 lg:pt-40">
        <div>
          <p className="eyebrow animate-rise flex items-center gap-2 text-spice-deep">
            Pure <span className="text-brand-green">•</span> Aromatic{" "}
            <span className="text-brand-green">•</span> Natural
          </p>
          <h1
            id="hero-title"
            className="animate-rise mt-5 font-display text-[clamp(2.6rem,1.6rem+4vw,5rem)] font-semibold leading-[1.02] text-ink [animation-delay:80ms]"
          >
            Bringing the <span className="italic text-spice">taste</span>
            <br />
            of <span className="text-brand-green-deep">India</span> to
            <br />
            the world
          </h1>
          <p className="animate-rise mt-6 max-w-lg text-lg leading-relaxed text-ink/70 [animation-delay:160ms]">
            Red chilli, turmeric, cumin and coriander, sourced from growers we know, milled in
            Gujarat and packed for kitchens and brands in ten markets.
          </p>
          <div className="animate-rise mt-9 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <Link
              to="/products"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-spice-deep px-8 py-4 font-semibold text-white shadow-[0_14px_30px_-12px_oklch(0.5_0.19_29/0.7)] transition-colors hover:bg-ink"
            >
              Explore products
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <a
              href={waHref(phone, "Hello Patonics, I would like a quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-green-deep px-8 py-3.5 font-semibold text-brand-green-deep transition-colors hover:bg-brand-green-deep hover:text-white"
            >
              <MessageCircle className="size-4" aria-hidden /> Get a quote on WhatsApp
            </a>
          </div>
          <ul className="animate-rise mt-10 flex flex-wrap gap-x-7 gap-y-4 [animation-delay:320ms]">
            {HERO_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <span className="flex size-10 items-center justify-center rounded-full border border-spice/25 bg-white text-spice-deep shadow-soft">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Pack composition */}
        <div className="relative mx-auto aspect-[10/9] w-full max-w-[38rem]" aria-hidden>
          <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-white to-[oklch(0.93_0.05_75)] shadow-[inset_0_-20px_60px_oklch(0.85_0.07_70/0.5)]" />
          {HERO_PACKS.map(({ slug, cls }, i) => (
            <img
              key={slug}
              src={bySlug(slug).image}
              alt=""
              width={1000}
              height={1000}
              fetchPriority={i === 2 ? "high" : "auto"}
              className={cn(
                "animate-rise absolute h-auto drop-shadow-[0_24px_30px_rgba(60,30,10,0.28)]",
                cls,
              )}
              style={{ animationDelay: `${200 + i * 90}ms` }}
            />
          ))}
          <div className="animate-float absolute right-[2%] top-[-2%] z-40 flex size-28 flex-col items-center justify-center rounded-full bg-spice-deep text-center text-white shadow-lift ring-4 ring-white md:size-32">
            <Leaf className="size-5" />
            <span className="mt-1 font-display text-sm font-semibold leading-tight md:text-base">
              Pure
              <br />
              Natural
              <br />
              Authentic
            </span>
          </div>
        </div>
      </div>

      {/* Service band */}
      <div className="bg-brand-green-deep">
        <ul className="container-site grid grid-cols-2 gap-y-6 py-7 md:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/15">
          {SERVICES.map(({ icon: Icon, title, note }, i) => (
            <li
              key={title}
              className={cn(
                "flex items-center gap-3 lg:justify-center lg:px-4",
                i === SERVICES.length - 1 && "col-span-2 md:col-span-1",
              )}
            >
              <Icon className="size-9 shrink-0 text-gold" strokeWidth={1.4} aria-hidden />
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-white">{title}</p>
                <p className="text-xs text-white/70">{note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================ categories */

const CATEGORIES: {
  title: string;
  accent: string;
  slug: Slug;
  grades: string;
  tint: string;
}[] = [
  {
    title: "Red Chilli",
    accent: "Powder",
    slug: "red-chilli-powder",
    grades: "Regular, Kashmiri, Reshampatta & Gholar",
    tint: "from-[#fbe4dc] to-[#f3c9bb]",
  },
  {
    title: "Turmeric",
    accent: "Powder",
    slug: "turmeric-powder",
    grades: "Regular, Salem, Rajapari & Kasturi",
    tint: "from-[#fdf1cf] to-[#f6dc96]",
  },
  {
    title: "Cumin",
    accent: "Powder",
    slug: "cumin-powder",
    grades: "Sortex-grade, plain & roasted",
    tint: "from-[#f3e9da] to-[#e3cfb0]",
  },
  {
    title: "Coriander",
    accent: "& Blends",
    slug: "coriander-powder",
    grades: "Coriander and dhana-jeeru blend",
    tint: "from-[#eef0dc] to-[#d8dfb4]",
  },
];

export function Categories() {
  return (
    <section className="bg-background py-20 md:py-28" aria-labelledby="cat-title">
      <div className="container-site">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <Heading eyebrow="Our products">
              <span id="cat-title">
                Kitchen essentials, <span className="text-brand-green-deep">packed with care</span>
              </span>
            </Heading>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              Twelve ground-spice lines across four families, each milled to grade and checked
              before it is packed.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-green-deep px-7 py-3.5 font-semibold text-white transition-colors hover:bg-ink"
            >
              View all products
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => {
            const p = bySlug(c.slug);
            return (
              <Reveal as="li" key={c.title} delay={i * 80}>
                <Link
                  to="/products/$slug"
                  params={{ slug: c.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-sand-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <div
                    className={cn(
                      "relative flex aspect-[5/4] items-end justify-center overflow-hidden bg-gradient-to-br",
                      c.tint,
                    )}
                  >
                    <div className="absolute -bottom-16 left-1/2 size-56 -translate-x-1/2 rounded-full bg-white/50" />
                    <img
                      src={p.image}
                      alt={p.alt}
                      loading="lazy"
                      width={1000}
                      height={1000}
                      className="relative h-[92%] w-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl font-semibold text-ink">
                      {c.title} <span className="text-spice">{c.accent}</span>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.grades}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-brand-green-deep">
                      <span className="flex size-8 items-center justify-center rounded-full bg-brand-green-deep text-white transition-transform group-hover:translate-x-1">
                        <ArrowRight className="size-4" aria-hidden />
                      </span>
                      View range
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================= spotlight */

/**
 * The chilli grades on near-black. The two photos are shot on black, so they
 * sit in the section with no visible edge.
 */
export function ChilliSpotlight() {
  const grades = PRODUCTS.filter((p) => p.group === "chilli");
  return (
    <section
      className="relative overflow-hidden bg-[#0b0a09] text-white"
      aria-labelledby="chilli-title"
    >
      <div className="container-site grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-spice">
            <span className="h-px w-8 bg-spice" aria-hidden />
            Spotlight
          </p>
          <h2 id="chilli-title" className="headline-section mt-4">
            Red chilli, <span className="italic text-spice">four ways</span>
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-white/65">
            From everyday heat to Kashmiri colour, each grade is milled from dried chillies we
            select by variety, then checked for colour value and moisture before packing.
          </p>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {grades.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group flex items-center gap-4 py-4"
                >
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    width={1000}
                    height={1000}
                    className="size-14 shrink-0 rounded-xl bg-white/5 object-contain p-1"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg font-semibold">{p.variant ?? "Regular"}</p>
                    <p className="truncate text-sm text-white/55">{p.blurb}</p>
                  </div>
                  <ArrowRight
                    className="size-5 shrink-0 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-spice"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            search={{ product: "red-chilli-powder" }}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-spice-deep px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white hover:text-ink"
          >
            Enquire about red chilli <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>

        <Reveal
          delay={80}
          variant="fade"
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <img
            src={chilliPortraitImg}
            alt="A bowl of red chilli powder beside whole dried red chillies"
            loading="lazy"
            width={1280}
            height={1918}
            className="ml-auto aspect-[4/5] w-full rounded-[2rem] object-cover object-bottom lg:w-[85%]"
          />
          <figure className="absolute -bottom-6 left-0 w-[46%] overflow-hidden rounded-[1.5rem] border-4 border-[#0b0a09] shadow-deep">
            <img
              src={chilliBowlImg}
              alt="Close-up of finely ground red chilli powder heaped in a marble bowl"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== featured */

const TINT: Record<string, string> = {
  chilli: "bg-[#fbeae3]",
  turmeric: "bg-[#fdf3d8]",
  cumin: "bg-[#f4ece0]",
};

export function Featured() {
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => api.scrollNext(), 3800);
    return () => clearInterval(id);
  }, [api, paused]);

  const arrow =
    "flex size-12 items-center justify-center rounded-full border border-ink/15 bg-white text-ink shadow-soft transition-colors hover:border-spice-deep hover:bg-spice-deep hover:text-white";

  return (
    <section
      className="bg-cream py-20 md:py-28"
      aria-labelledby="featured-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Heading eyebrow="Our best sellers">
              <span id="featured-title">
                Featured <span className="italic text-spice">products</span>
              </span>
            </Heading>
          </Reveal>
          <div className="flex gap-3">
            <button
              type="button"
              className={arrow}
              aria-label="Previous products"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              className={arrow}
              aria-label="Next products"
              onClick={() => api?.scrollNext()}
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="mt-12">
          <CarouselContent className="-ml-5 py-2">
            {PRODUCTS.map((p) => (
              <CarouselItem
                key={p.slug}
                className="basis-[78%] pl-5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <article className="group flex h-full flex-col rounded-[1.6rem] bg-white p-3 shadow-soft transition-shadow duration-300 hover:shadow-lift">
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className={cn(
                      "relative flex aspect-square items-center justify-center overflow-hidden rounded-[1.2rem] p-5",
                      TINT[p.group],
                    )}
                  >
                    {p.variant && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-spice-deep">
                        {p.variant}
                      </span>
                    )}
                    <img
                      src={p.image}
                      alt={p.alt}
                      loading="lazy"
                      width={1000}
                      height={1000}
                      className="h-full w-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                    <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {p.blurb}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                      <Link
                        to="/contact"
                        search={{ product: p.slug }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-spice-deep"
                      >
                        <MessageSquareText className="size-4" aria-hidden /> Enquire
                      </Link>
                      <Link
                        to="/products/$slug"
                        params={{ slug: p.slug }}
                        aria-label={`View ${p.variant ? `${p.variant} ` : ""}${p.name}`}
                        className="flex size-10 items-center justify-center rounded-full border border-sand-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                      >
                        <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-semibold text-spice-deep underline-offset-4 hover:underline"
          >
            View all 12 products <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== exports */

const WHY = [
  "Trading since 1983, from Gujarat's spice belt",
  "Twelve ground-spice lines in one container",
  "Shipped from Mundra & Kandla to all major ports",
  "Retail packs, bulk bags or your own label",
  "Every batch checked before it is packed",
  "One trade desk from quote to dispatch",
] as const;

export function ExportSplit() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-site">
        <div className="grid overflow-hidden rounded-[2rem] border border-sand-line shadow-soft lg:grid-cols-[1fr_1.05fr_1fr]">
          <Reveal className="flex flex-col justify-center bg-surface p-8 md:p-10">
            <p className="eyebrow text-spice-deep">Import & export</p>
            <h2 className="headline-section mt-3 text-ink">
              Export solutions <span className="text-brand-green-deep">you can trust</span>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Patonics International is an ISO 9001:2015 certified trading house in Gujarat. We look
              after sourcing, milling, quality checks, packing and documentation through to your
              port.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand-green-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink"
            >
              Learn more about us <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
          <div className="relative min-h-72">
            <img
              src={portImg}
              alt="Spice sacks waiting on the quay beside a container ship at sunset"
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-white/90 p-4 backdrop-blur">
              <Ship className="size-8 shrink-0 text-brand-green-deep" aria-hidden />
              <p className="text-sm font-semibold text-ink">
                Shipping from {ORIGIN.port}
                <span className="block font-normal text-muted-foreground">{ORIGIN.region}</span>
              </p>
            </div>
          </div>
          <Reveal delay={80} className="flex flex-col justify-center bg-[#fbf1ea] p-8 md:p-10">
            <h3 className="font-display text-2xl font-semibold text-ink">Why choose us?</h3>
            <ul className="mt-6 space-y-3.5">
              {WHY.map((w) => (
                <li key={w} className="flex gap-3 text-[0.95rem] leading-snug text-ink/85">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-green-deep text-white">
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================== story */

const QUALITY = [
  { icon: Sprout, title: "Carefully sourced", note: "Growers we have known for years" },
  { icon: Factory, title: "Clean milling", note: "Hygienic, controlled processing" },
  { icon: Microscope, title: "Strict quality control", note: "Colour, moisture & purity" },
  { icon: HandHeart, title: "Trusted by buyers", note: "In ten markets worldwide" },
] as const;

export function StorySection() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="left" className="relative">
          <img
            src={farmerImg}
            alt="A farmer checking his crop at sunset in Gujarat"
            loading="lazy"
            width={1200}
            height={1440}
            className="aspect-[4/3.4] w-full rounded-[2rem] object-cover object-[50%_25%]"
          />
          <div className="absolute -bottom-6 right-6 rounded-2xl bg-spice-deep px-6 py-5 shadow-deep md:right-10">
            <p className="font-display text-4xl font-semibold leading-none">1983</p>
            <p className="mt-1 text-sm text-white/80">Trading since</p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <Heading eyebrow="Our story" light>
            From farms <span className="italic text-brand-green">to your table</span>
          </Heading>
          <p className="mt-6 leading-relaxed text-white/70">
            Patonics began in 1983 as a family trading house in Gujarat, the heart of India's spice
            belt. We buy from growers we know, mill in clean conditions and check every batch before
            it is packed, so every pouch carries the colour and aroma it should.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {QUALITY.map(({ icon: Icon, title, note }) => (
              <li
                key={title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/15 text-brand-green">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-white/60">{note}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="mt-9 inline-flex items-center gap-2 font-semibold text-brand-green hover:underline"
          >
            Read our story <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================================================================== stats */

const STATS = [
  { icon: Award, value: "40+", label: "Years in trade" },
  { icon: Boxes, value: "12", label: "Spice lines" },
  { icon: PackageCheck, value: "7", label: "Pack sizes" },
  { icon: Globe2, value: "10", label: "Export markets" },
  { icon: BadgeCheck, value: "ISO", label: "9001:2015 certified" },
] as const;

export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-spice-deep" aria-label="Patonics in numbers">
      <img
        src={flatlayImg}
        alt=""
        loading="lazy"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#3a0d08]/80" aria-hidden />
      <ul className="container-site relative grid grid-cols-2 gap-y-8 py-16 md:grid-cols-5 md:divide-x md:divide-white/20">
        {STATS.map(({ icon: Icon, value, label }, i) => (
          <Reveal
            as="li"
            key={label}
            delay={i * 60}
            className={cn(
              "flex items-center justify-center gap-4 md:px-4",
              i === STATS.length - 1 && "col-span-2 md:col-span-1",
            )}
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-white">
              <Icon className="size-6" strokeWidth={1.5} aria-hidden />
            </span>
            <div className="text-white">
              <p className="font-display text-3xl font-semibold leading-none">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/75">{label}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ============================================================ reach + contact */

export function ReachContact() {
  const [ox, oy] = project(ORIGIN.lon, ORIGIN.lat);
  return (
    <section className="bg-background py-20 md:py-28" aria-labelledby="reach-title">
      <div className="container-site">
        <Reveal>
          <Heading eyebrow="Global reach" center>
            <span id="reach-title">
              We ship to <span className="text-brand-green-deep">major ports</span> worldwide
            </span>
          </Heading>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="relative flex flex-col justify-center overflow-hidden rounded-[2rem] bg-[#eef2e6] p-4 md:p-8 md:pb-36">
            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="h-auto w-full"
              role="img"
              aria-label="World map with the shipping lanes from Gujarat to Patonics' ten markets"
            >
              {COUNTRIES.map((c) => (
                <path
                  key={c.name + c.d.length}
                  d={c.d}
                  className={
                    SERVED_COUNTRIES.has(c.name) ? "fill-brand-green-deep/70" : "fill-ink/[0.12]"
                  }
                />
              ))}
              {SEA_LANES.map((l) => (
                <path
                  key={l.id}
                  d={smoothPath(l.points)}
                  fill="none"
                  strokeWidth={1.6}
                  strokeDasharray="5 6"
                  className="animate-route stroke-spice-deep/80"
                />
              ))}
              {PINS.map((p) => {
                const [x, y] = project(p.lon, p.lat);
                return (
                  <circle
                    key={p.market}
                    cx={x}
                    cy={y}
                    r={5}
                    className="fill-white stroke-ink"
                    strokeWidth={2}
                  />
                );
              })}
              <circle cx={ox} cy={oy} r={14} className="animate-pulse fill-spice/30" />
              <circle
                cx={ox}
                cy={oy}
                r={6.5}
                className="fill-spice-deep stroke-white"
                strokeWidth={2}
              />
            </svg>
            <div className="mt-4 rounded-2xl bg-brand-green-deep p-5 text-white md:absolute md:bottom-8 md:left-8 md:mt-0 md:max-w-[15rem]">
              <p className="font-display text-xl font-semibold leading-tight">
                Ten markets, four continents
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/75">
                {PINS.map((p) => p.market).join(" · ")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="flex flex-col gap-5">
            <div className="rounded-[2rem] border border-sand-line bg-surface p-7">
              <h3 className="font-display text-2xl font-semibold text-ink">Contact us</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Our trade desk replies within a day.
              </p>
              <ul className="mt-5 space-y-3">
                {CONTACT.phones.slice(0, 2).map((p) => (
                  <li key={p}>
                    <a
                      href={telHref(p)}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-green-deep px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink"
                    >
                      <Phone className="size-4" aria-hidden /> {p}
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-3 pt-1 text-sm text-ink">
                  <Mail className="size-4 shrink-0 text-spice-deep" aria-hidden />
                  <a href={`mailto:${CONTACT.emails[0]}`} className="hover:underline">
                    {CONTACT.emails[0]}
                  </a>
                </li>
                <li className="flex gap-3 text-sm leading-relaxed text-ink">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-spice-deep" aria-hidden />
                  <address className="not-italic">{CONTACT.addressLines.join(", ")}</address>
                </li>
              </ul>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center rounded-[2rem] bg-[#e8f7ee] p-7 text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift">
                <MessageCircle className="size-8" aria-hidden />
              </span>
              <p className="mt-4 font-display text-xl font-semibold text-ink">
                Enquire on WhatsApp
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Quick answers from our team</p>
              <a
                href={waHref(phone, "Hello Patonics, I have an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-deep"
              >
                Click to chat <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================= cta */

export function LabelCta() {
  return (
    <section className="relative overflow-hidden bg-[#0d0c0b]">
      <img
        src={chilliesDarkImg}
        alt=""
        loading="lazy"
        width={1920}
        height={1280}
        className="absolute inset-0 size-full object-cover object-[70%_center] opacity-50 md:opacity-100"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0d0c0b] via-[#0d0c0b]/80 to-transparent"
        aria-hidden
      />
      <div className="container-site relative grid items-center gap-8 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <p className="eyebrow text-gold">Private labeling</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,1.4rem+2.4vw,3.2rem)] font-semibold leading-tight text-white">
            Our spices, <span className="italic text-gold">your brand</span>
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-white/80">
            Premium spices packed under your name, made to your taste, grade and pack size. Send us
            your requirement and we will come back with samples and a quote.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-[#7a1f12] transition-colors hover:bg-gold hover:text-ink"
            >
              Get a quote <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              to="/private-labeling"
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              How it works
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
