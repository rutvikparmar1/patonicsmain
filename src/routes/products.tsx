import { createFileRoute } from "@tanstack/react-router";
import { Products } from "@/components/site/Products";
import { Process } from "@/components/site/Process";
import { Quality } from "@/components/site/Quality";
import { CtaBanner } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products | Patonics International" },
      {
        name: "description",
        content:
          "Twelve ground spice lines: red chilli including Kashmiri, Reshampatta and Gholar, turmeric including Salem, Rajapari and Kasturi, plus cumin, roasted cumin, coriander and cumin-coriander blend.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Products"
        title="Twelve spice lines, one supplier"
        lead="Milled and packed under the Patonics label, in retail packs from 50g to 1kg and bulk at 5kg and 25kg."
      />
      <Products />
      <Process />
      <Quality />
      <CtaBanner />
    </main>
  );
}
