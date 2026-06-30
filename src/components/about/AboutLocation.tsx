"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { HERO_VIDEO } from "@/lib/media";

export default function AboutLocation() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <ScrollReveal className="mx-auto max-w-[800px] text-center">
          <h2
            className="mb-6 text-white md:mb-8"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            {t.aboutLocationTitle}
          </h2>
          <p
            className="text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.85,
            }}
          >
            {t.aboutLocationBody}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
