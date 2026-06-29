"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutCta() {
  return (
    <section className="bg-[var(--dark)] py-12 md:py-16">
      <div className="container-site">
        <ScrollReveal className="text-center">
          <h2
            className="mb-8 text-[var(--bg)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            Ready to Experience Seminyak?
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/villas"
              className="btn-hover min-w-[200px] rounded-sm border-2 border-[var(--bg)] px-8 py-3.5 text-center text-[var(--bg)] transition-all duration-300 ease-in-out hover:bg-white/10"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              View Our Villas
            </Link>
            <Link
              href="/book"
              className="btn-primary btn-hover min-w-[200px]"
            >
              Book Now
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
