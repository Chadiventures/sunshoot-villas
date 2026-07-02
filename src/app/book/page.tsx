import type { Metadata } from "next";
import ServerPageContent from "@/components/admin/ServerPageContent";
import { AdminBlockPage } from "@/components/admin/AdminProvider";
import { getPageCmsContentBlocks } from "@/lib/pageCms";
import { getRequestLocale } from "@/lib/requestLocale";
import { buildPageMetadata } from "@/lib/pageMetadata";
import BookPageContent from "./BookPageContent";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("book");
}

export default async function BookPage() {
  const locale = await getRequestLocale();
  const cms = await getPageCmsContentBlocks("book", locale);
  return (
    <ServerPageContent content={cms}>
      <AdminBlockPage pageSlug="book">
        <BookPageContent />
      </AdminBlockPage>
    </ServerPageContent>
  );
}
