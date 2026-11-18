import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Mail, Menu, Phone, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORIES, CONTACT, DIVISIONS, NAV, telHref } from "@/lib/site-data";
import logo from "@/assets/patonics-logo.webp";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const megaTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMega(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close both menus whenever the route changes, or they stay open over the
  // page you just navigated to.
  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  // Lock the page behind the mobile sheet so the body does not scroll under it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => () => clearTimeout(megaTimer.current), []);

  // A short close delay lets the pointer travel from the trigger into the panel.
  const openMega = () => {
    clearTimeout(megaTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMega(false), 140);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip: the details a trade buyer looks for first. */}
      <div
        className={cn(
          "hidden bg-ink text-white/70 transition-[max-height,opacity] duration-500 lg:block",
          scrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-12 opacity-100",
        )}
      >
        <div className="container-site flex h-10 items-center justify-between text-[0.78rem]">
          <p className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-brand-green" aria-hidden />
            ISO 9001:2015 certified
            <span className="mx-1 text-white/25">|</span>
            Trading since 1983
          </p>
          <div className="flex items-center gap-6">
            <a
              href={telHref(CONTACT.phones[0] ?? "")}
              className="flex items-center gap-2 transition-colors hover:text-brand-green"
            >
              <Phone className="size-3.5" aria-hidden />
              {CONTACT.phones[0]}
            </a>
            <a
              href={`mailto:${CONTACT.emails[0]}`}
              className="flex items-center gap-2 transition-colors hover:text-brand-green"
            >
              <Mail className="size-3.5" aria-hidden />
              {CONTACT.emails[0]}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-sand-line bg-background/90 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-background",
        )}
      >
        <div
          className={cn(
            "container-site flex items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-[68px]" : "h-[76px] lg:h-[88px]",
          )}
        >
          <Link
            to="/"
            className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Patonics International — home"
          >
            <img
              src={logo}
              alt="Patonics International"
              width={1024}
              height={292}
              className={cn(
                "w-auto transition-[height] duration-300",
                scrolled ? "h-10 lg:h-11" : "h-10 lg:h-14",
              )}
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {NAV.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const hasMega = item.href === "/products";
                return (
                  <li
                    key={item.label}
                    className="relative"
                    {...(hasMega ? { onMouseEnter: openMega, onMouseLeave: closeMega } : {})}
                  >
                    <Link
                      to={item.href}
                      aria-current={isActive ? "page" : undefined}
                      aria-expanded={hasMega ? mega : undefined}
                      onFocus={hasMega ? openMega : undefined}
                      className={cn(
                        "relative inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[0.9rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        "after:absolute after:inset-x-3.5 after:-bottom-px after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-green after:transition-transform after:duration-300 hover:after:scale-x-100",
                        isActive ? "text-ink after:scale-x-100" : "text-ink/65 hover:text-ink",
                      )}
                    >
                      {item.label}
                      {hasMega && (
                        <ChevronDown
                          className={cn(
                            "size-3.5 opacity-55 transition-transform duration-300",
                            mega && "rotate-180",
                          )}
                          aria-hidden
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="brand" className="hidden h-11 px-5 sm:inline-flex">
              <Link to="/contact">
                Send an Inquiry
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Button>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-sand-line text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Products mega panel: every category and division, one hover away. */}
        <div
          hidden={!mega}
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          className="absolute inset-x-0 top-full hidden border-b border-sand-line bg-background/97 shadow-lift backdrop-blur-xl lg:block"
        >
          <div className="container-site grid gap-10 py-9 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow text-[0.64rem] text-brand-green-deep">Agri Categories</p>
              <ul className="mt-5 grid grid-cols-3 gap-x-6 gap-y-1">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/contact"
                      search={{ category: c.name }}
                      className="group flex items-center justify-between gap-2 rounded-md py-1.5 text-sm text-ink/75 transition-colors hover:text-brand-green-deep focus-visible:text-brand-green-deep focus-visible:outline-none"
                    >
                      {c.name}
                      <ArrowRight
                        className="size-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <p className="eyebrow text-[0.64rem] text-brand-green-deep">Business Divisions</p>
              <ul className="mt-5 space-y-1">
                {DIVISIONS.map((d) => (
                  <li key={d.id}>
                    <Link
                      to="/divisions"
                      hash={d.id}
                      className="block rounded-lg px-3 py-2 transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
                    >
                      <span className="block text-sm font-semibold text-ink">{d.name}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {d.tagline}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100svh-68px)] overflow-y-auto border-t border-sand-line bg-background lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site py-5">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-sand-line/70 last:border-0">
                <Link
                  to={item.href}
                  className="flex items-center justify-between py-4 font-display text-lg font-bold text-ink focus-visible:text-brand-green-deep focus-visible:outline-none"
                >
                  {item.label}
                  <ArrowRight className="size-4 text-brand-green-deep" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-7 text-[0.64rem] text-muted-foreground">Categories</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/contact"
                  search={{ category: c.name }}
                  className="inline-flex rounded-full border border-sand-line bg-surface px-3 py-1.5 text-xs font-medium text-ink/75"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>

          <Button asChild variant="brand" size="xl" className="mt-7 w-full">
            <Link to="/contact">
              Send an Inquiry <ArrowRight aria-hidden />
            </Link>
          </Button>

          <div className="mt-6 space-y-2 border-t border-sand-line pt-6 text-sm">
            {CONTACT.phones.map((p) => (
              <a key={p} href={telHref(p)} className="flex items-center gap-3 py-1 text-ink/75">
                <Phone className="size-4 text-brand-green-deep" aria-hidden />
                {p}
              </a>
            ))}
            <a
              href={`mailto:${CONTACT.emails[0]}`}
              className="flex items-center gap-3 py-1 text-ink/75"
            >
              <Mail className="size-4 text-brand-green-deep" aria-hidden />
              {CONTACT.emails[0]}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
