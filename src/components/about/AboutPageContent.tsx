"use client";

import Footer from "@/components/Footer";
import VillaReviewsCarousel from "@/components/villas/VillaReviewsCarousel";
import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutImageGrid from "@/components/about/AboutImageGrid";
import AboutMeetHost from "@/components/about/AboutMeetHost";
import AboutValues from "@/components/about/AboutValues";
import AboutCta from "@/components/about/AboutCta";

export default function AboutPageContent() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutImageGrid />
      <AboutMeetHost />
      <AboutValues />
      <VillaReviewsCarousel />
      <AboutCta />
      <Footer />
    </>
  );
}
