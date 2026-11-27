import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT, DIVISIONS, NAV, telHref } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import logo from "@/assets/patonics-logo-ftf.webp";

export function CtaBanner() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-ink py-20 md:py-28">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div
        className="absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/12 blur-3xl"
        aria-hidden
      />
      <div className="absolute inset-0 grain-layer" aria-hidden />

      <Reveal className="container-site relative text-center">
        <p className="eyebrow flex items-center justify-center gap-3 text-brand-green">
          <span className="h-px w-10 bg-gold" aria-hidden />
          Enquiries
        </p>
        <h2 id="cta-title" className="headline-display mx-auto mt-7 max-w-4xl text-white">
          Tell us what you need
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-white/60">
          Send the product, quantity and destination port. We will say whether we can supply it and
          at what price.
        </p>
        <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="onInk" size="2xl">
            <Link to="/contact">
              Send your inquiry
              <ArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Button>
          <Button asChild variant="inkOutline" size="2xl">
            <a href={telHref(CONTACT.phones[0] ?? "")}>
              <Phone aria-hidden />
              {CONTACT.phones[0]}
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

const linkCls =
  "text-sm text-white/55 transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:text-brand-green";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink pt-16 text-white">
      <div className="container-site grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="inline-block rounded-xl bg-white p-3">
            <img
              src={logo}
              alt="Patonics International"
              width={600}
              height={416}
              loading="lazy"
              className="h-20 w-auto"
            />
          </div>
          {/* The registered name already ends in a full stop, so none is added here. */}
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
            {CONTACT.company} connects Indian products with international opportunities through
            quality-focused trade and lasting partnerships.
          </p>
          <p className="eyebrow mt-7 text-[0.64rem] text-brand-green">ISO 9001:2015 Certified</p>
        </div>

        <FooterCol title="Quick Links" className="lg:col-span-2">
          {NAV.map((n) => (
            <li key={n.label}>
              <Link to={n.href} className={linkCls}>
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/faq" className={linkCls}>
              Buyer FAQ
            </Link>
          </li>
        </FooterCol>

        <FooterCol title="Divisions" className="lg:col-span-3">
          {DIVISIONS.map((d) => (
            <li key={d.id}>
              <Link to="/divisions" className={linkCls}>
                {d.name}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Contact" className="lg:col-span-3">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden />
            <address className="text-sm not-italic leading-relaxed text-white/55">
              {CONTACT.addressLines.join(", ")}
            </address>
          </li>
          {CONTACT.phones.map((p) => (
            <li key={p} className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden />
              <a href={telHref(p)} className={linkCls}>
                {p}
              </a>
            </li>
          ))}
          {CONTACT.emails.map((m) => (
            <li key={m} className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden />
              <a href={`mailto:${m}`} className={linkCls}>
                {m}
              </a>
            </li>
          ))}
        </FooterCol>
      </div>

      <div className="border-t border-white/10">
        {/* Extra bottom padding clears the fixed mobile action bar. */}
        <div className="container-site flex flex-col gap-4 py-6 pb-24 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>
            © {new Date().getFullYear()} {CONTACT.company} All rights reserved.
          </p>
          <a
            href="#main"
            className="inline-flex w-fit items-center gap-2 transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:text-brand-green"
          >
            Back to top
            <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="eyebrow text-[0.64rem] text-brand-green">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}
