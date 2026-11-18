import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { About } from "@/components/site/About";
import { Stats } from "@/components/site/Stats";
import { Divisions } from "@/components/site/Divisions";
import { Products } from "@/components/site/Products";
import { Process } from "@/components/site/Process";
import { WhyUs } from "@/components/site/WhyUs";
import { GlobalReach } from "@/components/site/GlobalReach";
import { Quality } from "@/components/site/Quality";
import { Leadership } from "@/components/site/Leadership";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { CtaBanner, SiteFooter } from "@/components/site/CtaFooter";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { FAQS } from "@/lib/site-data";

/** Buyer questions, marked up so they can surface as rich results. */
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Patonics International | Indian Agricultural & Export Products" },
      {
        name: "description",
        content:
          "ISO 9001:2015 certified Indian exporter of grains, pulses, spices, oilseeds, fresh produce, dehydrated products, ceramics, textiles and packaging. Trading since 1983, serving 10+ markets across four continents.",
      },
      {
        property: "og:title",
        content: "Patonics International — Bringing the Best of India to Global Markets",
      },
      {
        property: "og:description",
        content:
          "Trusted Indian exporter of agricultural commodities and diverse products since 1983. Eleven agri categories, five business divisions, ten export markets.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(FAQ_JSON_LD) }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Stats />
        <Divisions />
        <Products />
        <Process />
        <WhyUs />
        <GlobalReach />
        <Quality />
        <Leadership />
        <Faq />
        <Contact />
        <CtaBanner />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
