import type { Metadata } from "next";
import Footer from "@/components/Footer";
import VillasPageHero from "@/components/villas/VillasPageHero";
import VillaCards from "@/components/VillaCards";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Our Villas | ${SITE.name}`,
  description:
    "Four private pool villas in Seminyak - Villa Mawar, Jepun, Anggrek and Sandat.",
};

export default function VillasPage() {
  return (
    <>
      <VillasPageHero />
      <VillaCards showHeader={false} animateEntrance />
      <Footer />
    </>
  );
}
