import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const SIZES = [...PACKAGING.retail, ...PACKAGING.bulk];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState<string>("500g");
  const siblings = PRODUCTS.filter((p) => p.group === product.group);

  const message = `Hello Patonics, I would like to enquire about ${productLabel(product)}, pack size ${size}. Please share price and availability.`;

  return (
    <main id="main" tabIndex={-1} className="bg-background py-12 outline-none md:py-16">
      <div className="container-site">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[0.8rem] text-muted-foreground"
        >
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <Link to="/products" activeOptions={{ exact: true }} className="hover:text-ink">
            Products
          </Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <span aria-current="page" className="text-ink">
            {productLabel(product)}
          </span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-[1.6rem] border border-sand-line bg-surface p-6">
            <img
              src={product.image}
              alt={product.alt}
              width={1000}
              height={1000}
              className="aspect-square w-full object-contain"
            />
          </div>

          <div>
            <p className="eyebrow text-brand-green-deep">Premium Indian Spices</p>
            <h1 className="headline-section mt-4 text-ink">
              {product.name}
              {product.variant && (
                <span className="block text-brand-green-deep">{product.variant}</span>
              )}
            </h1>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-muted-foreground">
              {product.blurb}
            </p>

            {siblings.length > 1 && (
              <div className="mt-8">
                <p className="text-sm font-semibold text-ink">Variety</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {siblings.map((s) => (
                    <Link
                      key={s.slug}
                      to="/products/$slug"
                      params={{ slug: s.slug }}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        s.slug === product.slug
                          ? "border-ink bg-ink text-white"
                          : "border-sand-line bg-surface text-ink/75 hover:border-brand-green-deep",
                      )}
                    >
                      {s.variant ?? (s.name === product.name ? "Regular" : s.name)}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <p className="text-sm font-semibold text-ink">Pack size</p>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Pack size">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={size === s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-16 rounded-xl border px-4 py-2.5 text-sm font-semibold tabular-nums transition-colors",
                      size === s
                        ? "border-brand-green-deep bg-brand-green-deep text-white"
                        : "border-sand-line bg-surface text-ink hover:border-brand-green-deep",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Retail {PACKAGING.retail.join(", ")} · Bulk {PACKAGING.bulk.join(", ")}
              </p>
            </div>

            <Button asChild variant="brand" size="2xl" className="mt-10 w-full sm:w-auto">
              <a
                href={waHref(CONTACT.phones[0] ?? "", message)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden />
                Enquire Now on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
