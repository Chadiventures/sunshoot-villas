"use client";

import ScrollReveal from "@/components/ScrollReveal";
import type { ReactNode } from "react";

function ValueIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="h-5 w-5 sm:h-7 sm:w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const VALUES = [
  {
    title: "Personal Service",
    description:
      "Every guest is treated like family. We remember your preferences, anticipate your needs, and are always available.",
    icon: (
      <ValueIcon>
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </ValueIcon>
    ),
  },
  {
    title: "Your Home in Bali",
    description:
      "Our villas are not just accommodation. They are your private sanctuary, designed for comfort, relaxation, and connection.",
    icon: (
      <ValueIcon>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" />
      </ValueIcon>
    ),
  },
  {
    title: "Honest Hospitality",
    description:
      "No hidden fees, no surprises. Just genuine Balinese hospitality from a team that truly cares about your experience.",
    icon: (
      <ValueIcon>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </ValueIcon>
    ),
  },
];

export default function AboutValues() {
  return (
    <section className="bg-[var(--dark)] py-12 md:py-16">
      <div className="container-site">
        <ScrollReveal className="mb-8 text-center md:mb-14">
          <h2
            className="text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            What We Believe In
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-8">
          {VALUES.map((value, index) => (
            <ScrollReveal key={value.title} direction="pop" delay={index * 100}>
              <article className="card-lift h-full rounded-sm border border-white/10 bg-white/5 p-3 md:p-8">
                <div className="mb-3 text-[var(--sand)] md:mb-5">{value.icon}</div>
                <h3
                  className="mb-2 text-white md:mb-3"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1rem",
                    fontWeight: 400,
                  }}
                >
                  <span className="md:hidden" style={{ fontSize: "1rem" }}>
                    {value.title}
                  </span>
                  <span className="hidden md:inline" style={{ fontSize: "1.375rem" }}>
                    {value.title}
                  </span>
                </h3>
                <p
                  className="text-white/75"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}
                >
                  <span className="md:hidden">{value.description}</span>
                  <span
                    className="hidden md:inline"
                    style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}
                  >
                    {value.description}
                  </span>
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
