"use client";

import ScrollReveal from "@/components/ScrollReveal";
import type { ReactNode } from "react";

const BENEFITS = [
  {
    title: "10% Off All Food & Drinks",
    description: "Exclusive discount for Sunshoot Villa guests",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 5L5 19" />
        <circle cx="7" cy="7" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    title: "Free Welcome Drink",
    description: "Complimentary juice, soda, tea or coffee on arrival",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <path d="M6 2v2M10 2v2M14 2v2" />
      </svg>
    ),
  },
  {
    title: "VIP Priority Seating",
    description: "Guaranteed seating even on the busiest nights",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "Villa Delivery",
    description: "Breakfast, lunch and dinner delivered directly to your villa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
        <path d="M7 2v20" />
        <path d="M12 7h8" />
        <path d="M18 7v6" />
        <path d="M15 10h6" />
      </svg>
    ),
  },
  {
    title: "English Speaking Team",
    description: "Premium hospitality standards for international guests",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

function BenefitCard({
  title,
  description,
  icon,
  delay,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  delay: number;
}) {
  return (
    <ScrollReveal direction="pop" delay={delay}>
      <article className="card-lift h-full rounded-sm border border-[#C9A96E]/25 bg-white/5 p-4 md:p-6">
        <div className="mb-3 flex h-10 w-10 items-center justify-center text-[#C9A96E] md:mb-4 md:h-12 md:w-12">
          <div className="h-6 w-6 md:h-7 md:w-7">{icon}</div>
        </div>
        <h3
          className="mb-2 text-white"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.875rem",
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          {title}
        </h3>
        <p
          className="text-white/70"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.8125rem",
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </article>
    </ScrollReveal>
  );
}

function PinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C9A96E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function SunshootersBarPartner() {
  return (
    <section className="bg-[#1A2E1A] py-14 md:py-20">
      <div className="container-site">
        <ScrollReveal className="mb-10 text-center md:mb-12">
          <img
            src="/sunshooterslogo.jpeg"
            alt="Sunshooters Villa Partner Program"
            width={120}
            height={120}
            className="mx-auto mb-6 h-auto w-[120px]"
          />
          <h2
            className="mb-3 text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 300,
            }}
          >
            Exclusive Guest Benefits at Sunshooters Bar
          </h2>
          <p
            className="mx-auto max-w-2xl text-white/75"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.9375rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            As an official Sunshooters Villa Partner, our guests enjoy exclusive
            perks at the nearby Sunshooters Bar and Grill
          </p>
        </ScrollReveal>

        <div className="mb-8 grid grid-cols-2 gap-3 md:mb-10 md:grid-cols-3 md:gap-6">
          {BENEFITS.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              delay={index * 100}
            />
          ))}
        </div>

        <ScrollReveal delay={550} className="text-center">
          <p
            className="mb-5 text-white/60 italic"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.8125rem",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Simply mention your villa when ordering or arriving at Sunshooters Bar
          </p>

          <div className="inline-flex items-center justify-center gap-2">
            <PinIcon />
            <p
              className="text-[#C9A96E]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              Sunshooters Bar is just steps from your villa
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
