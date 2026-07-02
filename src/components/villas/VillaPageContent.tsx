"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import BookingModal from "@/components/booking/BookingModal";
import ScrollReveal from "@/components/ScrollReveal";
import VillaPageGallery from "@/components/villas/VillaPageGallery";
import VillaPageFacilities from "@/components/villas/VillaPageFacilities";
import VillaHouseRules from "@/components/villas/VillaHouseRules";
import VillaWhatsAppCta from "@/components/villas/VillaWhatsAppCta";
import VillaNightlyPrice from "@/components/pricing/VillaNightlyPrice";
import VillaKeyInfo from "@/components/villas/VillaKeyInfo";
import VillaReviewsCarousel from "@/components/villas/VillaReviewsCarousel";
import VillaHighlightsStrip from "@/components/villas/VillaHighlightsStrip";
import VillaSectionDivider from "@/components/villas/VillaSectionDivider";
import VillaVideoStrip from "@/components/villas/VillaVideoStrip";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { AdminEditableImage } from "@/components/admin/AdminEditableImage";
import { useAdminContent } from "@/hooks/useAdminContent";
import { getPageContentDefaults } from "@/lib/contentDefaults";
import type { VillaFacilities } from "@/lib/villas";

type VillaPageContentProps = {
  slug: string;
  facilities: VillaFacilities;
};

export default function VillaPageContent({ slug, facilities }: VillaPageContentProps) {
  const { getText, pageSlug } = useAdminContent();
  const VILLA_DEFAULTS = getPageContentDefaults(pageSlug);
  const villaName = getText("villa.name") || VILLA_DEFAULTS["villa.name"] || "";
  const bookLabel = (getText("hero.book_button") || VILLA_DEFAULTS["hero.book_button"] || "Book {villaName}").replace(
    "{villaName}",
    villaName,
  );
  const [bookingOpen, setBookingOpen] = useState(false);

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

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-[50vh] min-h-[22rem] w-full overflow-hidden md:h-[60vh] md:min-h-[26rem]"
      >
        <div ref={parallaxRef} className="villa-hero-parallax-image absolute inset-0">
          <AdminEditableImage
            imageBlockKey="villa.hero_image"
            altBlockKey="villa.hero_image.alt"
            className="object-cover object-center"
            renderStaticImage={({ src, alt, className, style }) => (
              <Image
                src={src}
                alt={alt}
                fill
                priority
                className={className}
                style={style}
                sizes="100vw"
              />
            )}
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
          className="hero-fade-in absolute right-0 bottom-0 left-0 flex flex-col items-center justify-end px-4 pb-10 text-center sm:pb-14"
          style={{ top: "var(--site-chrome-h)" }}
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
            <AdminEditableText blockKey="villa.name" fallback={VILLA_DEFAULTS["villa.name"]} as="span" />
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
            <AdminEditableText blockKey="hero.subtext" fallback={VILLA_DEFAULTS["hero.subtext"]} as="span" />
          </p>
          <VillaNightlyPrice slug={slug} />
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="btn-primary btn-hover mt-5 hidden md:inline-flex"
          >
            {bookLabel}
          </button>
        </div>
      </section>

      <VillaHighlightsStrip onBookClick={() => setBookingOpen(true)} />

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
                <AdminEditableText blockKey="intro.welcome" fallback={VILLA_DEFAULTS["intro.welcome"]} as="span" />
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
                <AdminEditableText blockKey="villa.description" fallback={VILLA_DEFAULTS["villa.description"]} allowLineBreaks as="span" />
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
                <AdminEditableText blockKey="intro.location_note" fallback={VILLA_DEFAULTS["intro.location_note"]} allowLineBreaks as="span" />
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={100} className="lg:w-1/2">
              <VillaKeyInfo />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <VillaVideoStrip />

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
              <AdminEditableText blockKey="gallery.title" fallback={VILLA_DEFAULTS["gallery.title"]} as="span" />
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <VillaPageGallery />
          </ScrollReveal>
        </div>
      </section>

      <VillaSectionDivider />

      {/* Reviews */}
      <ScrollReveal>
        <VillaReviewsCarousel />
      </ScrollReveal>

      <VillaSectionDivider />

      {/* Facilities */}
      <VillaPageFacilities facilities={facilities} />

      <VillaSectionDivider />

      {/* Good to Know */}
      <VillaHouseRules />

      {/* WhatsApp CTA */}
      <VillaWhatsAppCta />

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultVillaSlug={slug}
        villaName={getText("villa.name")}
      />

      <Footer />
    </>
  );
}
