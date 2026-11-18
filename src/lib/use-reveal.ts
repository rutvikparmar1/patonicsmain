import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Reports when an element first scrolls into view. Fires once and then stops
 * observing, so sections animate on approach rather than all on page load.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

/**
 * Counts from zero up to `target` once `active` turns true. Years are counted
 * from a near offset instead of zero, so "1983" does not spin through four digits.
 */
export function useCountUp(target: number, active: boolean, durationMs = 1400) {
  const isYear = target > 1000;
  const from = isYear ? target - 60 : 0;
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic: fast at first, settles on the final number.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, from, durationMs]);

  return value;
}

/** Tracks how far the page has been scrolled, as a 0-1 fraction. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

/**
 * Returns the id of the section currently filling the viewport, for nav
 * highlighting. Ids are read in document order; the last one past the
 * threshold wins.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);

  return active;
}
