import { createFileRoute } from "@tanstack/react-router";
import { Faq } from "@/components/site/Faq";
import { Process } from "@/components/site/Process";
import { CtaBanner } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import { FAQS } from "@/lib/site-data";

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Buyer FAQ | Patonics International" },
      {
        name: "description",
        content:
          "Answers to the questions buyers ask before a first order: product range, samples, Incoterms, packing, quality assurance and export documentation.",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(FAQ_JSON_LD) }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Buyer FAQ"
        title="Questions buyers ask"
        lead="We quote commercial terms per enquiry rather than publishing them, so anything not answered here is a phone call away."
      />
      <Faq />
      <Process />
      <CtaBanner />
    </main>
  );
}
