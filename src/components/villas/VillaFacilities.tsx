import type { VillaFacilities } from "@/lib/villas";
import { FACILITY_LABELS } from "@/lib/villas";

type VillaFacilitiesProps = {
  facilities: VillaFacilities;
};

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
      width="16"
      height="16"
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
  const entries = Object.entries(FACILITY_LABELS) as [
    keyof VillaFacilities,
    string,
  ][];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map(([key, label]) => {
        const available = facilities[key];
        return (
          <div
            key={key}
            className="flex items-center gap-3 py-2"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              fontWeight: 300,
              color: available ? "#1A1A1A" : "rgba(107,107,107,0.6)",
            }}
          >
            <span
              className={
                available
                  ? "text-[var(--brand-green)]"
                  : "text-[rgba(107,107,107,0.4)]"
              }
            >
              {available ? <CheckIcon /> : <XIcon />}
            </span>
            {label}
          </div>
        );
      })}
    </div>
  );
}
