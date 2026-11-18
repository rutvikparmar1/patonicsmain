import { MessageSquare, Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { CONTACT, FAQS, telHref } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-24 bg-surface py-20 md:py-28"
    >
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions buyers ask" />
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-9 rounded-2xl border border-sand-line bg-background p-6">
              <MessageSquare
                className="size-5 text-brand-green-deep"
                strokeWidth={1.6}
                aria-hidden
              />
              <p className="mt-4 font-display text-lg font-semibold text-ink">Not covered here?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We quote commercial terms per enquiry rather than publishing them, so call and ask.
              </p>
              <Button asChild variant="brandOutline" className="mt-6 h-11 w-full px-5">
                <a href={telHref(CONTACT.phones[0] ?? "")}>Call {CONTACT.phones[0]}</a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={60} className="lg:col-span-8">
          <Accordion
            type="single"
            collapsible
            className="divide-y divide-sand-line border-y border-sand-line"
          >
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className="border-b-0">
                {/*
                  The shared AccordionTrigger is sized for compact UI, so this
                  section uses the primitive directly to get the larger type and
                  a plus-to-minus marker instead of a chevron.
                */}
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group flex flex-1 items-start justify-between gap-5 py-6 text-left focus-visible:outline-none">
                    <span className="font-display text-[1.08rem] font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-brand-green-deep group-focus-visible:text-brand-green-deep sm:text-[1.2rem]">
                      {f.q}
                    </span>
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-sand-line text-ink transition-all duration-300 group-hover:border-brand-green-deep group-hover:bg-brand-green-deep group-hover:text-white group-data-[state=open]:rotate-45 group-data-[state=open]:border-brand-green-deep group-data-[state=open]:bg-brand-green-deep group-data-[state=open]:text-white">
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="pb-7 pr-12 pt-0">
                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
