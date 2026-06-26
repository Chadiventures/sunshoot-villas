import type { Metadata } from "next";
import Footer from "@/components/Footer";
import VideoPageHero from "@/components/VideoPageHero";
import VillaCards from "@/components/VillaCards";
import { HERO_VIDEO } from "@/lib/media";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Our Villas | ${SITE.name}`,
  description:
    "Four private pool villas in Seminyak - Villa Mawar, Jepun, Anggrek and Sandat.",
};

export default function VillasPage() {
  return (
    <>
      <VideoPageHero
        videoSrc={HERO_VIDEO}
        title="Our Villas"
        subtitle="Four private pool villas in the heart of Seminyak"
      />
      <VillaCards showHeader={false} />
      <Footer />
    </>
  );
}
