"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function AboutLocation() {
  return (
    <section className="bg-[var(--dark)] py-16 md:py-24">
      <div className="container-site">
        <ScrollReveal className="mx-auto max-w-[800px] text-center">
          <h2
            className="mb-8 text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            Location
          </h2>
          <p
            className="text-white/80"
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
