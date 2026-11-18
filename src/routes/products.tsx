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
          "Eleven agricultural categories: grains and cereals, pulses, spices, fruits, vegetables, oilseeds, floriculture, herbs, dry fruits, beverages and dehydrated products.",
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
        title="Eleven agri categories, one supplier"
        lead="Bought in the growing regions, graded to the specification you agree with us, and consolidated into one shipment where the volumes allow it."
      />
      <Products />
      <Process />
      <Quality />
      <CtaBanner />
    </main>
  );
}
