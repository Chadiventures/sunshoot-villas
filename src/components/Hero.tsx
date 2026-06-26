"use client";

import Link from "next/link";
import { HERO_VIDEO } from "@/lib/media";
import { SITE } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,46,26,0.55) 0%, rgba(26,46,26,0.75) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
        <h1
          className="mb-6 text-white"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: "0.02em",
          }}
        >
          {t.heroHeadline}
        </h1>

        <p
          className="mx-auto mb-10 max-w-xl text-white/90"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            fontWeight: 300,
            lineHeight: 1.7,
          }}
        >
          {t.heroSubheadline}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/villas" className="btn-primary min-w-[200px]">
            {t.navOurVillas}
          </Link>
          <Link href="/book" className="btn-outline min-w-[200px]">
            {t.navBookNow}
          </Link>
        </div>
      </div>
    </section>
  );
}
