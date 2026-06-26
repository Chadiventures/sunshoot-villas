"use client";

import ScrollReveal from "@/components/ScrollReveal";
import type { ReactNode } from "react";

const iconClassName =
  "h-[18px] w-[18px] shrink-0 sm:h-[22px] sm:w-[22px]";

function RuleIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      className={iconClassName}
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

type HouseRule = {
  title: string;
  description: string;
  icon: ReactNode;
};

const HOUSE_RULES: HouseRule[] = [
  {
    title: "Check-in",
    description: "From 14:00",
    icon: (
      <RuleIcon>
        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
        <path d="M10 17l5-5-5-5M15 12H3" />
      </RuleIcon>
    ),
  },
  {
    title: "Check-out",
    description: "By 11:00",
    icon: (
      <RuleIcon>
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <path d="M16 17l-5-5 5-5M11 12h12" />
      </RuleIcon>
    ),
  },
  {
    title: "No smoking indoors",
    description: "Designated outdoor smoking area available",
    icon: (
      <RuleIcon>
        <path d="M18 12H2v4h16v-4z" />
        <path d="M22 12V8H18" />
        <path d="M7 12v4" />
        <path d="M11 12v4" />
      </RuleIcon>
    ),
  },
  {
    title: "Quiet hours",
    description: "00:00 to 07:00",
    icon: (
      <RuleIcon>
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </RuleIcon>
    ),
  },
  {
    title: "Pets not allowed",
    description: "",
    icon: (
      <RuleIcon>
        <circle cx="11" cy="4" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="20" cy="16" r="2" />
        <path d="M9 10a5 5 0 005 8v3" />
        <path d="M4 2L20 22" />
      </RuleIcon>
    ),
  },
  {
    title: "Children of all ages welcome",
    description: "",
    icon: (
      <RuleIcon>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </RuleIcon>
    ),
  },
  {
    title: "Baby crib",
    description: "Free on request",
    icon: (
      <RuleIcon>
        <path d="M2 4v16" />
        <path d="M2 8h18a4 4 0 014 4v8" />
        <path d="M2 17h20" />
        <path d="M6 8V6a2 2 0 012-2h2" />
      </RuleIcon>
    ),
  },
  {
    title: "Extra bed",
    description: "Rp 150,000 per person per night on request",
    icon: (
      <RuleIcon>
        <path d="M2 4v16" />
        <path d="M2 8h20v8H2z" />
        <path d="M6 8V6a2 2 0 012-2h1" />
        <path d="M18 8V6a2 2 0 00-2-2h-1" />
      </RuleIcon>
    ),
  },
];

export default function VillaHouseRules() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container-site">
        <ScrollReveal className="mb-8 text-center md:mb-10">
          <h2
            className="text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 300,
            }}
          >
            Good to Know
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
          {HOUSE_RULES.map((rule, index) => (
            <ScrollReveal key={rule.title} delay={index * 60}>
              <div className="card-lift flex h-full gap-2 rounded-sm border border-[var(--text)]/10 bg-[var(--bg)] p-[10px] sm:gap-3 sm:px-5 sm:py-5">
                <span className="shrink-0 text-[var(--sand)]">{rule.icon}</span>
                <div className="min-w-0">
                  <p
                    className="mb-0.5 text-[12px] text-[var(--dark)] sm:mb-1 sm:text-[0.875rem]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 500,
                    }}
                  >
                    {rule.title}
                  </p>
                  {rule.description ? (
                    <p
                      className="text-[12px] text-[var(--text-muted)] sm:text-[0.8125rem]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontWeight: 300,
                        lineHeight: 1.6,
                      }}
                    >
                      {rule.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
