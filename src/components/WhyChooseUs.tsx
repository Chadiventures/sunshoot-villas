"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const features = [
  {
    title: "Prime Seminyak Location",
    mobileTitle: "Location",
    description:
      "Walking distance to restaurants, supermarkets, salons and Seminyak Beach in the famous Bidadari area.",
    icon: (
      <svg className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Private Pool",
    mobileTitle: "Pool",
    description:
      "Every villa comes with its own private pool - your personal oasis steps from your living room.",
    icon: (
      <svg className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
        <path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
      </svg>
    ),
  },
  {
    title: "Personal Service",
    mobileTitle: "Service",
    description:
      "Luxury without the corporate hotel feel - genuine Balinese warmth and attentive hospitality.",
    icon: (
      <svg className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Airport Pickup Included",
    mobileTitle: "Airport",
    description:
      "Start your holiday stress-free with complimentary airport pickup arranged for your arrival.",
    icon: (
      <svg className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 19 4c-1 0-2 1-3.5 2.5L12 10 3.8 8.2" />
        <path d="M3.8 8.2L2 16l8.2 1.8" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
];

const REVEAL_STYLE = {
  transition: "opacity 600ms ease-out, transform 600ms ease-out",
} as const;

const CARD_STAGGER_MS = [0, 150, 300, 450];

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          window.setTimeout(() => setCardsVisible(true), 500);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[var(--dark)] py-20 md:py-28">
      <div className="container-site">
        <div
          className="mb-8 text-center sm:mb-14"
          style={{
            ...REVEAL_STYLE,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <p className="section-eyebrow mb-3">{t.whyChooseUsTitle}</p>
          <h2
            className="text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 300,
            }}
          >
            The Sun Shoot Difference
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-1 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center"
              style={{
                ...REVEAL_STYLE,
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: cardsVisible
                  ? `${CARD_STAGGER_MS[index]}ms`
                  : "0ms",
              }}
            >
              <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--sand)] text-[var(--sand)] sm:mb-5 sm:h-16 sm:w-16">
                {feature.icon}
              </div>
              <h3
                className="mb-0 whitespace-nowrap text-[9px] text-white sm:mb-3 sm:whitespace-normal sm:text-[1.25rem]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 400,
                }}
              >
                <span className="sm:hidden">{feature.mobileTitle}</span>
                <span className="hidden sm:inline">{feature.title}</span>
              </h3>
              <p
                className="hidden text-white/65 sm:block"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
