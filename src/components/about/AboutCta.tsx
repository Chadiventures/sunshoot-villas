"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutCta() {
  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: "#C9A96E" }}>
      <div className="container-site">
        <ScrollReveal className="text-center">
          <h2
            className="mb-8 text-[var(--dark)]"
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
              className="btn-outline-dark btn-hover min-w-[200px]"
            >
              View Our Villas
            </Link>
            <Link
              href="/book"
              className="btn-hover min-w-[200px] rounded-sm border-2 border-[var(--dark)] bg-[var(--dark)] px-8 py-3.5 text-center text-white transition-all duration-300 ease-in-out hover:bg-[var(--dark-light)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Book Now
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
