import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import VillaCards from "@/components/VillaCards";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Our Villas | ${SITE.name}`,
  description:
    "Four private pool villas in Seminyak — Villa Mawar, Jepun, Anggrek and Sandat.",
};

export default function VillasPage() {
  return (
    <>
      <PageHero
        title="Our Villas"
        subtitle="Four private pool villas in the Bidadari area of Seminyak, each with two bedrooms and its own character."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Our Villas" },
        ]}
      />
      <VillaCards showHeader={false} />
      <Footer />
    </>
  );
}
