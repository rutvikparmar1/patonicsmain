import { createFileRoute } from "@tanstack/react-router";
import { Divisions } from "@/components/site/Divisions";
import { WhyUs } from "@/components/site/WhyUs";
import { GlobalReach } from "@/components/site/GlobalReach";
import { CtaBanner } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/divisions")({
  head: () => ({
    meta: [
      { title: "Divisions | Patonics International" },
      {
        name: "description",
        content:
          "Five business divisions: agri commodities, agro-processed products, ceramics, textiles, and paper and packaging.",
      },
    ],
  }),
  component: DivisionsPage,
});

function DivisionsPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Divisions"
        title="What we supply"
        lead="Agricultural commodities are the bulk of what we ship. The company was also set up to supply ceramics, textiles, and paper and packaging."
      />
      <Divisions />
      <WhyUs />
      <GlobalReach />
      <CtaBanner />
    </main>
  );
}
