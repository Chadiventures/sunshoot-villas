"use client";

import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import VillaReviewsCarousel from "@/components/villas/VillaReviewsCarousel";
import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutFeaturedIn from "@/components/about/AboutFeaturedIn";
import AboutImageGrid from "@/components/about/AboutImageGrid";
import AboutOurVillas from "@/components/about/AboutOurVillas";
import AboutLocation from "@/components/about/AboutLocation";
import AboutMeetHost from "@/components/about/AboutMeetHost";
import AboutValues from "@/components/about/AboutValues";
import AboutCta from "@/components/about/AboutCta";

export default function AboutPageContent() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutFeaturedIn />
      <AboutImageGrid />
      <AboutOurVillas />
      <AboutLocation />
      <AboutMeetHost />
      <AboutValues />
      <ScrollReveal>
        <VillaReviewsCarousel />
      </ScrollReveal>
      <AboutCta />
      <Footer />
    </>
  );
}
