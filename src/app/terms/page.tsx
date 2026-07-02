import type { Metadata } from "next";
import ServerPageContent from "@/components/admin/ServerPageContent";
import { AdminBlockPage } from "@/components/admin/AdminProvider";
import { getPageCmsContentBlocks } from "@/lib/pageCms";
import { getRequestLocale } from "@/lib/requestLocale";
import { buildPageMetadata } from "@/lib/pageMetadata";
import TermsPageContent from "./TermsPageContent";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("terms");
}

export default async function TermsPage() {
  const locale = await getRequestLocale();
  const cms = await getPageCmsContentBlocks("terms", locale);
  return (
    <ServerPageContent content={cms}>
      <AdminBlockPage pageSlug="terms">
        <TermsPageContent
          heroTitle={cms["hero.title"]}
          heroSubtitle={cms["hero.subtitle"]}
        />
      </AdminBlockPage>
    </ServerPageContent>
  );
}
