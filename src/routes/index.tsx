import { createFileRoute } from "@tanstack/react-router";
import {
  Categories,
  ChilliSpotlight,
  ExportSplit,
  Featured,
  LabelCta,
  LandingHero,
  ReachContact,
  StatsBand,
  StorySection,
} from "@/components/site/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Patonics International | Indian Spices, Farm to Fork" },
      {
        name: "description",
        content:
          "ISO 9001:2015 certified Indian spice exporter from Gujarat since 1983: red chilli, turmeric, cumin and coriander powders, with private labeling for your brand.",
      },
      { property: "og:title", content: "Patonics International - Indian Spices, Farm to Fork" },
      {
        property: "og:description",
        content:
          "Red chilli, turmeric, cumin and coriander powders, milled and packed in Gujarat for buyers in ten markets.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <LandingHero />
      <Categories />
      <ChilliSpotlight />
      <Featured />
      <ExportSplit />
      <StorySection />
      <StatsBand />
      <ReachContact />
      <LabelCta />
    </main>
  );
}
