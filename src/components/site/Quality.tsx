import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  FileText,
  Microscope,
  Ruler,
  ScanLine,
  Droplets,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** The parameters a lot is actually judged on before it is committed. */
const CHECKS = [
  { icon: Droplets, label: "Moisture content", note: "Measured and recorded per lot" },
  { icon: Ruler, label: "Size & grade", note: "Sorted to the agreed specification" },
  { icon: ScanLine, label: "Foreign matter", note: "Sortex and manual cleaning" },
  { icon: Microscope, label: "Appearance & colour", note: "Checked against the approved sample" },
] as const;

const DOCUMENTS = [
  "ISO 9001:2015 certificate",
  "Company profile & product catalogue",
  "Pre-shipment sample on request",
  "Third-party inspection, on buyer nomination",
] as const;

export function Quality() {
  return (
    <section
      id="quality"
      aria-labelledby="quality-title"
      className="scroll-mt-24 bg-surface py-20 md:py-28"
    >
      <div className="container-site grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionHeading
              id="quality-title"
              eyebrow="Quality"
              title="How we check a lot"
              description="Our quality management system is certified to ISO 9001:2015. The parameters below are agreed with you in writing, and the lot is measured against them before we commit it."
            />
          </Reveal>

          <Reveal delay={90}>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-sand-line bg-sand-line sm:grid-cols-2">
              {CHECKS.map(({ icon: Icon, label, note }) => (
                <li key={label} className="bg-background p-5">
                  <Icon className="size-5 text-brand-green-deep" strokeWidth={1.6} aria-hidden />
                  <p className="mt-3.5 font-display text-[0.98rem] font-semibold text-ink">
                    {label}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{note}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <Button asChild variant="brand" size="xl" className="mt-10">
              <Link to="/contact">
                Request our certificate
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Reveal variant="right" delay={60} className="lg:col-span-6">
          <div className="rounded-[2rem] border border-sand-line bg-background p-6 shadow-soft sm:p-9">
            {/*
              A certificate image has not been supplied, so the panel presents
              the credential as a record rather than pretending to show the
              document. Drop the scan into the dashed frame when it arrives.
            */}
            <div className="flex items-start gap-5">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-brand-green-soft text-brand-green-deep">
                <BadgeCheck className="size-8" strokeWidth={1.6} aria-hidden />
              </span>
              <div>
                <p className="eyebrow text-[0.68rem] text-muted-foreground">
                  Quality Management System
                </p>
                <p className="mt-2 font-display text-[2.1rem] font-semibold leading-none text-ink sm:text-[2.6rem]">
                  ISO 9001:2015
                </p>
                <p className="mt-2.5 text-sm text-muted-foreground">
                  Certified quality management, covering sourcing through to dispatch.
                </p>
              </div>
            </div>

            <hr className="my-8 border-sand-line" />

            <p className="eyebrow text-[0.68rem] text-ink">Available on request</p>
            <ul className="mt-5 space-y-3">
              {DOCUMENTS.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-ink/75">
                  <FileText className="mt-0.5 size-4 shrink-0 text-brand-blue-deep" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>

            <p className="mt-8 rounded-xl border border-dashed border-sand-line bg-surface px-5 py-5 text-xs leading-relaxed text-muted-foreground">
              Certificate copies and company documentation are shared directly with buyers on
              request. Ask for them with your inquiry and they will come back with our reply.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
