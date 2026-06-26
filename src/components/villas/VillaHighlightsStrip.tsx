"use client";

import type { ReactNode } from "react";

function IconWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const HIGHLIGHTS = [
  {
    label: "Private Pool",
    icon: (
      <IconWrapper className="h-5 w-5 sm:h-7 sm:w-7">
        <path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" strokeLinecap="round" />
        <path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" strokeLinecap="round" />
      </IconWrapper>
    ),
  },
  {
    label: "Daily Cleaning",
    icon: (
      <IconWrapper className="h-5 w-5 sm:h-7 sm:w-7">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 19h14" strokeLinecap="round" />
        <path d="M8 19v2M16 19v2" strokeLinecap="round" />
      </IconWrapper>
    ),
  },
  {
    label: "Free Airport Transfer",
    icon: (
      <IconWrapper className="h-5 w-5 sm:h-7 sm:w-7">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 19 4c-1 0-2 1-3.5 2.5L12 10 3.8 8.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </IconWrapper>
    ),
  },
];

export default function VillaHighlightsStrip() {
  return (
    <div className="villa-highlights-strip max-h-[60px] bg-[var(--sand)] sm:max-h-none">
      <div className="container-site">
        <div className="grid grid-cols-3 divide-x divide-[var(--dark)]/10">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={item.label}
              className="villa-highlights-strip-in flex max-h-[60px] flex-col items-center justify-center gap-0.5 p-3 text-center sm:max-h-none sm:gap-2 sm:px-4 sm:py-6"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div
                className="villa-highlight-bob shrink-0 text-[var(--dark)]"
                style={{ animationDelay: `${index * 0.35}s` }}
              >
                {item.icon}
              </div>
              <p
                className="line-clamp-2 leading-tight text-[var(--dark)] sm:line-clamp-none sm:leading-normal"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                <span className="sm:hidden">{item.label}</span>
                <span
                  className="hidden sm:inline"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
                >
                  {item.label}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
