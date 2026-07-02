import type { Metadata } from "next";
import ServerPageContent from "@/components/admin/ServerPageContent";
import { AdminBlockPage } from "@/components/admin/AdminProvider";
import { getPageCmsContentBlocks } from "@/lib/pageCms";
import { getRequestLocale } from "@/lib/requestLocale";
import { buildPageMetadata } from "@/lib/pageMetadata";
import FaqPageContent from "./FaqPageContent";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("faq");
}

export default async function FaqPage() {
  const locale = await getRequestLocale();
  const cms = await getPageCmsContentBlocks("faq", locale);
  return (
    <ServerPageContent content={cms}>
      <AdminBlockPage pageSlug="faq">
        <FaqPageContent />
      </AdminBlockPage>
    </ServerPageContent>
  );
}
