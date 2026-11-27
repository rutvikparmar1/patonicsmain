import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { CONTACT, PACKAGING, PRODUCTS, productLabel, waHref } from "@/lib/site-data";
import { cn } from "@/lib/utils";

// `products_` (trailing underscore) keeps this page out of the /products
// layout, so it renders on its own rather than inside the listing.
export const Route = createFileRoute("/products_/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${productLabel(loaderData.product)} | Patonics International` },
          { name: "description", content: loaderData.product.blurb },
        ]
      : [],
  }),
  component: ProductPage,
});

/** The hero takes the colour of the spice itself. Deep tones keep white text legible. */
const THEME: Record<string, { from: string; to: string; glow: string; accent: string }> = {
  chilli: {
    from: "oklch(0.42 0.16 27)",
    to: "oklch(0.24 0.08 22)",
    glow: "oklch(0.7 0.2 30 / 0.45)",
    accent: "oklch(0.86 0.12 60)",
  },
  turmeric: {
    from: "oklch(0.47 0.12 72)",
    to: "oklch(0.27 0.06 60)",
    glow: "oklch(0.85 0.17 90 / 0.45)",
    accent: "oklch(0.9 0.15 95)",
  },
  cumin: {
    from: "oklch(0.4 0.06 60)",
    to: "oklch(0.22 0.03 55)",
    glow: "oklch(0.75 0.09 70 / 0.4)",
    accent: "oklch(0.88 0.08 80)",
  },
};

const SIZES = [...PACKAGING.retail, ...PACKAGING.bulk];
const GRAMS: Record<string, number> = {
  "50g": 50,
  "100g": 100,
  "200g": 200,
  "500g": 500,
  "1kg": 1000,
  "5kg": 5000,
  "25kg": 25000,
};
// Side length by cube root of weight, so the ladder reads as real volume.
const side = (s: string) =>
  Math.round(
    22 + ((Math.cbrt(GRAMS[s] ?? 100) - Math.cbrt(50)) / (Math.cbrt(25000) - Math.cbrt(50))) * 42,
  );

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState<string>("500g");
  const t = THEME[product.group] ?? THEME["cumin"]!;
  const siblings = PRODUCTS.filter((p) => p.group === product.group);
  const others = PRODUCTS.filter((p) => !p.variant && p.group !== product.group).slice(0, 3);
  const message = `Hello Patonics, I would like to enquire about ${productLabel(product)}, pack size ${size}. Please share price and availability.`;

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      {/* Hero: the spice's own colour, the pack large, everything to order beside it. */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
      >
        <div className="absolute inset-0 grain-layer" aria-hidden />
        <span
          className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[clamp(5rem,16vw,15rem)] font-bold uppercase leading-none tracking-tighter text-white/[0.06]"
          aria-hidden
        >
          {product.variant ?? product.name.split(" ")[0]}
        </span>

        <div className="container-site relative grid items-center gap-10 pb-12 pt-32 lg:grid-cols-12 lg:gap-12 lg:pb-16 lg:pt-36">
          <div className="lg:col-span-6">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[0.8rem] text-white/60"
            >
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="size-3.5" aria-hidden />
              <Link to="/products" activeOptions={{ exact: true }} className="hover:text-white">
                Products
              </Link>
              <ChevronRight className="size-3.5" aria-hidden />
              <span aria-current="page" className="text-white">
                {productLabel(product)}
              </span>
            </nav>

            <p className="eyebrow mt-8" style={{ color: t.accent }}>
              Patonics · Farm to Fork
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,1.6rem+3.4vw,4.4rem)] font-bold uppercase leading-[0.98] tracking-tight">
              {product.name}
              {product.variant && (
                <span className="mt-1 block" style={{ color: t.accent }}>
                  {product.variant}
                </span>
              )}
            </h1>
            <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-white/80">
              {product.blurb}
            </p>

            {/* Varieties as pack tiles, not text chips: you pick by what you see. */}
            {siblings.length > 1 && (
              <div className="mt-9">
                <p className="eyebrow text-[0.62rem] text-white/60">Choose variety</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {siblings.map((s) => {
                    const on = s.slug === product.slug;
                    return (
                      <Link
                        key={s.slug}
                        to="/products/$slug"
                        params={{ slug: s.slug }}
                        className={cn(
                          "group flex w-[96px] flex-col items-center rounded-2xl border p-2 text-center transition-all",
                          on
                            ? "border-white bg-white/15"
                            : "border-white/15 bg-white/5 hover:border-white/50",
                        )}
                      >
                        <img
                          src={s.image}
                          alt=""
                          width={1000}
                          height={1000}
                          className="aspect-square w-full object-contain transition-transform group-hover:-translate-y-0.5"
                        />
                        <span className="mt-1.5 text-[0.7rem] font-semibold leading-tight">
                          {s.variant ??
                            (s.name === product.name ||
                            s.name.startsWith(product.name.split(" ")[0]!)
                              ? "Regular"
                              : s.name)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pack sizes drawn to scale. */}
            <div className="mt-9">
              <p className="eyebrow text-[0.62rem] text-white/60">Choose pack size</p>
              <div
                className="mt-3 flex flex-wrap items-end gap-2.5"
                role="group"
                aria-label="Pack size"
              >
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={size === s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-xl border px-2.5 pb-2 pt-2.5 transition-all",
                      size === s
                        ? "border-white bg-white text-ink"
                        : "border-white/15 bg-white/5 hover:border-white/50",
                    )}
                  >
                    <span
                      className={cn(
                        "rounded-[5px] border",
                        size === s ? "border-ink/20 bg-ink/10" : "border-white/30 bg-white/15",
                      )}
                      style={{ width: side(s), height: side(s) }}
                      aria-hidden
                    />
                    <span className="text-[0.75rem] font-bold tabular-nums">{s}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={waHref(CONTACT.phones[0] ?? "", message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 text-[1rem] font-bold text-ink shadow-lift transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MessageCircle className="size-5" aria-hidden />
                Enquire Now on WhatsApp
              </a>
              <p className="text-sm text-white/65">
                {productLabel(product)} · <span className="font-semibold text-white">{size}</span>
              </p>
            </div>
          </div>

          <div className="relative flex justify-center lg:col-span-6">
            <div
              className="absolute left-1/2 top-1/2 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{ background: t.glow }}
              aria-hidden
            />
            <img
              key={product.slug}
              src={product.image}
              alt={product.alt}
              width={1000}
              height={1000}
              fetchPriority="high"
              className="animate-rise relative w-full max-w-[520px] object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
      </section>

      {/* Assurance strip */}
      <section className="border-b border-sand-line bg-surface">
        <ul className="container-site grid gap-6 py-8 sm:grid-cols-3">
          {[
            [ShieldCheck, "ISO 9001:2015 certified", "Graded and checked before packing"],
            [Truck, "Retail to bulk", "50g pouches up to 25kg bags"],
            [Check, "Private label", "Packed to your own artwork"],
          ].map(([Icon, a, b]) => {
            const I = Icon as typeof Check;
            return (
              <li key={a as string} className="flex items-start gap-3">
                <I className="mt-0.5 size-5 shrink-0 text-brand-green-deep" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">{a as string}</p>
                  <p className="text-sm text-muted-foreground">{b as string}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Rest of the range */}
      <section className="bg-background py-16 md:py-20">
        <div className="container-site">
          <div className="flex items-end justify-between gap-6">
            <h2 className="headline-section text-ink">More from the range</h2>
            <Link
              to="/products"
              className="hidden items-center gap-1.5 text-sm font-semibold text-brand-green-deep hover:underline sm:inline-flex"
            >
              All products <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {others.map((o) => {
              const ot = THEME[o.group] ?? THEME["cumin"]!;
              return (
                <li key={o.slug}>
                  <Link
                    to="/products/$slug"
                    params={{ slug: o.slug }}
                    className="group relative flex items-center gap-4 overflow-hidden rounded-[1.4rem] p-5 text-white"
                    style={{ background: `linear-gradient(135deg, ${ot.from}, ${ot.to})` }}
                  >
                    <img
                      src={o.image}
                      alt=""
                      width={1000}
                      height={1000}
                      className="size-28 shrink-0 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    <div>
                      <p className="font-display text-lg font-bold uppercase leading-tight">
                        {o.name}
                      </p>
                      <p className="mt-2 inline-flex items-center gap-1 text-sm text-white/75">
                        View{" "}
                        <ArrowRight
                          className="size-3.5 transition-transform group-hover:translate-x-1"
                          aria-hidden
                        />
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
