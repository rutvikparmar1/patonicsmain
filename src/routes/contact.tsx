import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/Contact";
import { Faq } from "@/components/site/Faq";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  /*
   * `product` arrives from a product card or the mega menu as a slug. It is
   * read back as a plain string here and matched against the known product
   * list inside the form, so an arbitrary value never reaches the field.
   */
  validateSearch: (search: Record<string, unknown>): { product?: string } => {
    // Bracket access: tsconfig sets noPropertyAccessFromIndexSignature.
    const product = search["product"];
    return typeof product === "string" && product ? { product } : {};
  },
  head: () => ({
    meta: [
      { title: "Contact | Patonics International" },
      {
        name: "description",
        content:
          "Send an export enquiry to Patonics International, Jambudiya, Gujarat. Give us the product, grade, quantity and destination port and our trade desk will reply.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Contact"
        title="Send us an enquiry"
        lead="Give us the product, grade, quantity and destination port. Our trade desk will reply with what we can do and what it costs."
      />
      <Contact />
      <Faq />
    </main>
  );
}
