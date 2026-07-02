import type { Metadata } from "next";
import Footer from "@/components/Footer";
import VillasPageHero from "@/components/villas/VillasPageHero";
import { HERO_VIDEO } from "@/lib/media";
import VillaCards from "@/components/VillaCards";
import ServerPageContent from "@/components/admin/ServerPageContent";
import { AdminBlockPage } from "@/components/admin/AdminProvider";
import { getPageCmsContentBlocks } from "@/lib/pageCms";
import { getRequestLocale } from "@/lib/requestLocale";
import { buildPageMetadata } from "@/lib/pageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("villas");
}

export default async function VillasPage() {
  const locale = await getRequestLocale();
  const cms = await getPageCmsContentBlocks("villas", locale);

  return (
    <ServerPageContent content={cms}>
      <AdminBlockPage pageSlug="villas">
        <>
          <VillasPageHero
            title={cms["hero.title"]}
            subtitle={cms["hero.subtitle"]}
            videoSrc={cms["hero.video_url"] || HERO_VIDEO}
          />
          <VillaCards showHeader={false} animateEntrance />
          <Footer />
        </>
      </AdminBlockPage>
    </ServerPageContent>
  );
}
