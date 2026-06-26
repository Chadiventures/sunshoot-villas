"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { HERO_VIDEO } from "@/lib/media";

export default function AboutLocation() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <ScrollReveal className="mx-auto max-w-[800px] text-center">
          <h2
            className="mb-6 text-white md:mb-8"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            Location
          </h2>
          <p
            className="text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.85,
            }}
          >
            Our villas are just a few hundred metres from Sunset Road, the main
            road connecting the airport to Seminyak. The airport is only 20
            minutes away depending on traffic. Seminyak Square and the famous
            Eat Street (Jl Kayu Aya) are just a 10 minute walk. Restaurants like
            La Favella and Ultimo are within easy walking distance. More famous
            spots like KuDeTa, Potato Head and Mexicola are a short 10 minute
            taxi or Grab ride away. The beaches at Kuta, Legian and Seminyak are
            approximately 15 minutes by taxi or scooter.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
