export type Inquiry = {
  name: string;
  email: string;
  company: string;
  phone: string;
  category: string;
  country: string;
  message: string;
};
export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(v: Inquiry): InquiryErrors {
  const e: InquiryErrors = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  if (!v.email.trim()) e.email = "Please enter your business email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "Please enter a contact number.";
  else if (digits.length < 7 || digits.length > 15) e.phone = "Please enter a valid phone number.";
  if (!v.message.trim()) e.message = "Please tell us about your requirement.";
  return e;
}

export function buildInquiryMailto(v: Inquiry, to: string) {
  const subject = `Trade inquiry${v.category ? ` – ${v.category}` : ""} from ${v.name.trim()}`;
  const body = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Company: ${v.company || "-"}`,
    `Phone: ${v.phone}`,
    `Product category: ${v.category || "-"}`,
    `Destination country: ${v.country || "-"}`,
    "",
    v.message,
  ].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
