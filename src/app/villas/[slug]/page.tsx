import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import VillaPageGallery from "@/components/villas/VillaPageGallery";
import VillaPageFacilities from "@/components/villas/VillaPageFacilities";
import VillaPagePolicies from "@/components/villas/VillaPagePolicies";
import VillaWhatsAppCta from "@/components/villas/VillaWhatsAppCta";
import { getVillaBySlug, getVillaSlugs } from "@/lib/villas";
import { VILLA_IMAGES, getVillaGalleryImages } from "@/lib/media";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

const KEY_INFO = [
  { label: "Location", value: "Jl. Bidadari II E, Seminyak" },
  { label: "Bedrooms", value: "2" },
  { label: "Pool", value: "Private" },
  { label: "Check-in", value: "14:00" },
  { label: "Check-out", value: "12:00" },
];

export async function generateStaticParams() {
  return getVillaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);
  if (!villa) return { title: "Villa Not Found" };
  return {
    title: `${villa.name} | ${SITE.name}`,
    description: villa.description,
  };
}

export default async function VillaDetailPage({ params }: Props) {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);
  if (!villa) notFound();

  const heroImage = VILLA_IMAGES[slug] ?? VILLA_IMAGES.mawar;
  const galleryImages = getVillaGalleryImages(heroImage);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative min-h-[55vh] w-full overflow-hidden sm:min-h-[65vh]">
        <Image
          src={heroImage}
          alt={villa.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(26,46,26,0.88) 0%, rgba(26,46,26,0.35) 55%, rgba(26,46,26,0.2) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-10 pt-28 text-center sm:pb-14">
          <h1
            className="mb-3 max-w-3xl text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.25rem, 8vw, 4rem)",
              fontWeight: 300,
              lineHeight: 1.15,
            }}
          >
            {villa.name}
          </h1>
          <p
            className="text-white/85"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.75rem, 2.5vw, 0.875rem)",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            2 Bedrooms | Private Pool | Seminyak, Bali
          </p>
        </div>
      </section>

      {/* 2. Intro */}
      <section className="bg-[var(--bg)] py-10 md:py-16">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <div className="lg:w-1/2">
              <p
                className="mb-3 text-[var(--sand)]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Welcome
              </p>
              <p
                className="text-[var(--text)]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}
              >
                {villa.description}
              </p>
            </div>

            <div className="lg:w-1/2">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {KEY_INFO.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-sm border border-[var(--text)]/10 bg-white px-4 py-4"
                  >
                    <p
                      className="mb-1 text-[var(--sand)]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.625rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-[var(--dark)]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.9375rem",
                        fontWeight: 400,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Gallery */}
      <section className="bg-white py-10 md:py-16">
        <div className="container-site">
          <h2
            className="mb-6 text-[var(--dark)] md:mb-8"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 300,
            }}
          >
            Photo Gallery
          </h2>
          <VillaPageGallery images={galleryImages} villaName={villa.name} />
        </div>
      </section>

      {/* 4. Facilities */}
      <VillaPageFacilities facilities={villa.facilities} />

      {/* 5. WhatsApp CTA */}
      <VillaWhatsAppCta villaName={villa.name} />

      {/* 6. Policies */}
      <VillaPagePolicies />

      <Footer />
    </>
  );
}
