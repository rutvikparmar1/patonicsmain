import type { ReactNode } from "react";

/**
 * Long-form text column for the policy pages. Capped at a readable measure and
 * styled through descendant selectors so the page bodies stay plain markup.
 */
export function Prose({ updated, children }: { updated: string; children: ReactNode }) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-site">
        <div
          className={[
            "max-w-[68ch]",
            // No `first:` reset here: `first:[&>h2]:mt-0` compiles to
            // `.container:first-child > h2`, which matches every h2 and wins on
            // specificity, flattening the spacing. The first child is the
            // "Last updated" line anyway, so the gap is wanted.
            "[&>h2]:mt-12 [&>h2]:font-display [&>h2]:text-[1.35rem] [&>h2]:font-bold [&>h2]:text-ink",
            "[&>h3]:mt-8 [&>h3]:font-display [&>h3]:text-[1.05rem] [&>h3]:font-bold [&>h3]:text-ink",
            "[&>p]:mt-4 [&>p]:text-[0.98rem] [&>p]:leading-relaxed [&>p]:text-muted-foreground",
            "[&>ul]:mt-4 [&>ul]:space-y-2.5 [&>ul]:text-[0.98rem] [&>ul]:leading-relaxed [&>ul]:text-muted-foreground",
            "[&>ul>li]:relative [&>ul>li]:pl-6",
            "[&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-[0.6em] [&>ul>li]:before:size-1.5 [&>ul>li]:before:rounded-full [&>ul>li]:before:bg-brand-green",
            "[&_a]:font-medium [&_a]:text-brand-green-deep [&_a]:underline [&_a]:underline-offset-2",
          ].join(" ")}
        >
          <p className="eyebrow !mt-0 text-[0.64rem] text-muted-foreground">
            Last updated {updated}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}
