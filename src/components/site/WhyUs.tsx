import { Handshake, Landmark, Layers, ShieldCheck, Ship, Sprout } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FEATURES = [
  {
    icon: Landmark,
    title: "Since 1983",
    text: "The business started in 1983 and has worked in Indian agriculture and manufacturing ever since.",
  },
  {
    icon: ShieldCheck,
    title: "ISO 9001:2015",
    text: "A certified quality management system. Grading and inspection happen at sourcing, before a lot is committed.",
  },
  {
    icon: Layers,
    title: "Wide range",
    text: "Twelve ground-spice lines plus ceramics, textiles and packaging, so one supplier covers more of your list.",
  },
  {
    icon: Sprout,
    title: "We buy at source",
    text: "We buy in the growing regions and mandis we have worked in for years. Our founder has run training sessions for farmers and ginners.",
  },
  {
    icon: Ship,
    title: "Close to the ports",
    text: "Based in Gujarat, within reach of Mundra and Kandla. Shorter road leg, shorter loading window.",
  },
  {
    icon: Handshake,
    title: "Repeat buyers",
    text: "Most of our volume goes to buyers we have shipped to before.",
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
            eyebrow="Why Patonics"
            title="Why buyers stay with us"
            description="Most of our business is repeat business. These are the reasons buyers give us for coming back."
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
