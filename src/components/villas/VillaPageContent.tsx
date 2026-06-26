"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import VillaPageGallery from "@/components/villas/VillaPageGallery";
import VillaPageFacilities from "@/components/villas/VillaPageFacilities";
import VillaWhatsAppCta from "@/components/villas/VillaWhatsAppCta";
import VillaTopBanner from "@/components/villas/VillaTopBanner";
import VillaKeyInfo from "@/components/villas/VillaKeyInfo";
import VillaReviewsCarousel from "@/components/villas/VillaReviewsCarousel";
import type { VillaFacilities } from "@/lib/villas";
import { getVillaLongDescription } from "@/lib/villa-descriptions";

type VillaPageContentProps = {
  slug: string;
  villaName: string;
  facilities: VillaFacilities;
  heroImage: string;
  galleryImages: string[];
};

export default function VillaPageContent({
  slug,
  villaName,
  facilities,
  heroImage,
  galleryImages,
}: VillaPageContentProps) {
  const description = getVillaLongDescription(slug);

  return (
    <>
      <VillaTopBanner />

      {/* Hero */}
      <section className="relative min-h-[55vh] w-full overflow-hidden sm:min-h-[65vh]">
        <Image
          src={heroImage}
          alt={villaName}
          fill
          priority
          className="object-cover transition-transform duration-300 ease-in-out"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(26,46,26,0.88) 0%, rgba(26,46,26,0.35) 55%, rgba(26,46,26,0.2) 100%)",
          }}
        />
        <div
          className="hero-fade-in absolute inset-0 flex flex-col items-center justify-end px-4 pb-10 pt-28 text-center sm:pb-14"
          style={{ paddingTop: "calc(5rem + var(--villa-banner-h, 0px))" }}
        >
          <h1
            className="mb-3 max-w-3xl text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.25rem, 8vw, 4rem)",
              fontWeight: 300,
              lineHeight: 1.15,
            }}
          >
            {villaName}
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

      {/* Intro */}
      <section className="bg-[var(--bg)] py-10 md:py-16">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <ScrollReveal direction="left" className="lg:w-1/2">
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
                {description}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={100} className="lg:w-1/2">
              <VillaKeyInfo />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white py-10 md:py-16">
        <div className="container-site">
          <ScrollReveal>
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
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <VillaPageGallery images={galleryImages} villaName={villaName} />
          </ScrollReveal>
        </div>
      </section>

      {/* Reviews */}
      <VillaReviewsCarousel />

      {/* Facilities */}
      <VillaPageFacilities facilities={facilities} />

      {/* WhatsApp CTA */}
      <VillaWhatsAppCta villaName={villaName} />

      <Footer />
    </>
  );
}
