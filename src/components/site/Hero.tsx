import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-commodities.jpg";

/** A plain opening: one photograph, one line, two actions. */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[78svh] items-center overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 -z-10" aria-hidden>
        <img
          src={heroImg}
          alt=""
          width={1280}
          height={1440}
          fetchPriority="high"
          decoding="async"
          className="animate-kenburns size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
      </div>

      <div className="container-site pb-20 pt-32 md:pt-36">
        <div className="max-w-2xl">
          <p className="eyebrow animate-rise text-brand-green">Since 1983 · Gujarat, India</p>
          <h1
            id="hero-title"
            className="headline-display animate-rise mt-6 text-white [animation-delay:90ms]"
          >
            Pure Indian spices, <span className="italic text-brand-green">farm to fork</span>.
          </h1>
          <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-white/75 [animation-delay:180ms]">
            Red chilli, turmeric, cumin and coriander, milled and packed in Gujarat for kitchens and
            brands around the world.
          </p>
          <div className="animate-rise mt-9 flex flex-col gap-3 [animation-delay:260ms] sm:flex-row">
            <Button asChild variant="onInk" size="2xl">
              <Link to="/products">
                View our spices <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="inkOutline" size="2xl">
              <Link to="/contact">Send an inquiry</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
