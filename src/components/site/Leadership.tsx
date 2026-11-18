import { LEADERSHIP } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Leadership() {
  return (
    <section aria-labelledby="leadership-title" className="bg-background py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            id="leadership-title"
            eyebrow="Team"
            title="Who you deal with"
            description="The firm is small, so your enquiry reaches the people who decide what gets bought and what gets shipped."
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {LEADERSHIP.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 110}>
              <article className="group flex h-full flex-col rounded-[1.6rem] border border-sand-line bg-surface p-7 transition-all duration-500 hover:border-brand-green/50 hover:shadow-lift sm:p-9">
                <div className="flex items-center gap-5">
                  {/*
                    No portraits have been supplied, so a monogram stands in.
                    Swap this span for an <img> once photographs arrive.
                  */}
                  <span
                    className="flex size-16 shrink-0 items-center justify-center rounded-full bg-ink font-display text-xl font-semibold text-brand-green transition-colors duration-500 group-hover:bg-brand-green-deep group-hover:text-white"
                    aria-hidden
                  >
                    {p.initials}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.4rem] font-semibold leading-tight text-ink">
                      {p.name}
                    </h3>
                    <p className="eyebrow mt-1.5 text-[0.66rem] text-brand-green-deep">{p.role}</p>
                  </div>
                </div>

                <p className="mt-7 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {p.text}
                </p>

                <ul className="mt-7 flex flex-wrap gap-2 border-t border-sand-line pt-6">
                  {p.focus.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-sand-line bg-background px-3 py-1.5 text-[0.72rem] font-medium text-ink/70"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
