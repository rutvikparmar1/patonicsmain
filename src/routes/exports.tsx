import { createFileRoute } from "@tanstack/react-router";
import { GlobalReach } from "@/components/site/GlobalReach";
import { Process } from "@/components/site/Process";
import { Quality } from "@/components/site/Quality";
import { CtaBanner } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/exports")({
  head: () => ({
    meta: [
      { title: "Exports | Patonics International" },
      {
        name: "description",
        content:
          "Patonics International exports Indian ground spices to ten markets across North America, Europe, the Middle East, Africa, Asia and Oceania from Gujarat.",
      },
    ],
  }),
  component: ExportsPage,
});

function ExportsPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Exports"
        title="Shipping from Gujarat to ten markets"
        lead="Based close to Mundra and Kandla, we export to buyers across North America, Europe, the Middle East, Africa, Asia and Oceania, with quality checks and documents handled before the container leaves."
      />
      <GlobalReach />
      <Process />
      <Quality />
      <CtaBanner />
    </main>
  );
}
