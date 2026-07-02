import Hero from "@/components/Hero";
import VillaCards from "@/components/VillaCards";
import RatingsTrustBar from "@/components/RatingsTrustBar";
import WhySeminyak from "@/components/WhySeminyak";
import WhyChooseUs from "@/components/WhyChooseUs";
import MapSection from "@/components/MapSection";
import AboutImageGrid from "@/components/about/AboutImageGrid";
import SunshootersPartnerProgram from "@/components/SunshootersPartnerProgram";
import AboutCta from "@/components/about/AboutCta";
import Footer from "@/components/Footer";
import ServerPageContent from "@/components/admin/ServerPageContent";
import { AdminBlockPage } from "@/components/admin/AdminProvider";
import { getPageCmsContentBlocks } from "@/lib/pageCms";
import { getRequestLocale } from "@/lib/requestLocale";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { HERO_VIDEO } from "@/lib/media";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("home");
}

export default async function Home() {
  const locale = await getRequestLocale();
  const cms = await getPageCmsContentBlocks("home", locale);

  return (
    <ServerPageContent content={cms}>
      <AdminBlockPage pageSlug="home">
        <>
          <Hero
            headline={cms["hero.headline"]}
            subheadline={cms["hero.subheadline"]}
            videoUrl={cms["hero.video_url"] || HERO_VIDEO}
            ctaVillas={cms["hero.cta_villas"]}
            ctaBook={cms["hero.cta_book"]}
          />
          <RatingsTrustBar />
          <VillaCards />
          <WhySeminyak />
          <WhyChooseUs />
          <MapSection />
          <AboutImageGrid />
          <SunshootersPartnerProgram />
          <AboutCta />
          <Footer />
        </>
      </AdminBlockPage>
    </ServerPageContent>
  );
}
