"use client";

import type { VillaFacilities as VillaFacilitiesType } from "@/lib/villas";
import { FACILITY_LABELS } from "@/lib/villas";
import ScrollReveal from "@/components/ScrollReveal";
import type { ReactNode } from "react";

type VillaPageFacilitiesProps = {
  facilities: VillaFacilitiesType;
};

const HIDDEN_FACILITIES: (keyof VillaFacilitiesType)[] = [
  "petsAllowed",
  "suitableForEvents",
];

const iconProps = {
  width: 16,
  height: 16,
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
    </svg>
  ),
  kitchen: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
      <path d="M7 2v20" />
    </svg>
  ),
  tv: (
    <svg {...iconProps} aria-hidden="true">
      <rect x="2" y="7" width="20" height="15" rx="2" />
    </svg>
  ),
  tvCable: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 010 8.49" />
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
      <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2" />
    </svg>
  ),
  breakfast: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
    </svg>
  ),
  wifi: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M5 12.55a11 11 0 0114.08 0" />
      <path d="M12 20h.01" />
    </svg>
  ),
  parking: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M5 17H3v-6h13" />
    </svg>
  ),
  petsAllowed: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="11" cy="4" r="2" />
      <path d="M9 10a5 5 0 015 5v3" />
    </svg>
  ),
  suitableForEvents: (
    <svg {...iconProps} aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
    </svg>
  ),
  bathtub: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M6 17h12v-3H6zM8 6v4M16 6v4" />
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 2" />
    </svg>
  ),
  washer: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 2" />
    </svg>
  ),
  doorman: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  firstAidKit: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12 8v4M10 10h4" />
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  mosquitoNet: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  ironingFacilities: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M6 2h12l-2 8H8L6 2z" />
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
      <path d="M4 10h16M8 20v-4M16 20v-4" />
    </svg>
  ),
  childSafetyGates: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 4v16M20 4v16M4 12h16" />
    </svg>
  ),
  babyCrib: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M2 9h20v6H2z" />
    </svg>
  ),
  hairdryer: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M9.59 4.59A2 2 0 1111 8H2" />
    </svg>
  ),
  bidet: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12 2v6M6 14h12v6H6z" />
    </svg>
  ),
  oven: (
    <svg {...iconProps} aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
    </svg>
  ),
  microwave: (
    <svg {...iconProps} aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="2" />
    </svg>
  ),
  toaster: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M6 2h12v16H6z" />
    </svg>
  ),
};

function FacilityPill({
  facilityKey,
  label,
  index,
}: {
  facilityKey: keyof VillaFacilitiesType;
  label: string;
  index: number;
}) {
  return (
    <ScrollReveal direction="pop" delay={index * 45}>
      <span
        className="inline-flex items-center gap-2 rounded-full border border-[#1A2E1A]/15 bg-[#1A2E1A]/8 px-3 py-2 text-[#1A2E1A]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.75rem",
          fontWeight: 400,
        }}
      >
        <span className="text-[#2d8a4e]">{FACILITY_ICONS[facilityKey]}</span>
        {label}
      </span>
    </ScrollReveal>
  );
}

export default function VillaPageFacilities({
  facilities,
}: VillaPageFacilitiesProps) {
  const included = (
    Object.entries(FACILITY_LABELS) as [keyof VillaFacilitiesType, string][]
  ).filter(([key]) => !HIDDEN_FACILITIES.includes(key) && facilities[key]);

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

        <div>
          <h3
            className="mb-4 text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            What is included
          </h3>
          <div className="flex flex-wrap gap-2">
            {included.map(([key, label], index) => (
              <FacilityPill
                key={key}
                facilityKey={key}
                label={label}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
