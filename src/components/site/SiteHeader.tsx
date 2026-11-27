import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT, DIVISIONS, NAV, PRODUCTS, productLabel, telHref, waHref } from "@/lib/site-data";
import logo from "@/assets/patonics-logo-ftf.webp";

/**
 * A floating bar rather than a strip: one rounded, solid surface that holds
 * the logo, the nav as pills and the two contact actions. The thin dark
 * utility strip and hairline underlines it replaces read as flimsy.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMega(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const openMega = () => {
    clearTimeout(timer.current);
    setMega(true);
  };
  const closeMega = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMega(false), 140);
  };

  const phone = CONTACT.phones[0] ?? "";

  return (
    <header
      className={cn(
        // The negative bottom margin equals the header's own height, so the
        // first section starts at the very top and the bar floats over it
        // instead of sitting on a white band.
        "sticky top-0 z-50 -mb-[84px] transition-[padding] duration-300 lg:-mb-24",
        scrolled ? "pt-2" : "pt-3 lg:pt-4",
      )}
    >
      <div className="container-site">
        <div className="relative sm:-mx-3 lg:-mx-5">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-2xl border px-4 transition-all duration-300 sm:px-5 lg:rounded-[1.4rem]",
              scrolled
                ? "h-16 border-ink/10 bg-white/85 shadow-lift backdrop-blur-xl"
                : "h-[72px] border-ink/[0.07] bg-white shadow-soft lg:h-20",
            )}
          >
            <Link
              to="/"
              className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Patonics International — home"
            >
              <img
                src={logo}
                alt="Patonics International"
                width={600}
                height={416}
                className={cn(
                  "w-auto transition-[height] duration-300",
                  scrolled ? "h-12" : "h-14 xl:h-16",
                )}
              />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-0.5 rounded-full bg-surface p-1">
                {NAV.map((item) => {
                  const active =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  const isProducts = item.href === "/products";
                  return (
                    <li
                      key={item.label}
                      {...(isProducts ? { onMouseEnter: openMega, onMouseLeave: closeMega } : {})}
                    >
                      <Link
                        to={item.href}
                        aria-current={active ? "page" : undefined}
                        aria-expanded={isProducts ? mega : undefined}
                        onFocus={isProducts ? openMega : undefined}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-3 py-2 text-[0.9rem] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:px-4",
                          active
                            ? "bg-ink text-white shadow-soft"
                            : "text-ink/70 hover:bg-white hover:text-ink",
                        )}
                      >
                        {item.label}
                        {isProducts && (
                          <ChevronDown
                            className={cn("size-3.5 transition-transform", mega && "rotate-180")}
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
              <a
                href={telHref(phone)}
                className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink/80 transition-colors hover:bg-surface hover:text-ink 2xl:inline-flex"
              >
                <Phone className="size-4 text-brand-green-deep" aria-hidden />
                {phone}
              </a>
              <a
                href={waHref(phone)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="hidden size-11 items-center justify-center rounded-full bg-[#25D366] text-ink transition-transform hover:-translate-y-0.5 sm:inline-flex"
              >
                <MessageCircle className="size-5" aria-hidden />
              </a>
              <Link
                to="/contact"
                className="group hidden h-11 items-center gap-2 rounded-full bg-brand-green-deep px-5 text-sm font-bold text-white shadow-soft transition-colors hover:bg-ink sm:inline-flex"
              >
                Send Inquiry
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-ink transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>

          {/* Products mega panel, as a card under the bar. */}
          <div
            hidden={!mega}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            className="absolute inset-x-0 top-full z-10 hidden pt-2 lg:block"
          >
            <div className="grid gap-8 rounded-[1.4rem] border border-ink/[0.07] bg-white p-8 shadow-deep lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="eyebrow text-[0.64rem] text-brand-green-deep">Spice Range</p>
                <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
                  {PRODUCTS.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/products/$slug"
                        params={{ slug: p.slug }}
                        className="group flex items-center gap-3 rounded-xl p-1.5 text-sm font-medium text-ink/80 transition-colors hover:bg-surface hover:text-ink"
                      >
                        <img
                          src={p.image}
                          alt=""
                          width={1000}
                          height={1000}
                          className="size-9 shrink-0 object-contain"
                        />
                        {productLabel(p)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-5 lg:border-l lg:border-sand-line lg:pl-8">
                <p className="eyebrow text-[0.64rem] text-brand-green-deep">Business Divisions</p>
                <ul className="mt-4 space-y-1">
                  {DIVISIONS.map((d) => (
                    <li key={d.id}>
                      <Link
                        to="/divisions"
                        hash={d.id}
                        className="block rounded-xl px-3 py-2 transition-colors hover:bg-surface"
                      >
                        <span className="block text-sm font-semibold text-ink">{d.name}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {d.tagline}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/packaging"
                  className="mt-4 flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-deep"
                >
                  Packaging options <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile sheet, as a card under the bar. */}
          <div
            id="mobile-nav"
            hidden={!open}
            className="absolute inset-x-0 top-full pt-2 lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="max-h-[calc(100svh-6rem)] overflow-y-auto rounded-2xl border border-ink/[0.07] bg-white p-4 shadow-deep"
            >
              <ul className="grid grid-cols-2 gap-2">
                {NAV.map((item) => {
                  const active =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3.5 text-[0.95rem] font-semibold",
                          active ? "bg-ink text-white" : "bg-surface text-ink",
                        )}
                      >
                        {item.label}
                        <ArrowRight className="size-4 opacity-60" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={telHref(phone)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-sand-line py-3 text-sm font-semibold text-ink"
                >
                  <Phone className="size-4 text-brand-green-deep" aria-hidden /> Call
                </a>
                <a
                  href={waHref(phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-ink"
                >
                  <MessageCircle className="size-4" aria-hidden /> WhatsApp
                </a>
              </div>
              <Link
                to="/contact"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-green-deep py-3.5 text-sm font-bold text-white"
              >
                Send Inquiry <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a
                href={`mailto:${CONTACT.emails[0]}`}
                className="mt-3 flex items-center justify-center gap-2 py-1 text-sm text-ink/70"
              >
                <Mail className="size-4" aria-hidden /> {CONTACT.emails[0]}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
