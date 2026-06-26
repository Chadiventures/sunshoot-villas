"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function AboutOurVillas() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-site">
        <ScrollReveal className="mx-auto max-w-[800px] text-center">
          <h2
            className="mb-8 text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            Our Villas
          </h2>
          <p
            className="text-[var(--text)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.85,
            }}
          >
            All four of our villas have their own private pool, because we know
            most guests value their privacy when relaxing. Every villa is cleaned
            daily by our friendly team. Over the past few years we have invested
            heavily in renovating and upgrading all our villas to give guests
            the best possible value for money. When you arrive, you will find a
            clean, fresh and beautifully maintained villa ready for your holiday.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
