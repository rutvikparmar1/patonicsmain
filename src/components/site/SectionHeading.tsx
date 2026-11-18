import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  invert = false,
  center = false,
  className,
}: {
  children: ReactNode;
  invert?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        invert ? "text-brand-green" : "text-brand-green-deep",
        center && "justify-center",
        className,
      )}
    >
      <span className={cn("h-px w-10", invert ? "bg-brand-green/60" : "bg-gold")} aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  invert = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  id: string;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <Eyebrow invert={invert} center={align === "center"}>
        {eyebrow}
      </Eyebrow>
      <h2 id={id} className={cn("headline-section mt-5", invert ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-[1.05rem] leading-relaxed",
            invert ? "text-white/65" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
