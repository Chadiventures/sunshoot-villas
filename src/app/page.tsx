import Hero from "@/components/Hero";
import VillaCards from "@/components/VillaCards";
import RatingsTrustBar from "@/components/RatingsTrustBar";
import WhySeminyak from "@/components/WhySeminyak";
import WhyChooseUs from "@/components/WhyChooseUs";
import MapSection from "@/components/MapSection";
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
      <Footer />
    </>
  );
}
