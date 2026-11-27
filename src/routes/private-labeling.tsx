import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Packaging } from "@/components/site/Packaging";
import { CtaBanner } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CONTACT, waHref } from "@/lib/site-data";

export const Route = createFileRoute("/private-labeling")({
  head: () => ({
    meta: [
      { title: "Private Labeling | Patonics International" },
      {
        name: "description",
        content:
          "Private-label spice packing in Gujarat: red chilli, turmeric, cumin and coriander powders packed in your brand, from 50g pouches to 25kg bags.",
      },
    ],
  }),
  component: PrivateLabelingPage,
});

const STEPS = [
  {
    title: "Share your brief",
    text: "The spice, the grade, the pack size and the quantity you need.",
  },
  {
    title: "Send your artwork",
    text: "Your design and declarations. We check the print layout against the pouch size.",
  },
  { title: "Approve a sample", text: "A printed, filled sample before the production run starts." },
  {
    title: "Production & dispatch",
    text: "Milled, packed, cased into export cartons and shipped to your port.",
  },
] as const;

function PrivateLabelingPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Private Labeling"
        title="Our spices, your brand"
        lead="We mill and pack any of our twelve spice lines under your label, in retail pouches from 50g to 1kg or bulk bags at 5kg and 25kg."
      >
        <a
          href={waHref(
            CONTACT.phones[0] ?? "",
            "Hello Patonics, I would like to discuss private-label spice packing.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-ink"
        >
          <MessageCircle className="size-5" aria-hidden /> Discuss your label on WhatsApp
        </a>
      </PageHero>

      <section className="bg-background py-20 md:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="pl-steps" eyebrow="How it works" title="From brief to dispatch" />
          </Reveal>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 80}
                className="rounded-[1.4rem] border border-sand-line bg-surface p-7"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-green-deep font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Packaging />
      <CtaBanner />
    </main>
  );
}
