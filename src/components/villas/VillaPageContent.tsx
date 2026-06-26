"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import VillaPageGallery from "@/components/villas/VillaPageGallery";
import VillaPageFacilities from "@/components/villas/VillaPageFacilities";
import VillaHouseRules from "@/components/villas/VillaHouseRules";
import VillaWhatsAppCta from "@/components/villas/VillaWhatsAppCta";
import VillaTopBanner from "@/components/villas/VillaTopBanner";
import VillaKeyInfo from "@/components/villas/VillaKeyInfo";
import VillaReviewsCarousel from "@/components/villas/VillaReviewsCarousel";
import VillaHighlightsStrip from "@/components/villas/VillaHighlightsStrip";
import VillaSectionDivider from "@/components/villas/VillaSectionDivider";
import VillaImageStrip from "@/components/villas/VillaImageStrip";
import { useLanguage } from "@/context/LanguageContext";
import type { VillaFacilities } from "@/lib/villas";

const DISTANCE_NOTE =
  "Our villas are just a few hundred metres from Sunset Road. Seminyak Square and Eat Street are about a 10 minute walk away, and the beaches at Kuta, Legian and Seminyak are approximately 15 minutes by taxi or scooter.";

type VillaPageContentProps = {
  slug: string;
  villaName: string;
  villaDescription: string;
  facilities: VillaFacilities;
  heroImage: string;
  galleryImages: string[];
};

export default function VillaPageContent({
  slug,
  villaName,
  villaDescription,
  facilities,
  heroImage,
  galleryImages,
}: VillaPageContentProps) {
  const { language, getVillaDescription } = useLanguage();
  const description =
    language === "id" ? getVillaDescription(slug) : villaDescription;

  const heroRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const image = parallaxRef.current;
    if (!hero || !image) return;

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0) {
        const scrollProgress = Math.max(0, -rect.top);
        image.style.transform = `translate3d(0, ${scrollProgress * 0.35}px, 0) scale(1.08)`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stripImage =
    galleryImages[1] ?? galleryImages[0] ?? heroImage;

  return (
    <>
      <VillaTopBanner />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-[50vh] w-full overflow-hidden md:h-[60vh]"
      >
        <div ref={parallaxRef} className="villa-hero-parallax-image absolute inset-0">
          <Image
            src={heroImage}
            alt={villaName}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
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

      <VillaHighlightsStrip />

      <VillaSectionDivider />

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
                className="mb-5 text-[var(--text)]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}
              >
                {description}
              </p>
              <p
                className="text-[var(--text-muted)]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  fontStyle: "italic",
                }}
              >
                {DISTANCE_NOTE}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={100} className="lg:w-1/2">
              <VillaKeyInfo slug={slug} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <VillaImageStrip src={stripImage} alt={`${villaName} pool and garden`} />

      <VillaSectionDivider />

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

      <VillaSectionDivider />

      {/* Reviews */}
      <ScrollReveal>
        <VillaReviewsCarousel slug={slug} />
      </ScrollReveal>

      <VillaSectionDivider />

      {/* Facilities */}
      <VillaPageFacilities facilities={facilities} />

      <VillaSectionDivider />

      {/* House Rules */}
      <VillaHouseRules />

      {/* WhatsApp CTA */}
      <VillaWhatsAppCta villaName={villaName} />

      <Footer />
    </>
  );
}
