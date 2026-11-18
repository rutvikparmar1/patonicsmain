import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Prose } from "@/components/site/Prose";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Patonics International" },
      {
        name: "description",
        content:
          "Terms governing use of the Patonics International website. Commercial terms of supply are agreed separately in each contract of sale.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Terms"
        title="Terms of use"
        lead="These terms cover the website. They are not the terms on which we sell: those are agreed in writing for each contract."
      />

      <Prose updated="18 November 2026">
        <h2>This website is information, not an offer</h2>
        <p>
          Everything on this site is published to describe what {CONTACT.company} does. It is not an
          offer to sell, a quotation, or a commitment to supply any product at any price. A binding
          agreement exists only once we and a buyer have signed a contract of sale or exchanged a
          confirmed purchase order and proforma invoice.
        </p>

        <h2>Product information</h2>
        <p>
          Category listings, specifications, grades and photographs are indicative. Crops vary by
          season, region and lot. The specification that governs a shipment is the one recorded in
          the contract for that shipment, not the description on this page, and photographs are
          illustrative rather than of the goods you will receive.
        </p>

        <h2>Routes, transit times and ports</h2>
        <p>
          The shipping lanes shown on this site illustrate the routes our cargo commonly takes.
          Actual routing, carrier, transit time and port of discharge are confirmed per shipment and
          are subject to carrier schedules and conditions outside our control.
        </p>

        <h2>Certification</h2>
        <p>
          References to ISO 9001:2015 describe the certification of our quality management system. A
          copy of the certificate is available on request. Certification of a management system is
          not a warranty of any individual consignment; consignment quality is governed by the
          agreed contract parameters.
        </p>

        <h2>Availability of the site</h2>
        <p>
          We aim to keep the site available and accurate, but we do not guarantee uninterrupted
          access and we may change or remove content without notice.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The Patonics International name, logo, site text and photographs belong to the company or
          its licensors. You may read, print and share pages for your own business purposes. You may
          not republish them as your own or use the branding without written permission.
        </p>

        <h2>External links</h2>
        <p>
          Where this site links elsewhere, we are not responsible for the content or practices of
          those sites.
        </p>

        <h2>Governing law</h2>
        <p>
          Use of this website is governed by the laws of India, and the courts of Gujarat have
          jurisdiction. Terms applying to a contract of sale, including governing law and dispute
          resolution for that contract, are set out in the contract itself and take precedence over
          this page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms go to{" "}
          <a href={`mailto:${CONTACT.emails[0]}`}>{CONTACT.emails[0]}</a>, or to {CONTACT.company},{" "}
          {CONTACT.addressLines.join(", ")}.
        </p>
      </Prose>
    </main>
  );
}
