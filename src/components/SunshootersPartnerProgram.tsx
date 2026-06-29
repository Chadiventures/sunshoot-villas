"use client";

import ScrollReveal from "@/components/ScrollReveal";

const BENEFITS = [
  "10% OFF all food and drinks",
  "Free welcome drink (juice, soda, tea or coffee)",
  "VIP priority seating, even on busy nights",
  "Priority villa delivery for breakfast, lunch and dinner",
  "English-speaking team and premium hospitality standards",
];

export default function SunshootersPartnerProgram() {
  return (
    <section className="bg-[var(--bg)] pt-6 pb-14 md:pt-8 md:pb-20">
      <div className="container-site">
        <ScrollReveal>
          <div className="rounded-sm border border-white/10 bg-[var(--dark)] px-8 py-10 text-center md:px-12 md:py-14">
            <img
              src="/sunshooters-logo.png"
              alt="Sunshooters Villa Partner Program"
              width={190}
              height={190}
              className="mx-auto mb-8 h-auto w-[190px] md:mb-10 md:w-[200px]"
              style={{
                filter: "drop-shadow(0 0 24px rgba(201, 169, 110, 0.5))",
              }}
            />

            <p
              className="mb-3 text-[var(--sand)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Official Partner Villas
            </p>
            <h2
              className="mb-5 text-white"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                fontWeight: 300,
              }}
            >
              Sunshooters Villa Partner Program
            </h2>
            <p
              className="mx-auto mb-8 max-w-2xl text-white/75"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9375rem",
                fontWeight: 300,
                lineHeight: 1.75,
              }}
            >
              As an official partner of the Sunshooters Villa Partner Program, our
              guests enjoy exclusive perks at Sunshooters Bar and Grill, located
              just steps away.
            </p>

            <ul className="mx-auto mb-8 w-fit max-w-xl space-y-3 text-left">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-white/90"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A96E]"
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>

            <p
              className="text-white/60 italic"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8125rem",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Simply mention your villa name when ordering or arriving.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
