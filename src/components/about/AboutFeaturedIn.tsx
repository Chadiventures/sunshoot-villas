"use client";

import ScrollReveal from "@/components/ScrollReveal";

const ARTICLE_URL =
  "https://thebaliguideline.com/stay/seminyak/sun-shoot-villas-private-pool-villa-anggrek";

export default function AboutFeaturedIn() {
  return (
    <section className="bg-[#C9A96E] py-4 md:max-h-[80px] md:py-0">
      <ScrollReveal>
        <div className="container-site flex flex-col items-center justify-center gap-3 py-3 text-center md:h-20 md:flex-row md:justify-between md:gap-6 md:py-0 md:text-left">
          <p
            className="text-[#1A2E1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.125rem, 3vw, 1.375rem)",
              fontWeight: 400,
            }}
          >
            Featured in The Bali Guideline
          </p>

          <p
            className="text-[#1A2E1A]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.9375rem",
              fontWeight: 700,
            }}
          >
            8.7 / 10
          </p>

          <a
            href={ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center justify-center rounded-sm border-2 border-[#1A2E1A] px-5 py-2 text-[#1A2E1A] transition-all duration-300 ease-in-out hover:bg-[#1A2E1A] hover:text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Read Article
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
