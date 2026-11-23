import { createFileRoute } from "@tanstack/react-router";
import { Packaging } from "@/components/site/Packaging";
import { Quality } from "@/components/site/Quality";
import { CtaBanner } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import { PACKAGING } from "@/lib/site-data";

export const Route = createFileRoute("/packaging")({
  head: () => ({
    meta: [
      { title: "Packaging | Patonics International" },
      {
        name: "description",
        content: `Patonics spice packaging: retail packs in ${PACKAGING.retail.join(", ")} and bulk at ${PACKAGING.bulk.join(" and ")}. Private-label and retail-ready packing to your own artwork.`,
      },
    ],
  }),
  component: PackagingPage,
});

function PackagingPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Packaging"
        title="Retail packs and bulk bags"
        lead={`Retail from ${PACKAGING.retail[0]} to ${PACKAGING.retail.at(-1)}, bulk at ${PACKAGING.bulk.join(" and ")}. Every spice line is available in every format, under our label or yours.`}
      />
      <Packaging />
      <Quality />
      <CtaBanner />
    </main>
  );
}
