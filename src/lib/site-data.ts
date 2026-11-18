import grains from "@/assets/cat-grains.jpg";
import pulses from "@/assets/cat-pulses.jpg";
import spices from "@/assets/cat-spices.jpg";
import fruits from "@/assets/cat-fruits.jpg";
import vegetables from "@/assets/cat-vegetables.jpg";
import oilseeds from "@/assets/cat-oilseeds.jpg";
import floriculture from "@/assets/cat-floriculture.jpg";
import herbs from "@/assets/cat-herbs.jpg";
import dryfruits from "@/assets/cat-dryfruits.jpg";
import beverages from "@/assets/cat-beverages.jpg";
import dehydrated from "@/assets/cat-dehydrated.jpg";

/**
 * Product groups double as filter tabs on the products grid.
 */
export const PRODUCT_GROUPS = [
  { id: "all", label: "All" },
  { id: "staples", label: "Staples & Grains" },
  { id: "fresh", label: "Fresh Produce" },
  { id: "processed", label: "Processed" },
] as const;

export type ProductGroup = (typeof PRODUCT_GROUPS)[number]["id"];

/**
 * `items` lists the representative products shown on each category card.
 * Each list is drawn from the commodity set already photographed for that
 * category, so the copy and the image always agree.
 */
export const CATEGORIES = [
  {
    slug: "grains-cereals",
    name: "Grains & Cereals",
    group: "staples",
    image: grains,
    alt: "Bowls of basmati rice, wheat and maize with wheat stalks",
    blurb: "Bulk staples graded and sortex-cleaned for volume buyers.",
    items: ["Basmati Rice", "Non-Basmati Rice", "Wheat", "Maize"],
  },
  {
    slug: "pulses",
    name: "Pulses",
    group: "staples",
    image: pulses,
    alt: "Red lentils, yellow moong dal, chickpeas and black urad in brass bowls",
    blurb: "Whole and split pulses, machine-cleaned and uniformly sized.",
    items: ["Red Lentils", "Moong Dal", "Chickpeas", "Black Urad"],
  },
  {
    slug: "spices",
    name: "Spices",
    group: "processed",
    image: spices,
    alt: "Whole cumin, turmeric, red chillies, cardamom, pepper and cinnamon",
    blurb: "Whole and ground spices sourced from their growing regions.",
    items: ["Cumin", "Turmeric", "Red Chilli", "Cardamom", "Black Pepper", "Cinnamon"],
  },
  {
    slug: "fruits",
    name: "Fruits",
    group: "fresh",
    image: fruits,
    alt: "Mangoes, pomegranates, bananas and grapes in a wooden crate",
    blurb: "Seasonal fresh fruit packed for export transit.",
    items: ["Mango", "Pomegranate", "Banana", "Grapes"],
  },
  {
    slug: "vegetables",
    name: "Vegetables",
    group: "fresh",
    image: vegetables,
    alt: "Red onions, potatoes, okra, green chillies and garlic",
    blurb: "Fresh vegetables sorted by grade, size and destination.",
    items: ["Red Onion", "Potato", "Okra", "Green Chilli", "Garlic"],
  },
  {
    slug: "oilseeds",
    name: "Oilseeds",
    group: "staples",
    image: oilseeds,
    alt: "Groundnuts, sesame, mustard, sunflower and castor seeds",
    blurb: "Oil-bearing seeds for crushing, food and industrial use.",
    items: ["Groundnut", "Sesame Seeds", "Mustard", "Sunflower", "Castor"],
  },
  {
    slug: "floriculture",
    name: "Floriculture",
    group: "fresh",
    image: floriculture,
    alt: "Bunches of marigolds, red roses, tuberose and jasmine",
    blurb: "Cut flowers and loose blooms handled on short cycles.",
    items: ["Marigold", "Rose", "Tuberose", "Jasmine"],
  },
  {
    slug: "herbs",
    name: "Herbs",
    group: "processed",
    image: herbs,
    alt: "Moringa, tulsi, mint, curry leaves and ashwagandha roots",
    blurb: "Culinary and botanical herbs, fresh or dried to order.",
    items: ["Moringa", "Tulsi", "Mint", "Curry Leaves", "Ashwagandha"],
  },
  {
    slug: "dry-fruits",
    name: "Dry Fruits",
    group: "processed",
    image: dryfruits,
    alt: "Cashews, almonds, raisins, pistachios and dates in brass bowls",
    blurb: "Nuts and dried fruit graded by count, colour and size.",
    items: ["Cashew", "Almond", "Raisin", "Pistachio", "Dates"],
  },
  {
    slug: "beverages",
    name: "Beverages",
    group: "processed",
    image: beverages,
    alt: "Loose tea leaves, coffee beans and a cup of tea",
    blurb: "Tea and coffee in loose, bulk and private-label formats.",
    items: ["Tea Leaves", "Coffee Beans"],
  },
  {
    slug: "dehydrated-products",
    name: "Dehydrated Products",
    group: "processed",
    image: dehydrated,
    alt: "Dried onion flakes, garlic powder, dried mango and tomato powder",
    blurb: "Flakes, powders and granules with long shelf stability.",
    items: ["Onion Flakes", "Garlic Powder", "Dried Mango", "Tomato Powder"],
  },
] as const;

/**
 * The five business lines Patonics International was set up to supply.
 * Source: the company's own stated scope at incorporation.
 */
export const DIVISIONS = [
  {
    id: "agri",
    name: "Agri Commodities",
    tagline: "Grains, pulses, spices, oilseeds and fresh produce",
    text: "Our core business. Eleven categories sourced across Indian growing regions and consolidated for domestic and export buyers.",
    href: "#products",
    cta: "View all categories",
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
    value: 11,
    label: "Agri categories",
    suffix: "",
    note: "From grains and pulses to dehydrated products",
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
    title: "Eleven categories, ten markets",
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
    a: "Eleven agri categories plus ceramics, textiles, and paper and packaging. Volumes are quoted per enquiry, from part-container trial orders through to repeat full-container programmes. Tell us the product, grade and destination and we will confirm what is workable.",
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
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Divisions", href: "#divisions" },
  { label: "Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
] as const;

/** Sections the header highlights as you scroll past them. */
export const SECTION_IDS = ["top", "about", "products", "divisions", "quality", "contact"] as const;

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

/** Ask the inquiry form to preselect a category, then scroll to it. */
export const SELECT_CATEGORY_EVENT = "patonics:select-category";
export function selectCategory(name: string) {
  window.dispatchEvent(new CustomEvent(SELECT_CATEGORY_EVENT, { detail: name }));
}
