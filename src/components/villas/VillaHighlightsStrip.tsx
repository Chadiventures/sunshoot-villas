"use client";

const HIGHLIGHTS = [
  {
    label: "Private Pool",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
        <path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
      </svg>
    ),
  },
  {
    label: "Daily Cleaning",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        <path d="M5 19h14" />
        <path d="M8 19v2M16 19v2" />
      </svg>
    ),
  },
  {
    label: "Free Airport Transfer",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 19 4c-1 0-2 1-3.5 2.5L12 10 3.8 8.2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
];

export default function VillaHighlightsStrip() {
  return (
    <div className="villa-highlights-strip bg-[var(--sand)]">
      <div className="container-site">
        <div className="grid grid-cols-1 divide-y divide-[var(--dark)]/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={item.label}
              className="villa-highlights-strip-in flex flex-col items-center gap-2 px-4 py-5 text-center sm:py-6"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div
                className="villa-highlight-bob text-[var(--dark)]"
                style={{ animationDelay: `${index * 0.35}s` }}
              >
                {item.icon}
              </div>
              <p
                className="text-[var(--dark)]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
