import { PROCESS } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * A connected rail, not a card grid.
 *
 * The six stages are a route, and a uniform grid of equal cards says nothing
 * about order: every tile carries the same weight and there is no direction to
 * read. Here one continuous line runs through all six markers and shifts from
 * the green of the growing region to the blue of the sea, so the sequence and
 * its direction are carried by the layout itself rather than by the numbers.
 *
 * Horizontal on desktop, vertical on narrow screens, where a six-column rail
 * would squeeze each stage to an unreadable measure.
 */

/** One step along green → blue, so each marker sits further down the journey. */
const STEP_COLOR = [
  "oklch(0.49 0.115 142)",
  "oklch(0.492 0.118 161)",
  "oklch(0.494 0.12 181)",
  "oklch(0.496 0.123 200)",
  "oklch(0.498 0.125 220)",
  "oklch(0.5 0.128 240)",
] as const;

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="scroll-mt-24 bg-surface py-20 md:py-28"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeading
            id="process-title"
            eyebrow="Process"
            title="From the growing region to your port"
            description="Every consignment goes through the same six stages, whatever the commodity."
          />
        </Reveal>

        {/* End labels make the direction of travel explicit on wide screens. */}
        <Reveal delay={60} variant="fade" className="mt-14 hidden lg:block">
          <div className="flex items-end justify-between border-b border-sand-line pb-3">
            <span className="eyebrow text-[0.64rem] text-brand-green-deep">Growing region</span>
            <span className="eyebrow text-[0.64rem] text-brand-blue-deep">Your port</span>
          </div>
        </Reveal>

        <ol className="relative mt-10 lg:mt-12">
          {/*
            The connector. Insets stop the line poking out past the first and
            last marker; it is decorative, so it stays out of the a11y tree.
          */}
          <span
            className="absolute left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-brand-green via-brand-blue/60 to-brand-blue-deep lg:inset-x-[8.333%] lg:bottom-auto lg:top-[23px] lg:h-0.5 lg:w-auto lg:bg-gradient-to-r"
            aria-hidden
          />

          <div className="grid gap-9 lg:grid-cols-6 lg:gap-5">
            {PROCESS.map((p, i) => (
              <Reveal
                as="li"
                key={p.step}
                delay={i * 80}
                className="relative flex gap-5 lg:flex-col lg:gap-0"
              >
                <span
                  className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-2 bg-surface font-display text-sm font-bold tabular-nums lg:mx-auto"
                  style={{ borderColor: STEP_COLOR[i], color: STEP_COLOR[i] }}
                  aria-hidden
                >
                  {i + 1}
                </span>

                <div className="pb-1 lg:mt-6 lg:px-1 lg:text-center">
                  <h3 className="font-display text-[1.05rem] font-bold leading-snug text-ink">
                    <span className="lg:hidden">{`Stage ${i + 1}. `}</span>
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </ol>
      </div>
    </section>
  );
}
