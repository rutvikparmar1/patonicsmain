import cuminRoasted from "@/assets/products/cumin-powder-roasted.webp";
import coriander from "@/assets/products/coriander-powder.webp";
import cuminCoriander from "@/assets/products/cumin-coriander-powder.webp";
import cumin from "@/assets/products/cumin-powder.webp";
import turmeric from "@/assets/products/turmeric-powder.webp";
import chilliGholar from "@/assets/products/red-chilli-powder-gholar.webp";
import chilli from "@/assets/products/red-chilli-powder.webp";
import chilliKashmiri from "@/assets/products/red-chilli-powder-kashmiri.webp";
import turmericSalem from "@/assets/products/turmeric-powder-salem.webp";
import turmericRajapari from "@/assets/products/turmeric-powder-rajapari.webp";
import turmericKasturi from "@/assets/products/turmeric-powder-kasturi.webp";
import chilliReshampatta from "@/assets/products/red-chilli-powder-reshampatta.webp";

/** Product groups double as filter tabs on the products grid. */
export const PRODUCT_GROUPS = [
  { id: "all", label: "All" },
  { id: "chilli", label: "Red Chilli" },
  { id: "turmeric", label: "Turmeric" },
  { id: "cumin", label: "Cumin & Coriander" },
] as const;

export type ProductGroup = (typeof PRODUCT_GROUPS)[number]["id"];

/**
 * The ground-spice range, as packed.
 *
 * `variant` is the grade or growing region the pack is named for and is what
 * separates one chilli or turmeric from the next, so it is kept apart from
 * `name` rather than folded into it: the cards lead on the spice and the
 * filters group by it.
 *
 * Images are the supplied 500g pack shots, resized and converted to WebP with
 * their transparent background intact, which is why the packs can sit directly
 * on a section colour with no plate behind them.
 */
export const PRODUCTS = [
  {
    slug: "red-chilli-powder",
    name: "Red Chilli Powder",
    variant: null,
    group: "chilli",
    image: chilli,
    alt: "Patonics Red Chilli Powder 500g pack with a bowl of ground red chilli and whole chillies",
    blurb: "Everyday ground chilli, milled from dried red chillies.",
  },
  {
    slug: "red-chilli-powder-kashmiri",
    name: "Red Chilli Powder",
    variant: "Kashmiri",
    group: "chilli",
    image: chilliKashmiri,
    alt: "Patonics Kashmiri Red Chilli Powder 500g pack with a bowl of deep red powder and dried chillies",
    blurb:
      "Prized for colour rather than heat. The usual choice where a dish needs red without burn.",
  },
  {
    slug: "red-chilli-powder-reshampatta",
    name: "Red Chilli Powder",
    variant: "Reshampatta",
    group: "chilli",
    image: chilliReshampatta,
    alt: "Patonics Reshampatta Red Chilli Powder 500g pack with a bowl of powder and dried reshampatta chillies",
    blurb: "A Gujarat favourite. Moderate heat with a bright, even colour.",
  },
  {
    slug: "red-chilli-powder-gholar",
    name: "Red Chilli Powder",
    variant: "Gholar",
    group: "chilli",
    image: chilliGholar,
    alt: "Patonics Gholar Red Chilli Powder 500g pack with a bowl of powder and round gholar chillies",
    blurb: "Ground from the short, round gholar chilli. Fuller heat than Kashmiri.",
  },
  {
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    variant: null,
    group: "turmeric",
    image: turmeric,
    alt: "Patonics Turmeric Powder 500g pack with a plate of yellow powder and turmeric fingers",
    blurb: "Standard milled turmeric for everyday kitchen and food-service use.",
  },
  {
    slug: "turmeric-powder-salem",
    name: "Turmeric Powder",
    variant: "Salem",
    group: "turmeric",
    image: turmericSalem,
    alt: "Patonics Salem Turmeric Powder 500g pack with a plate of powder and turmeric fingers",
    blurb: "From the Salem belt in Tamil Nadu, the variety most asked for by name.",
  },
  {
    slug: "turmeric-powder-rajapari",
    name: "Turmeric Powder",
    variant: "Rajapari",
    group: "turmeric",
    image: turmericRajapari,
    alt: "Patonics Rajapari Turmeric Powder 500g pack with a plate of deep orange powder and turmeric root",
    blurb: "Deeper orange in the pack and in the pot.",
  },
  {
    slug: "turmeric-powder-kasturi",
    name: "Turmeric Powder",
    variant: "Kasturi",
    group: "turmeric",
    image: turmericKasturi,
    alt: "Patonics Kasturi Turmeric Powder 500g pack with a plate of powder and dried kasturi turmeric",
    blurb: "The aromatic kasturi variety, used more for fragrance than for colour.",
  },
  {
    slug: "cumin-powder",
    name: "Cumin Powder",
    variant: null,
    group: "cumin",
    image: cumin,
    alt: "Patonics Cumin Powder 500g pack with a bowl of ground cumin and whole cumin seeds",
    blurb: "Ground from clean, sortex-grade cumin seed.",
  },
  {
    slug: "cumin-powder-roasted",
    name: "Cumin Powder",
    variant: "Roasted",
    group: "cumin",
    image: cuminRoasted,
    alt: "Patonics Roasted Cumin Powder 500g pack with a bowl of dark roasted cumin powder and seeds",
    blurb: "Roasted before milling, which darkens the powder and deepens the aroma.",
  },
  {
    slug: "coriander-powder",
    name: "Coriander Powder",
    variant: null,
    group: "cumin",
    image: coriander,
    alt: "Patonics Coriander Powder 500g pack with a bowl of powder, coriander leaf and seeds",
    blurb: "Milled coriander seed, the base of most masala blends.",
  },
  {
    slug: "cumin-coriander-powder",
    name: "Cumin Coriander Powder",
    variant: null,
    group: "cumin",
    image: cuminCoriander,
    alt: "Patonics Cumin Coriander Powder 500g pack with a bowl of blended powder and seeds",
    blurb: "The dhana-jeeru blend, ground together to a set ratio.",
  },
] as const;

/** Full display name, for places that need the grade spelled out. */
export const productLabel = (p: { name: string; variant: string | null }) =>
  p.variant ? `${p.name} â€” ${p.variant}` : p.name;

/**
 * Pack formats offered across the range. Retail packs are the printed
 * consumer-facing bags shown on the product cards; bulk is supplied for
 * repackers, food service and private-label programmes.
 */
export const PACKAGING = {
  retail: ["50g", "100g", "200g", "500g", "1kg"],
  bulk: ["5kg", "25kg"],
} as const;

/**
 * The five business lines Patonics International was set up to supply.
 * Source: the company's own stated scope at incorporation.
 */
export const DIVISIONS = [
  {
    id: "agri",
    name: "Agri Commodities",
    tagline: "Ground spices under the Patonics label",
    text: "Our core business. Twelve ground-spice lines milled and packed in Gujarat for domestic and export buyers.",
    href: "#products",
    cta: "View the range",
  },
  {
    id: "agro",
    name: "Agro-Processed Products",
    tagline: "Dehydrated flakes, powders and value-added lines",
    text: "Processed formats for food manufacturers and private-label programmes, where shelf life and consistency matter more than season.",
    href: "#contact",
    cta: "Discuss a specification",
  },
  {
    id: "ceramics",
    name: "Ceramics",
    tagline: "Tiles, sanitaryware and allied products",
    text: "Supplied from the Morbi ceramic belt in Gujarat, close to our own base, with team experience across ceramic manufacturing.",
    href: "#contact",
    cta: "Request a catalogue",
  },
  {
    id: "textiles",
    name: "Textiles",
    tagline: "Cotton, yarn and allied textile products",
    text: "Backed by hands-on experience in ginning, spinning and sortex cleaning, built up over four decades in the cotton trade.",
    href: "#contact",
    cta: "Talk to our team",
  },
  {
    id: "paper",
    name: "Paper & Packaging",
    tagline: "Paper products and packaging materials",
    text: "Paper and packaging lines drawn from long-standing relationships inside the Indian paper industry.",
    href: "#contact",
    cta: "Send a requirement",
  },
] as const;

/*
 * Export markets now live in trade-lanes.ts, alongside the routes and the port
 * each one is served through.
 */

/** Headline figures used by the counter band. */
export const STATS = [
  {
    value: 1983,
    label: "Trading since",
    suffix: "",
    note: "Predecessor firm founded in Chachka, Gujarat",
  },
  {
    value: 12,
    label: "Spice lines",
    suffix: "",
    note: "Red chilli, turmeric, cumin and coriander",
  },
  {
    value: 10,
    label: "Markets served",
    suffix: "+",
    note: "Across North America, Europe, Asia and Africa",
  },
  {
    value: 5,
    label: "Business divisions",
    suffix: "",
    note: "Agri, agro-processed, ceramics, textiles, paper",
  },
] as const;

/** How an order moves from the growing region to the buyer's port. */
export const PROCESS = [
  {
    step: "01",
    title: "Sourcing",
    text: "We buy from growing regions and mandis we have worked in for decades, matching the crop to your specification.",
  },
  {
    step: "02",
    title: "Inspection & Grading",
    text: "Lots are checked and graded on moisture, size, colour and foreign matter before anything is committed.",
  },
  {
    step: "03",
    title: "Processing",
    text: "Cleaning, sortex, de-stoning, grading or dehydration, depending on the product and the format you need.",
  },
  {
    step: "04",
    title: "Quality Check",
    text: "A final check against the agreed parameters, with third-party inspection arranged on request.",
  },
  {
    step: "05",
    title: "Packing & Labelling",
    text: "Packed to your weight, bag and labelling requirements, including private-label and retail-ready formats.",
  },
  {
    step: "06",
    title: "Documents & Shipment",
    text: "Container stuffing and the full export document set, coordinated through Gujarat's ports.",
  },
] as const;

/** Company milestones shown as a vertical timeline in the about section. */
export const TIMELINE = [
  {
    year: "1983",
    title: "The beginning",
    text: "Patel Chamanbhai Mavjibhai & Co. is founded in Chachka Village, Gujarat, by Shri Chamanbhai Patel (Patidar).",
  },
  {
    year: "1983–2022",
    title: "Four decades in the field",
    text: "The family builds working depth across agricultural sourcing, farming, ginning, spinning, sortex cleaning, ceramics and paper.",
  },
  {
    year: "2023",
    title: "Patonics International",
    text: "Patonics International Trading Co. is established in Gujarat on 22 January 2023 by Mr. Nikunj Patel, to supply Indian and international markets.",
  },
  {
    year: "Today",
    title: "Twelve spice lines, ten markets",
    text: "An ISO 9001:2015 certified trading house spanning agri commodities, agro-processed goods, ceramics, textiles and paper.",
  },
] as const;

/** Named leadership, as described by the company. */
export const LEADERSHIP = [
  {
    name: "Nikunj Patel",
    role: "Founder",
    initials: "NP",
    text: "Established Patonics International Trading Co. in January 2023. Has led training seminars for farmers, ginners, spinning and sortex-cleaning operators and paper industry workers, and is active in social welfare work.",
    focus: ["Agri sourcing", "Ginning & spinning", "Farmer training"],
  },
  {
    name: "Harshid Kanetiya",
    role: "Partner",
    initials: "HK",
    text: "Trained across ceramics, paper and farming, with working experience in both manufacturing and export, and responsibility for the non-agri divisions.",
    focus: ["Ceramics", "Paper & packaging", "Manufacturing"],
  },
] as const;

/**
 * Buyer questions. Answers deliberately avoid quoting fixed commercial terms,
 * which are confirmed per enquiry rather than published.
 */
export const FAQS = [
  {
    q: "What can you supply, and in what volumes?",
    a: "Twelve ground-spice lines plus ceramics, textiles, and paper and packaging. Retail packs run 50g to 1kg and bulk is 5kg and 25kg. Volumes are quoted per enquiry, from part-container trial orders through to repeat full-container programmes.",
  },
  {
    q: "Can we see samples before we commit?",
    a: "Yes. Pre-shipment samples against your written specification are the normal first step, and we will agree the parameters the lot is judged on before anything ships.",
  },
  {
    q: "Which Incoterms and payment terms do you work on?",
    a: "We quote on the common export terms, including FOB and CFR from Indian ports. Payment terms are agreed per contract and per buyer relationship, so share your preference with your enquiry and we will respond to it directly.",
  },
  {
    q: "How are goods packed and labelled?",
    a: "Packing follows your requirement: jute or PP bags, cartons, or retail-ready and private-label packs. Weights, bag marking and labelling are set out in the contract before production begins.",
  },
  {
    q: "What quality assurance is in place?",
    a: "We operate a quality management system certified to ISO 9001:2015, with in-house inspection and grading at the sourcing stage. Independent third-party inspection can be arranged at your cost and nomination.",
  },
  {
    q: "Which documents do you provide?",
    a: "The standard export set for your destination, prepared alongside the shipment. If your country of import needs a specific certificate or legalisation, raise it at enquiry stage so it is built into the timeline.",
  },
  {
    q: "How soon will someone respond?",
    a: "Enquiries go to our trade desk at trade@patonics.in and are picked up on working days. For a faster route, call any of the three numbers listed, or send a WhatsApp message.",
  },
] as const;

/** Certifications and trade credentials. */
export const CREDENTIALS = [
  { label: "ISO 9001:2015", note: "Quality management system" },
  { label: "Est. 1983", note: "Four decades of trading" },
  { label: "Gujarat, India", note: "Close to Mundra & Kandla ports" },
  { label: "10+ Markets", note: "Four continents served" },
] as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Packaging", href: "/packaging" },
  { label: "Divisions", href: "/divisions" },
  { label: "Quality", href: "/quality" },
  { label: "Contact", href: "/contact" },
] as const;

/** Secondary links, grouped in the footer rather than the main nav. */
export const SECONDARY_NAV = [
  { label: "Buyer FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export const CONTACT = {
  company: "Patonics International Trading Co.",
  addressLines: ["37, Akshar Business Center", "NH 8-A, Jambudiya", "Gujarat, India - 363642"],
  phones: ["+91 79906 12581", "+91 95585 36700", "+91 99988 52426"],
  emails: ["trade@patonics.in", "mktg@patonics.in"],
  hours: "Mon – Sat, 9:30am – 6:30pm IST",
};

export const telHref = (p: string) => `tel:${p.replace(/\s/g, "")}`;

export const waHref = (
  p: string,
  text = "Hello Patonics, I would like to discuss an export requirement.",
) => `https://wa.me/${p.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

/*
 * Category preselection travels in the URL (/contact?category=Spices) rather
 * than a window event, so it still works once the contact form lives on its
 * own page and so the link can be opened in a new tab or shared.
 */
