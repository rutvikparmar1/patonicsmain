import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactElement,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, CONTACT, SELECT_CATEGORY_EVENT, telHref, waHref } from "@/lib/site-data";
import {
  buildInquiryMailto,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
} from "@/lib/inquiry";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./SectionHeading";

const EMPTY: Inquiry = {
  name: "",
  email: "",
  company: "",
  phone: "",
  category: "",
  country: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<Inquiry>(EMPTY);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "handed-off">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onSelect = (e: Event) =>
      setForm((f) => ({ ...f, category: (e as CustomEvent<string>).detail }));
    window.addEventListener(SELECT_CATEGORY_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_CATEGORY_EVENT, onSelect);
  }, []);

  const set = (k: keyof Inquiry) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const found = validateInquiry(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // No server-side delivery is configured yet: hand the inquiry to the
    // visitor's email app, addressed to the trade inbox.
    setStatus("sending");
    window.location.href = buildInquiryMailto(form, CONTACT.emails[0] ?? "trade@patonics.in");
    setTimeout(() => setStatus("handed-off"), 800);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 bg-background py-20 md:py-28"
    >
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h2 id="contact-title" className="headline-section mt-5 text-ink">
              Send us an enquiry
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-muted-foreground">
              Give us the product, grade, quantity and destination port. Our trade desk will reply
              with what we can do and what it costs.
            </p>
          </Reveal>

          <Reveal delay={90}>
            <dl className="mt-10 space-y-7">
              <ContactRow icon={MapPin} label="Address">
                <address className="not-italic">
                  {CONTACT.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </ContactRow>
              <ContactRow icon={Phone} label="Phone">
                {CONTACT.phones.map((p) => (
                  <a
                    key={p}
                    href={telHref(p)}
                    className="block w-fit transition-colors hover:text-brand-green-deep focus-visible:outline-none focus-visible:underline"
                  >
                    {p}
                  </a>
                ))}
              </ContactRow>
              <ContactRow icon={Mail} label="Email">
                {CONTACT.emails.map((m) => (
                  <a
                    key={m}
                    href={`mailto:${m}`}
                    className="block w-fit transition-colors hover:text-brand-green-deep focus-visible:outline-none focus-visible:underline"
                  >
                    {m}
                  </a>
                ))}
              </ContactRow>
              <ContactRow icon={Clock} label="Working hours">
                {CONTACT.hours}
              </ContactRow>
            </dl>

            <Button asChild variant="brandOutline" size="xl" className="mt-9 w-full sm:w-auto">
              <a href={waHref(CONTACT.phones[0] ?? "")} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden />
                Message us on WhatsApp
              </a>
            </Button>
          </Reveal>
        </div>

        <Reveal variant="right" delay={60} className="lg:col-span-7">
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            className="rounded-[2rem] border border-sand-line bg-surface p-6 shadow-soft sm:p-10"
            aria-labelledby="form-title"
          >
            <h3 id="form-title" className="font-display text-[1.6rem] font-semibold text-ink">
              Send an inquiry
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">Fields marked * are required.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" required error={errors.name}>
                <input
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={set("name")}
                  className={inputCls(errors.name)}
                />
              </Field>
              <Field label="Business email" name="email" required error={errors.email}>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={set("email")}
                  className={inputCls(errors.email)}
                />
              </Field>
              <Field label="Company name" name="company">
                <input
                  name="company"
                  autoComplete="organization"
                  value={form.company}
                  onChange={set("company")}
                  className={inputCls()}
                />
              </Field>
              <Field label="Contact number" name="phone" required error={errors.phone}>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  className={inputCls(errors.phone)}
                />
              </Field>
              <Field label="Product category" name="category">
                <select
                  name="category"
                  value={form.category}
                  onChange={set("category")}
                  className={inputCls()}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Destination country" name="country">
                <input
                  name="country"
                  autoComplete="country-name"
                  value={form.country}
                  onChange={set("country")}
                  className={inputCls()}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Your requirement" name="message" required error={errors.message}>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Product, grade, quantity, packing and destination port."
                    value={form.message}
                    onChange={set("message")}
                    className={cn(inputCls(errors.message), "h-auto py-3.5")}
                  />
                </Field>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                Your details are used only to respond to this inquiry.
              </p>
              <Button type="submit" variant="brand" size="xl" disabled={status === "sending"}>
                {status === "sending" ? "Opening email…" : "Submit inquiry"}
                <Send
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Button>
            </div>

            <div aria-live="polite" className="mt-5">
              {Object.keys(errors).length > 0 && (
                <p className="flex items-center gap-2 text-sm font-medium text-destructive">
                  <AlertCircle className="size-4" aria-hidden /> Please correct the highlighted
                  fields.
                </p>
              )}
              {status === "handed-off" && (
                <p className="flex items-start gap-2.5 rounded-xl bg-brand-green-soft p-4 text-sm text-ink">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-brand-green-deep"
                    aria-hidden
                  />
                  <span>
                    Your email app should now show this inquiry addressed to {CONTACT.emails[0]} —
                    press send there to deliver it. If nothing opened, email us directly at{" "}
                    <a className="font-semibold underline" href={`mailto:${CONTACT.emails[0]}`}>
                      {CONTACT.emails[0]}
                    </a>
                    .
                  </span>
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function inputCls(error?: string) {
  return cn(
    "h-12 w-full rounded-xl border border-sand-line bg-background px-4 text-[0.95rem] text-ink transition-colors placeholder:text-muted-foreground/70 focus-visible:border-brand-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25",
    error && "border-destructive",
  );
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean | undefined;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 [&_input]:aria-invalid:border-destructive">
      <label htmlFor={`f-${name}`} className="text-sm font-medium text-ink">
        {label}{" "}
        {required && (
          <span className="text-destructive" aria-hidden>
            *
          </span>
        )}
      </label>
      <FieldControl name={name} required={required} error={error}>
        {children}
      </FieldControl>
      {error && (
        <p id={`f-${name}-err`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function FieldControl({
  name,
  required,
  error,
  children,
}: {
  name: string;
  required?: boolean | undefined;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  if (!isValidElement(children)) return <>{children}</>;
  return cloneElement(children as ReactElement<Record<string, unknown>>, {
    id: `f-${name}`,
    "aria-required": required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `f-${name}-err` : undefined,
  });
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green-deep">
        <Icon className="size-5" strokeWidth={1.7} aria-hidden />
      </span>
      <div>
        <dt className="eyebrow text-[0.68rem] text-muted-foreground">{label}</dt>
        <dd className="mt-1.5 space-y-0.5 font-medium leading-relaxed text-ink">{children}</dd>
      </div>
    </div>
  );
}
