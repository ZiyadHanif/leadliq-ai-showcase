import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { PainPoints } from "@/components/PainPoints";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Industries } from "@/components/Industries";
import { Results } from "@/components/Results";
import { Pricing } from "@/components/Pricing";
import { CTA, Footer } from "@/components/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LeadLiq — AI Integration for US Small & Medium Businesses" },
      {
        name: "description",
        content:
          "LeadLiq builds AI workflows that boost sales, generate qualified leads, and cut operations costs for US SMBs. Continuous monthly support included.",
      },
      { property: "og:title", content: "LeadLiq — AI that ships revenue" },
      {
        property: "og:description",
        content: "Custom AI integration for US small and medium businesses. Lead gen, sales agents, ops automation, brand identity.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <PainPoints />
      <Process />
      <Services />
      <Industries />
      <Results />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
