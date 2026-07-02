import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VillaPageContent from "@/components/villas/VillaPageContent";
import ServerPageContent from "@/components/admin/ServerPageContent";
import { AdminBlockPage } from "@/components/admin/AdminProvider";
import { getVillaBySlug, getVillaSlugs } from "@/lib/villas";
import { getVillaCmsContentBlocks } from "@/lib/villaCms";
import { getRequestLocale } from "@/lib/requestLocale";
import { isVillaPageSlug, type PageSlug } from "@/lib/contentBlockTypes";
import { buildPageMetadata } from "@/lib/pageMetadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getVillaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isVillaPageSlug(slug)) return { title: "Villa Not Found" };
  return buildPageMetadata(slug as PageSlug);
}

export default async function VillaDetailPage({ params }: Props) {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);
  if (!villa) notFound();
  if (!isVillaPageSlug(slug)) notFound();

  const locale = await getRequestLocale();
  const cmsBlocks = await getVillaCmsContentBlocks(slug, locale);

  return (
    <ServerPageContent content={cmsBlocks}>
      <AdminBlockPage pageSlug={slug}>
        <VillaPageContent
          slug={slug}
          facilities={villa.facilities}
        />
      </AdminBlockPage>
    </ServerPageContent>
  );
}
