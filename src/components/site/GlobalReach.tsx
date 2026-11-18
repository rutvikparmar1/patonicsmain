import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COUNTRIES, MAP_H, MAP_W, project } from "@/lib/world-map";
import { ORIGIN, PINS, SEA_LANES, SERVED_COUNTRIES, smoothPath } from "@/lib/trade-lanes";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./SectionHeading";
import { CargoPlaneIcon, ContainerShipIcon, ContainerTruckIcon } from "./FreightIcons";

const [OX, OY] = project(ORIGIN.lon, ORIGIN.lat);

const MODES = [
  {
    icon: ContainerTruckIcon,
    title: "Inland haulage",
    text: "From the mandi and the processing floor to Mundra and Kandla by road. Containers are stuffed and sealed under supervision before they leave.",
    meta: "Gujarat · road",
  },
  {
    icon: ContainerShipIcon,
    title: "Ocean freight",
    text: "FCL and LCL on the lanes above: westbound through Suez, into the Gulf through Hormuz, eastbound through Malacca.",
    meta: "10 markets · FCL / LCL",
  },
  {
    icon: CargoPlaneIcon,
    title: "Air freight",
    text: "Fruit, vegetables and cut flowers will not keep for a sea crossing, so they go by air instead.",
    meta: "Perishables · direct",
  },
] as const;

export function GlobalReach() {
  const [active, setActive] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const activePin = PINS.find((p) => p.market === active) ?? null;

  // A whole world squeezed into 390px is unreadable, so on phones the map keeps
  // a usable width and pans sideways instead. Start it on Gujarat rather than
  // on the empty Pacific.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth;
    if (overflow > 0) {
      el.scrollLeft = Math.min(
        overflow,
        Math.max(0, (OX / MAP_W) * el.scrollWidth - el.clientWidth / 2),
      );
    }
  }, []);

  return (
    <section
      id="reach"
      aria-labelledby="reach-title"
      className="scroll-mt-24 overflow-hidden bg-background py-20 md:py-28"
    >
      <div className="container-site">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Export Markets</Eyebrow>
            <h2 id="reach-title" className="headline-section mt-5 text-ink">
              Where our containers go
            </h2>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
              Ten markets across four continents. Each line is the route a container takes out of
              Gujarat: west through the Red Sea and Suez, into the Gulf through Hormuz, east through
              the Strait of Malacca.
            </p>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-5">
            <dl className="grid grid-cols-3 gap-6 border-t border-sand-line pt-7 lg:border-t-0 lg:pt-0">
              {[
                ["10", "Export markets"],
                ["2", "Home ports"],
                ["3", "Freight modes"],
              ].map(([n, label]) => (
                <div key={label}>
                  <dd className="font-display text-[2.2rem] font-semibold leading-none text-ink">
                    {n}
                  </dd>
                  <dt className="mt-2 text-[0.78rem] leading-snug text-muted-foreground">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed: the map is the point of this section, so it runs edge to edge. */}
      <Reveal variant="fade" className="mt-12 md:mt-16">
        <div ref={scroller} className="relative overflow-x-auto md:overflow-x-visible">
          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="w-full min-w-[760px] md:min-w-0"
            role="img"
            aria-label="World map showing Patonics International's shipping lanes from Mundra and Kandla in Gujarat to export markets in North America, Europe, the Middle East, Africa, South Asia, East Asia and Oceania"
          >
            <defs>
              {/*
                userSpaceOnUse so one gradient runs across the whole map. The
                default would restart it inside every country's bounding box.
              */}
              {/*
                One gradient, left to right, across every landmass. Colouring
                only the served countries and leaving the rest near-white broke
                the map into scattered blobs; a single sweep reads as one
                designed object, and the pins carry which markets are live.
              */}
              <linearGradient
                id="land"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2={MAP_W}
                y2="0"
              >
                <stop offset="0%" stopColor="oklch(0.72 0.175 142)" />
                <stop offset="34%" stopColor="oklch(0.685 0.148 172)" />
                <stop offset="64%" stopColor="oklch(0.645 0.132 205)" />
                <stop offset="100%" stopColor="oklch(0.6 0.162 243)" />
              </linearGradient>
              <radialGradient id="originGlow">
                <stop offset="0%" stopColor="oklch(0.2 0.05 150 / 0.4)" />
                <stop offset="100%" stopColor="oklch(0.2 0.05 150 / 0)" />
              </radialGradient>
              {/* Lifts the pins and the moving freight off the coloured land. */}
              <filter id="pinLift" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow
                  dx="0"
                  dy="1.1"
                  stdDeviation="1.4"
                  floodColor="oklch(0.17 0.02 155)"
                  floodOpacity="0.4"
                />
              </filter>
            </defs>

            {/*
              Every country takes the same gradient. Active markets sit at full
              strength and the rest step back on opacity alone, so the map stays
              one piece of colour instead of a scatter of highlights.
            */}
            <g strokeLinejoin="round" fill="url(#land)">
              {COUNTRIES.map((c) => {
                if (c.name === "India") return null;
                return (
                  <path
                    key={c.name}
                    d={c.d}
                    fillOpacity={SERVED_COUNTRIES.has(c.name) ? 1 : 0.72}
                    stroke="white"
                    strokeWidth="0.5"
                  />
                );
              })}
            </g>

            <circle cx={OX} cy={OY} r="52" fill="url(#originGlow)" />

            {/* India last and darkest, so it reads as the origin at a glance. */}
            {COUNTRIES.filter((c) => c.name === "India").map((c) => (
              <path
                key={c.name}
                d={c.d}
                fill="oklch(0.3 0.075 152)"
                stroke="white"
                strokeWidth="0.5"
              />
            ))}

            {/* Sea lanes */}
            <g fill="none" strokeLinecap="round">
              {SEA_LANES.map((lane) => {
                const on = active === lane.market;
                return (
                  <path
                    key={lane.id}
                    id={`lane-${lane.id}`}
                    d={smoothPath(lane.points)}
                    stroke={on ? "var(--ink)" : "oklch(0.175 0.018 155 / 0.42)"}
                    strokeWidth={on ? 2.1 : 1.2}
                    strokeDasharray="5 3.5"
                    className="animate-route transition-all duration-300 motion-reduce:animate-none"
                    style={{ animationDelay: `${lane.points.length * 70}ms` }}
                  />
                );
              })}
            </g>

            {/*
              Pins only. Ten permanent labels turned the map into a noticeboard;
              the lane list underneath names every market, and the one you point
              at names itself.
            */}
            <g filter="url(#pinLift)">
              {PINS.map((p) => {
                const [x, y] = project(p.lon, p.lat);
                const on = active === p.market;
                return (
                  <g
                    key={p.market}
                    onMouseEnter={() => setActive(p.market)}
                    onMouseLeave={() => setActive(null)}
                    transform={`translate(${x} ${y}) scale(${on ? 0.82 : 0.66})`}
                    className="cursor-default transition-transform duration-300"
                  >
                    <path
                      d="M0 0c0 0 8-9.5 8-14.5A8 8 0 1 0-8-14.5C-8-9.5 0 0 0 0Z"
                      fill={on ? "oklch(0.3 0.075 152)" : "var(--ink)"}
                      className="transition-colors duration-300"
                    />
                    <circle cy="-14.5" r="3.1" fill={on ? "var(--brand-green)" : "white"} />
                  </g>
                );
              })}
            </g>

            {/* Label for whichever market is being pointed at, drawn above the pins. */}
            {activePin && <MarketLabel pin={activePin} />}

            {/* Origin */}
            <g>
              <circle
                cx={OX}
                cy={OY}
                r="7"
                fill="var(--brand-green)"
                fillOpacity="0.35"
                className="animate-ping-ring motion-reduce:animate-none"
                style={{ transformOrigin: `${OX}px ${OY}px` }}
              />
              <circle
                cx={OX}
                cy={OY}
                r="4.5"
                fill="var(--brand-green-deep)"
                stroke="white"
                strokeWidth="1.6"
              />
            </g>
          </svg>
        </div>
      </Reveal>

      <div className="container-site">
        {/* Lane index. Doubles as the map legend on phones, where the labels are hidden. */}
        <Reveal delay={60} className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {SEA_LANES.map((lane) => (
              <li key={lane.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(lane.market)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(lane.market)}
                  onBlur={() => setActive(null)}
                  className={cn(
                    "cursor-default rounded-full border px-3.5 py-2 text-[0.8rem] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active === lane.market
                      ? "border-ink bg-ink text-white"
                      : "border-sand-line bg-surface text-ink/75 hover:border-brand-green",
                  )}
                >
                  <span className="font-semibold">{lane.market}</span>
                  <span
                    className={cn(
                      "ml-2",
                      active === lane.market ? "text-white/60" : "text-muted-foreground",
                    )}
                  >
                    {lane.port} · via {lane.via}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The three ways freight actually leaves. */}
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.6rem] border border-sand-line bg-sand-line md:grid-cols-3">
          {MODES.map(({ icon: Icon, title, text, meta }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 90}
              className="group bg-background p-8 transition-colors duration-500 hover:bg-surface md:p-9"
            >
              <Icon className="h-14 w-auto text-ink transition-colors duration-500 group-hover:text-brand-green-deep" />
              <p className="eyebrow mt-7 text-[0.64rem] text-gold-deep">{meta}</p>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-muted-foreground">{text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal
          delay={60}
          className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Give us your destination port and we will quote the lane, the transit time and the
            landed cost.
          </p>
          <Button asChild variant="brand" size="xl" className="shrink-0">
            <Link to="/contact">
              Start a trade inquiry
              <ArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The hovered market's name, as a chip beside its pin. SVG cannot measure text,
 * so the plate is sized from the character count — generous enough that the
 * longest name ("South Asia") still has padding.
 */
function MarketLabel({ pin }: { pin: (typeof PINS)[number] }) {
  const [x, y] = project(pin.lon, pin.lat);
  const w = pin.market.length * 5.5 + 18;
  const right = pin.side === "right";
  const rx = right ? x + 9 : x - 9 - w;

  return (
    <g className="pointer-events-none" filter="url(#pinLift)">
      <rect x={rx} y={y - 29} width={w} height="18" rx="9" fill="var(--ink)" />
      <text
        x={rx + w / 2}
        y={y - 16.6}
        textAnchor="middle"
        fontSize="9.5"
        className="fill-white font-sans font-bold"
      >
        {pin.market}
      </text>
    </g>
  );
}
