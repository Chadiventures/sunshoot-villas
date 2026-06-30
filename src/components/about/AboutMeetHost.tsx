"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutMeetHost() {
  const { t } = useLanguage();

  return (
    <section className="bg-[var(--bg)] py-12 md:py-16">
      <div className="container-site">
        <div className="grid grid-cols-[2fr_3fr] items-stretch gap-3 lg:grid-cols-2 lg:items-center lg:gap-14">
          <ScrollReveal direction="left" className="h-full min-h-0">
            <div
              className="flex h-full min-h-[120px] w-full items-center justify-center overflow-hidden rounded-sm border-2 border-dashed lg:aspect-[4/5] lg:max-w-none"
              style={{
                borderColor: "#C9A96E",
                backgroundColor: "rgba(201, 169, 110, 0.1)",
              }}
            >
              <p
                className="px-2 text-center"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#C9A96E",
                }}
              >
                <span className="lg:hidden">{t.aboutMeetHostPhotoShort}</span>
                <span className="hidden lg:inline" style={{ fontSize: "1rem" }}>
                  {t.aboutMeetHostPhotoLong}
                </span>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100} className="h-full min-h-0">
            <div className="flex h-full flex-col justify-center rounded-sm border border-[var(--text)]/10 bg-white p-3 shadow-sm md:p-10">
              <h2
                className="mb-3 text-[var(--dark)] lg:mb-6"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.125rem, 4vw, 2.25rem)",
                  fontWeight: 300,
                }}
              >
                {t.aboutMeetHostTitle}
              </h2>
              <p
                className="text-[var(--text)]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                <span className="lg:hidden">{t.aboutMeetHostBody}</span>
                <span className="hidden lg:inline" style={{ fontSize: "1rem", lineHeight: 1.85 }}>
                  {t.aboutMeetHostBody}
                </span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
