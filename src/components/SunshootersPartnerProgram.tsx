"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export default function SunshootersPartnerProgram() {
  const { t } = useLanguage();

  return (
    <section className="bg-[var(--bg)] py-8 md:py-12">
      <div className="container-site">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl rounded-lg border-[2.5px] border-[var(--dark)] bg-white px-6 py-7 text-center md:px-10 md:py-9">
            <img
              src="/sunshooters-logo.png"
              alt={t.sunshootersPartnerLogoAlt}
              width={150}
              height={150}
              className="mx-auto mb-5 h-auto w-[130px] md:mb-6 md:w-[150px]"
            />

            <p
              className="mb-2 text-[var(--sand)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {t.sunshootersPartnerLabel}
            </p>
            <h2
              className="mb-3 text-[var(--dark)]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                fontWeight: 300,
              }}
            >
              {t.sunshootersPartnerTitle}
            </h2>
            <p
              className="mx-auto mb-6 max-w-2xl text-[var(--dark)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              {t.sunshootersPartnerDescription}
            </p>

            <ul className="mx-auto mb-5 w-fit max-w-xl space-y-2 text-left">
              {t.sunshootersPartnerBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-[var(--dark)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8125rem",
                    fontWeight: 400,
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sand)]"
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>

            <p
              className="text-[var(--dark)]/60 italic"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              {t.sunshootersPartnerNote}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
