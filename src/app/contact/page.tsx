import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ContactPageClient from "@/components/contact/ContactPageClient";
import MapSection from "@/components/MapSection";
import ServerPageContent from "@/components/admin/ServerPageContent";
import { AdminBlockPage } from "@/components/admin/AdminProvider";
import { getPageCmsContentBlocks } from "@/lib/pageCms";
import { getRequestLocale } from "@/lib/requestLocale";
import { buildPageMetadata } from "@/lib/pageMetadata";

const CONTACT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("contact");
}

export default async function ContactPage() {
  const locale = await getRequestLocale();
  const cms = await getPageCmsContentBlocks("contact", locale);

  return (
    <ServerPageContent content={cms}>
      <AdminBlockPage pageSlug="contact">
        <>
          <ContactPageClient
            heroTitle={cms["hero.title"]}
            heroSubtitle={cms["hero.subtitle"]}
            heroImageSrc={cms["hero.image"] || CONTACT_HERO_IMAGE}
            contactEmail={cms["contact.email"]}
          />
          <MapSection />
          <Footer />
        </>
      </AdminBlockPage>
    </ServerPageContent>
  );
}
