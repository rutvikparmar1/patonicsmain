import { STATS } from "@/lib/site-data";
import { useCountUp, useInView } from "@/lib/use-reveal";

export function Stats() {
  // One observer drives all four counters, so they start together.
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -20% 0px");

  return (
    <section
      aria-labelledby="stats-title"
      className="relative overflow-hidden bg-ink py-18 md:py-24"
    >
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
      <div
        className="absolute -left-40 top-1/2 size-[32rem] -translate-y-1/2 rounded-full bg-brand-green/10 blur-3xl"
        aria-hidden
      />

      <div ref={ref} className="container-site relative">
        <h2 id="stats-title" className="sr-only">
          Patonics International by the numbers
        </h2>
        <dl className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StatItem key={s.label} {...s} active={inView} delay={i * 120} />
          ))}
        </dl>
      </div>
    </section>
  );
}

function StatItem({
  value,
  label,
  suffix,
  note,
  active,
  delay,
}: {
  value: number;
  label: string;
  suffix: string;
  note: string;
  active: boolean;
  delay: number;
}) {
  const shown = useCountUp(value, active, 1500 + delay);

  return (
    <div className="relative pl-6">
      <span
        className="absolute left-0 top-1.5 h-[calc(100%-0.75rem)] w-px bg-gradient-to-b from-brand-green via-brand-green/30 to-transparent"
        aria-hidden
      />
      <dd className="font-display text-[clamp(2.6rem,1.8rem+2.4vw,3.9rem)] font-semibold leading-none tracking-tight text-white">
        {/*
          tabular-nums stops the digits jittering sideways while counting.
        */}
        <span className="tabular-nums">{shown}</span>
        {suffix && <span className="text-brand-green">{suffix}</span>}
      </dd>
      <dt className="mt-4 font-display text-base font-semibold text-brand-green">{label}</dt>
      <p className="mt-1.5 max-w-[16rem] text-[0.82rem] leading-relaxed text-white/50">{note}</p>
    </div>
  );
}
