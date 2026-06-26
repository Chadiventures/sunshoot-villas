import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import About from "@/components/About";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Carousel />
      <About />
      <Features />
      <Testimonials />
      <Location />
      <Footer />
    </>
  );
}
