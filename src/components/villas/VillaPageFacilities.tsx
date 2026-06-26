import type { VillaFacilities as VillaFacilitiesType } from "@/lib/villas";
import { FACILITY_LABELS } from "@/lib/villas";
import ScrollReveal from "@/components/ScrollReveal";
import type { ReactNode } from "react";

type VillaPageFacilitiesProps = {
  facilities: VillaFacilitiesType;
};

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FACILITY_ICONS: Record<keyof VillaFacilitiesType, ReactNode> = {
  pool: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
      <path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
    </svg>
  ),
  kitchen: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  tv: (
    <svg {...iconProps} aria-hidden="true">
      <rect x="2" y="7" width="20" height="15" rx="2" />
      <path d="M17 2l-5 5-5-5" />
    </svg>
  ),
  tvCable: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 010 8.49M7.76 16.24a6 6 0 010-8.49M19.07 4.93a10 10 0 010 14.14M4.93 19.07a10 10 0 010-14.14" />
    </svg>
  ),
  dvd: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  ac: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
    </svg>
  ),
  breakfast: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <path d="M6 1v3M10 1v3M14 1v3" />
    </svg>
  ),
  wifi: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M5 12.55a11 11 0 0114.08 0" />
      <path d="M8.53 16.11a6 6 0 016.95 0" />
      <path d="M12 20h.01" />
    </svg>
  ),
  parking: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.1 1v11c0 .6.5 1 1.1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  ),
  petsAllowed: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 015 5v3.5a3.5 3.5 0 01-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 015.5 10Z" />
    </svg>
  ),
  suitableForEvents: (
    <svg {...iconProps} aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  bathtub: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M9 6 6.5 3.5a1.5 1.5 0 00-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 002 2h12a2 2 0 002-2v-5" />
      <path d="M10 15H6.5a1.5 1.5 0 000 3H20" />
    </svg>
  ),
  heating: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
    </svg>
  ),
  safetyBox: (
    <svg {...iconProps} aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  dryer: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2" />
    </svg>
  ),
  washer: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M21 12a9 9 0 11-6.219-8.56" />
      <path d="M12 3v6l4 2" />
    </svg>
  ),
  doorman: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  firstAidKit: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 8v4M10 10h4" />
    </svg>
  ),
  mosquitoNet: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12 2v4M6 6l12 12M18 6L6 18" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  ironingFacilities: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M6 2h12l-2 8H8L6 2zM4 14h16v2H4z" />
    </svg>
  ),
  coffeeMaker: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
    </svg>
  ),
  outdoorFurniture: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 10h16M6 10V6h12v4M8 20v-4M16 20v-4" />
    </svg>
  ),
  childSafetyGates: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 4v16M20 4v16M4 12h16" />
    </svg>
  ),
  babyCrib: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M2 9h20v6H2zM6 9V5h12v4" />
    </svg>
  ),
  hairdryer: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2" />
    </svg>
  ),
  bidet: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12 2v6M8 8h8M6 14h12v6H6z" />
    </svg>
  ),
  oven: (
    <svg {...iconProps} aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 14h8" />
    </svg>
  ),
  microwave: (
    <svg {...iconProps} aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h4M14 10v4" />
    </svg>
  ),
  toaster: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M6 2h12v16H6zM8 18h8v4H8z" />
    </svg>
  ),
};

function StatusIcon({ available }: { available: boolean }) {
  if (available) {
    return (
      <span className="text-[#2d8a4e]" aria-label="Available">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
    );
  }
  return (
    <span className="text-[#c44]" aria-label="Not available">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </span>
  );
}

export default function VillaPageFacilities({
  facilities,
}: VillaPageFacilitiesProps) {
  const entries = Object.entries(FACILITY_LABELS) as [
    keyof VillaFacilitiesType,
    string,
  ][];

  return (
    <section className="bg-[var(--bg)] py-14 md:py-20">
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
            Villa Facilities
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {entries.map(([key, label], index) => {
            const available = facilities[key];
            return (
              <ScrollReveal key={key} delay={index * 60}>
                <div
                  className={`card-lift flex items-center gap-3 rounded-sm border bg-white px-3 py-3 sm:px-4 sm:py-4 ${
                    available
                      ? "border-[var(--text)]/8"
                      : "border-[var(--text)]/5 opacity-75"
                  }`}
                >
                <span
                  className={`shrink-0 ${
                    available ? "text-[var(--sand)]" : "text-[var(--text-muted)]"
                  }`}
                >
                  {FACILITY_ICONS[key]}
                </span>
                <span
                  className="min-w-0 flex-1 leading-snug"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8125rem",
                    fontWeight: 400,
                    color: available ? "var(--text)" : "var(--text-muted)",
                  }}
                >
                  {label}
                </span>
                <StatusIcon available={available} />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
