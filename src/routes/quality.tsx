import { createFileRoute } from "@tanstack/react-router";
import { Quality } from "@/components/site/Quality";
import { Process } from "@/components/site/Process";
import { CtaBanner } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality & Certificates | Patonics International" },
      {
        name: "description",
        content:
          "Patonics International operates a quality management system certified to ISO 9001:2015. Lots are graded on moisture, size, foreign matter and appearance before despatch.",
      },
    ],
  }),
  component: QualityPage,
});

function QualityPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Quality"
        title="Checked before it ships, not after it lands"
        lead="Our quality management system is certified to ISO 9001:2015. The parameters are agreed with you in writing and the lot is measured against them before we commit it."
      />
      <Quality />
      <Process />
      <CtaBanner />
    </main>
  );
}
