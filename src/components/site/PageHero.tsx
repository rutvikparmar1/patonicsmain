import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

/**
 * The band every interior page opens with. Carries the breadcrumb, the page's
 * single h1 and an optional lead, so the pages stay consistent with each other
 * and the home page keeps its own full-bleed hero.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-12 md:pb-20 md:pt-16">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div
        className="absolute -right-24 -top-24 size-[26rem] rounded-full bg-brand-green/10 blur-3xl"
        aria-hidden
      />

      <div className="container-site relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[0.8rem] text-white/50">
            <li>
              <Link
                to="/"
                className="transition-colors hover:text-brand-green focus-visible:text-brand-green focus-visible:outline-none"
              >
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5 opacity-60" />
            </li>
            <li aria-current="page" className="text-white/85">
              {eyebrow}
            </li>
          </ol>
        </nav>

        <h1 className="headline-display mt-7 max-w-3xl text-white">{title}</h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/60">{lead}</p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}
