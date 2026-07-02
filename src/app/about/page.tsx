import type { Metadata } from "next";
import AboutPageContent from "@/components/about/AboutPageContent";
import ServerPageContent from "@/components/admin/ServerPageContent";
import { AdminBlockPage } from "@/components/admin/AdminProvider";
import { getPageCmsContentBlocks } from "@/lib/pageCms";
import { getRequestLocale } from "@/lib/requestLocale";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { HERO_VIDEO } from "@/lib/media";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("about");
}

export default async function AboutPage() {
  const locale = await getRequestLocale();
  const cms = await getPageCmsContentBlocks("about", locale);
  return (
    <ServerPageContent content={cms}>
      <AdminBlockPage pageSlug="about">
        <AboutPageContent
          heroTitle={cms["hero.title"]}
          heroSubtitle={cms["hero.subtitle"]}
          heroVideoSrc={cms["hero.video_url"] || HERO_VIDEO}
        />
      </AdminBlockPage>
    </ServerPageContent>
  );
}
