import { useRef, useState, type FormEvent } from "react";
import { BadgeCheck, Droplets, Microscope, Phone, Plus, Ruler, ScanLine } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import {
  CONTACT,
  FAQS,
  LEADERSHIP,
  PRODUCTS,
  productLabel,
  telHref,
  waHref,
} from "@/lib/site-data";
import { COUNTRIES, MAP_H, MAP_W, project } from "@/lib/world-map";
import { PINS, SERVED_COUNTRIES } from "@/lib/trade-lanes";
import {
  buildInquiryMailto,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
} from "@/lib/inquiry";

function Head({ eyebrow, title, center }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : undefined}>
      <p className="eyebrow text-brand-green-deep">{eyebrow}</p>
      <h2 className="headline-section mt-4 text-ink">{title}</h2>
    </div>
  );
}

const CHECKS = [
  { icon: Droplets, label: "Moisture" },
  { icon: Ruler, label: "Grade & mesh" },
  { icon: ScanLine, label: "Foreign matter" },
  { icon: Microscope, label: "Colour & aroma" },
] as const;

export function QualityStrip() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container-site">
        <Reveal>
          <Head center eyebrow="Quality" title="Checked before it is packed" />
          <p className="mx-auto mt-5 flex max-w-xl items-center justify-center gap-2 text-muted-foreground">
            <BadgeCheck className="size-5 shrink-0 text-brand-green-deep" aria-hidden />
            ISO 9001:2015 certified quality system
          </p>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {CHECKS.map(({ icon: Icon, label }, i) => (
            <Reveal
              as="li"
              key={label}
              delay={i * 70}
              className="flex flex-col items-center rounded-[1.4rem] border border-sand-line p-6 text-center"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-green/15 text-brand-green-deep">
                <Icon className="size-6" aria-hidden />
              </span>
              <span className="mt-4 font-semibold text-ink">{label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ReachMap() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container-site">
        <Reveal>
          <Head center eyebrow="Global reach" title="From Gujarat to ten markets" />
        </Reveal>
        <Reveal delay={80}>
          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="mt-10 h-auto w-full"
            role="img"
            aria-label="World map with the markets Patonics ships to highlighted"
          >
            {COUNTRIES.map((c) => (
              <path
                key={c.name + c.d.length}
                d={c.d}
                className={SERVED_COUNTRIES.has(c.name) ? "fill-brand-green/70" : "fill-ink/[0.08]"}
              />
            ))}
            {PINS.map((p) => {
              const [x, y] = project(p.lon, p.lat);
              return <circle key={p.market} cx={x} cy={y} r={4.5} className="fill-ink" />;
            })}
            {(() => {
              const [x, y] = project(69.7, 22.8);
              return (
                <>
                  <circle cx={x} cy={y} r={11} className="fill-brand-blue/30" />
                  <circle cx={x} cy={y} r={5.5} className="fill-brand-blue" />
                </>
              );
            })()}
          </svg>
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {PINS.map((p) => (
              <li
                key={p.market}
                className="rounded-full border border-sand-line bg-surface px-4 py-1.5 text-sm text-ink"
              >
                {p.market}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section className="bg-surface py-20 md:py-24">
      <div className="container-site">
        <Reveal>
          <Head center eyebrow="Leadership" title="The people behind Patonics" />
        </Reveal>
        <ul className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          {LEADERSHIP.map((l, i) => (
            <Reveal
              as="li"
              key={l.name}
              delay={i * 80}
              className="flex items-start gap-5 rounded-[1.6rem] bg-background p-6"
            >
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-green-deep font-display text-xl font-semibold text-white">
                {l.initials}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">{l.name}</h3>
                <p className="text-sm text-brand-green-deep">{l.role}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {l.focus.map((f) => (
                    <li
                      key={f}
                      className="rounded-full bg-surface px-3 py-1 text-xs text-muted-foreground"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FaqList() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container-site max-w-3xl">
        <Reveal>
          <Head center eyebrow="FAQ" title="Questions buyers ask" />
        </Reveal>
        <div className="mt-10 divide-y divide-sand-line border-y border-sand-line">
          {FAQS.slice(1, 6).map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  className="size-5 shrink-0 text-brand-green-deep transition-transform group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const EMPTY: Inquiry = {
  name: "",
  email: "",
  company: "",
  phone: "",
  category: "",
  country: "",
  message: "",
};

const FIELDS = [
  { k: "name", label: "Full name", type: "text", auto: "name" },
  { k: "email", label: "Email", type: "email", auto: "email" },
  { k: "phone", label: "Phone", type: "tel", auto: "tel" },
] as const;

const inputCls =
  "mt-1.5 w-full rounded-xl border border-sand-line bg-surface px-4 py-3 text-ink outline-none focus:border-brand-green-deep focus:ring-2 focus:ring-brand-green/30 aria-[invalid=true]:border-red-600";

export function QuickContact() {
  const [form, setForm] = useState<Inquiry>(EMPTY);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const set = (k: keyof Inquiry) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateInquiry(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      ref.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    window.location.href = buildInquiryMailto(form, CONTACT.emails[0] ?? "trade@patonics.in");
    setSent(true);
  }

  const err = (k: keyof Inquiry) =>
    errors[k] ? (
      <p id={`qc-${k}-err`} className="mt-1 text-sm text-red-700">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Inquiry) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `qc-${k}-err` : undefined,
  });

  return (
    <section id="contact" className="scroll-mt-24 bg-surface py-20 md:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <Reveal>
          <Head eyebrow="Contact" title="Send us an enquiry" />
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Tell us the spice, pack size and quantity. We reply within one working day.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={waHref(CONTACT.phones[0] ?? "", "Hello Patonics, I have an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-ink lg:w-fit"
            >
              Chat on WhatsApp
            </a>
            <a
              href={telHref(CONTACT.phones[0] ?? "")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 px-6 font-semibold text-ink lg:w-fit"
            >
              <Phone className="size-4" aria-hidden /> {CONTACT.phones[0]}
            </a>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <form
            ref={ref}
            onSubmit={onSubmit}
            noValidate
            className="grid gap-4 rounded-[1.8rem] bg-background p-6 sm:grid-cols-2 md:p-8"
          >
            {FIELDS.map((f) => (
              <div key={f.k} className={f.k === "name" ? "sm:col-span-2" : undefined}>
                <label htmlFor={`qc-${f.k}`} className="text-sm font-medium text-ink">
                  {f.label}
                </label>
                <input
                  id={`qc-${f.k}`}
                  name={f.k}
                  type={f.type}
                  autoComplete={f.auto}
                  value={form[f.k]}
                  onChange={set(f.k)}
                  className={inputCls}
                  {...aria(f.k)}
                />
                {err(f.k)}
              </div>
            ))}
            <div className="sm:col-span-2">
              <label htmlFor="qc-category" className="text-sm font-medium text-ink">
                Product (optional)
              </label>
              <select
                id="qc-category"
                name="category"
                value={form.category}
                onChange={set("category")}
                className={inputCls}
              >
                <option value="">Choose a product</option>
                {PRODUCTS.map((p) => (
                  <option key={p.slug}>{productLabel(p)}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="qc-message" className="text-sm font-medium text-ink">
                Your requirement
              </label>
              <textarea
                id="qc-message"
                name="message"
                rows={4}
                value={form.message}
                onChange={set("message")}
                className={inputCls}
                {...aria("message")}
              />
              {err("message")}
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-brand-green-deep px-8 font-semibold text-white"
              >
                Send enquiry
              </button>
              {sent && (
                <p role="status" className="mt-3 text-sm text-muted-foreground">
                  Your email app should open with the enquiry ready to send.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
