import type { ElementType, ReactNode } from "react";
import { useInView } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

/**
 * Fades and lifts its children in when they first reach the viewport.
 * `delay` staggers siblings; keep it under ~400ms so nothing feels slow.
 *
 * Without JavaScript the `.reveal` rule is cancelled by a <noscript> style in
 * the document head, so content is never left invisible.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale" | "fade";
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={cn("reveal", `reveal-${variant}`, inView && "reveal-in", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
