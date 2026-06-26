"use client";

import ScrollReveal from "@/components/ScrollReveal";

const ARTICLE_URL =
  "https://thebaliguideline.com/stay/seminyak/sun-shoot-villas-private-pool-villa-anggrek";

export default function AboutFeaturedIn() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-site">
        <ScrollReveal className="mb-10 text-center md:mb-12">
          <h2
            className="mb-3 text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            Featured In
          </h2>
          <p
            className="mx-auto max-w-xl text-[var(--text-muted)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Sun Shoot Villas has been recognized by leading travel guides
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <article className="card-lift mx-auto max-w-2xl rounded-sm border-2 border-[#C9A96E] bg-[#FAF8F5] p-6 md:p-8">
            <p
              className="mb-2 text-[#C9A96E]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              The Bali Guideline
            </p>
            <p
              className="mb-5 text-[var(--text)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9375rem",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              Recognized as one of Seminyak&apos;s best private pool villa stays,
              featured alongside Bali&apos;s top luxury properties.
            </p>
            <div className="mb-6 flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#C9A96E"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span
                className="text-[#C9A96E]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                8.7 / 10
              </span>
            </div>
            <a
              href={ARTICLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark btn-hover inline-flex !px-6 !py-2.5 !text-[10px]"
            >
              Read the Article
            </a>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
