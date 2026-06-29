import Hero from "@/components/Hero";
import VillaCards from "@/components/VillaCards";
import RatingsTrustBar from "@/components/RatingsTrustBar";
import WhySeminyak from "@/components/WhySeminyak";
import WhyChooseUs from "@/components/WhyChooseUs";
import MapSection from "@/components/MapSection";
import AboutImageGrid from "@/components/about/AboutImageGrid";
import SunshootersPartnerProgram from "@/components/SunshootersPartnerProgram";
import AboutCta from "@/components/about/AboutCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <RatingsTrustBar />
      <VillaCards />
      <WhySeminyak />
      <WhyChooseUs />
      <MapSection />
      <AboutImageGrid />
      <SunshootersPartnerProgram />
      <AboutCta />
      <Footer />
    </>
  );
}
