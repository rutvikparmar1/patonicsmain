import { Handshake, Landmark, Layers, ShieldCheck, Ship, Sprout } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FEATURES = [
  {
    icon: Landmark,
    title: "Legacy & experience",
    text: "A trading business that began in 1983, with roots in India's agricultural and manufacturing ecosystem rather than in a broker's office.",
  },
  {
    icon: ShieldCheck,
    title: "Quality commitment",
    text: "A quality management system certified to ISO 9001:2015, with grading and inspection built into sourcing rather than bolted on at the end.",
  },
  {
    icon: Layers,
    title: "Diverse portfolio",
    text: "Eleven agri categories plus ceramics, textiles and packaging, so one relationship can cover more of your sourcing list.",
  },
  {
    icon: Sprout,
    title: "Direct to the grower",
    text: "Long-standing relationships in the growing regions and mandis we buy from, including training work with farmers and ginners.",
  },
  {
    icon: Ship,
    title: "Port proximity",
    text: "Based in Gujarat, within reach of Mundra and Kandla, which shortens the road leg and the loading window.",
  },
  {
    icon: Handshake,
    title: "Partnerships, not one-offs",
    text: "We would rather quote honestly and keep you for ten years than win a single container on a promise we cannot hold.",
  },
] as const;

export function WhyUs() {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="relative overflow-hidden bg-ink py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div
        className="absolute -right-32 top-0 size-[30rem] rounded-full bg-brand-blue/10 blur-3xl"
        aria-hidden
      />

      <div className="container-site relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal variant="left" className="lg:col-span-4">
          <SectionHeading
            invert
            id="why-title"
            eyebrow="The Patonics Advantage"
            title={
              <>
                Built on trust. <span className="text-brand-green">Driven by quality.</span>
              </>
            }
            description="Successful international trade starts with dependable relationships, clear communication, and a quote you can hold us to."
          />
        </Reveal>

        <ul className="grid gap-px overflow-hidden rounded-[1.6rem] bg-white/10 sm:grid-cols-2 lg:col-span-8">
          {FEATURES.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 60}
              variant="fade"
              className="group relative bg-ink p-7 transition-colors duration-500 hover:bg-ink-soft sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/5 text-brand-green transition-colors duration-500 group-hover:bg-brand-green group-hover:text-ink">
                  <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="font-display text-sm font-semibold tabular-nums text-white/20">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2.5 text-[0.88rem] leading-relaxed text-white/55">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
