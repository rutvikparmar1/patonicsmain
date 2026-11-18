import { PROCESS } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process() {
  return (
    <section aria-labelledby="process-title" className="bg-surface py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            id="process-title"
            align="center"
            eyebrow="From Field to Port"
            title={
              <>
                How an order actually <span className="text-brand-green-deep">moves.</span>
              </>
            }
            description="No step is left to assumption. Every consignment follows the same route from the growing region to your port of discharge."
          />
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-[1.6rem] border border-sand-line bg-sand-line sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((p, i) => (
            <Reveal
              as="li"
              key={p.step}
              delay={i * 70}
              className="group relative bg-background p-8 transition-colors duration-500 hover:bg-brand-green-soft md:p-10"
            >
              <span
                className="font-display text-[2.6rem] font-semibold leading-none tabular-nums text-sand transition-colors duration-500 group-hover:text-brand-green"
                aria-hidden
              >
                {p.step}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">{p.text}</p>
              <span
                className="absolute bottom-0 left-0 h-[3px] w-0 bg-brand-green-deep transition-[width] duration-500 group-hover:w-full"
                aria-hidden
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
