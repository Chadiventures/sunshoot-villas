import type { VillaFacilities } from "@/lib/villas";
import { FACILITY_LABELS } from "@/lib/villas";

type VillaFacilitiesProps = {
  facilities: VillaFacilities;
};

const HIDDEN_FACILITIES: (keyof VillaFacilities)[] = [
  "petsAllowed",
  "suitableForEvents",
];

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function VillaFacilities({ facilities }: VillaFacilitiesProps) {
  const entries = (
    Object.entries(FACILITY_LABELS) as [keyof VillaFacilities, string][]
  ).filter(([key]) => !HIDDEN_FACILITIES.includes(key));

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map(([key, label]) => {
        const available = facilities[key];
        return (
          <div
            key={key}
            className="flex items-center gap-3 rounded-sm border border-[var(--text)]/8 bg-white px-4 py-3"
          >
            <span
              className={
                available ? "text-[var(--sand)]" : "text-[var(--text-muted)]/40"
              }
            >
              {available ? <CheckIcon /> : <XIcon />}
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                fontWeight: 400,
                color: available ? "var(--text)" : "var(--text-muted)",
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
