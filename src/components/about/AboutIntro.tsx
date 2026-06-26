"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function AboutIntro() {
  return (
    <section className="bg-[var(--bg)] py-16 md:py-24">
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
            Our Story
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
            Sun Shoot Villas Seminyak was born from a simple belief: that every
            guest deserves more than just a place to sleep. Nestled in the famous
            Bidadari area of Seminyak, our four private pool villas have been
            welcoming families, couples, and groups of friends from all over the
            world for years. We are not a hotel. We are a home away from home,
            and that difference matters to us deeply.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
