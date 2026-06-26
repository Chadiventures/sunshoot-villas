import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VillaPageContent from "@/components/villas/VillaPageContent";
import { getVillaBySlug, getVillaSlugs } from "@/lib/villas";
import { VILLA_IMAGES, getVillaGalleryImages } from "@/lib/media";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getVillaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);
  if (!villa) return { title: "Villa Not Found" };
  return {
    title: `${villa.name} | ${SITE.name}`,
    description: villa.description.slice(0, 160),
  };
}

export default async function VillaDetailPage({ params }: Props) {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);
  if (!villa) notFound();

  const heroImage = VILLA_IMAGES[slug] ?? VILLA_IMAGES.mawar;
  const galleryImages = getVillaGalleryImages(heroImage);

  return (
    <VillaPageContent
      slug={slug}
      villaName={villa.name}
      villaDescription={villa.description}
      facilities={villa.facilities}
      heroImage={heroImage}
      galleryImages={galleryImages}
    />
  );
}
