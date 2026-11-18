import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { Leadership } from "@/components/site/Leadership";
import { Stats } from "@/components/site/Stats";
import { CtaBanner } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Patonics International" },
      {
        name: "description",
        content:
          "Patonics International Trading Co. has traded out of Gujarat since 1983, supplying agricultural commodities, ceramics, textiles and packaging to ten export markets.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="About"
        title="A Gujarat trading house, four decades on"
        lead="The business began in 1983 as Patel Chamanbhai Mavjibhai & Co. and trades today as Patonics International Trading Co., supplying buyers across four continents."
      />
      <About />
      <Stats />
      <Leadership />
      <CtaBanner />
    </main>
  );
}
