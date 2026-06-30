"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { useMemo, type ReactNode } from "react";

function ValueIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="h-5 w-5 md:h-7 md:w-7"
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

const VALUE_ICONS = [
  (
    <ValueIcon key="personal">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </ValueIcon>
  ),
  (
    <ValueIcon key="home">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" />
    </ValueIcon>
  ),
  (
    <ValueIcon key="honest">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </ValueIcon>
  ),
];

export default function AboutValues() {
  const { t } = useLanguage();

  const values = useMemo(
    () => [
      {
        key: "personal",
        title: t.aboutValuePersonalTitle,
        description: t.aboutValuePersonalDescription,
        icon: VALUE_ICONS[0],
      },
      {
        key: "home",
        title: t.aboutValueHomeTitle,
        description: t.aboutValueHomeDescription,
        icon: VALUE_ICONS[1],
      },
      {
        key: "honest",
        title: t.aboutValueHonestTitle,
        description: t.aboutValueHonestDescription,
        icon: VALUE_ICONS[2],
      },
    ],
    [t],
  );

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
            {t.aboutValuesTitle}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-2 md:gap-8">
          {values.map((value, index) => (
            <ScrollReveal key={value.key} direction="pop" delay={index * 100}>
              <article className="card-lift h-full rounded-sm border border-white/10 bg-white/5 p-2 md:p-8">
                <div className="mb-2 text-[var(--sand)] md:mb-5">{value.icon}</div>
                <h3
                  className="mb-1.5 text-[11px] text-white md:mb-3 md:text-[1.375rem]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 400,
                  }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-[11px] text-white/75 md:text-[0.9375rem]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}
                >
                  <span className="md:hidden" style={{ lineHeight: 1.5 }}>
                    {value.description}
                  </span>
                  <span className="hidden md:inline" style={{ lineHeight: 1.75 }}>
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
