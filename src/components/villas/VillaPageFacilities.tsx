"use client";

import type { VillaFacilities as VillaFacilitiesType } from "@/lib/villas";
import ScrollReveal from "@/components/ScrollReveal";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { AdminCoreContext, useAdminContent } from "@/hooks/useAdminContent";
import { useCallback, useContext, useMemo, useState, type KeyboardEvent } from "react";
import { FACILITY_LABELS } from "@/lib/villas";

type VillaPageFacilitiesProps = {
  facilities: VillaFacilitiesType;
};

const DEFAULT_HIDDEN_FACILITY_KEYS: (keyof VillaFacilitiesType)[] = ["petsAllowed", "suitableForEvents"];

function parseFacilityTags(value: string): string[] {
  const parts = value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
  return Array.from(new Set(parts));
}

function defaultIncludedTags(facilities: VillaFacilitiesType): string[] {
  return (Object.keys(facilities) as (keyof VillaFacilitiesType)[])
    .filter((key) => !DEFAULT_HIDDEN_FACILITY_KEYS.includes(key) && facilities[key])
    .map((key) => FACILITY_LABELS[key]);
}

function FacilityPill({
  label,
  index,
  adminEditing,
  onRemove,
}: {
  label: string;
  index: number;
  adminEditing: boolean;
  onRemove?: () => void;
}) {
  return (
    <ScrollReveal direction="pop" delay={index * 45}>
      <span
        className="group inline-flex items-center gap-2 rounded-full border border-[#1A2E1A]/15 bg-[#1A2E1A]/8 px-3 py-2 text-[#1A2E1A]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.75rem",
          fontWeight: 400,
        }}
      >
        <span>{label}</span>
        {adminEditing ? (
          <button
            type="button"
            aria-label={`Remove ${label}`}
            onClick={onRemove}
            className="ml-1 text-[10px] leading-none text-[#1A2E1A]/60 opacity-0 transition-opacity hover:text-[#1A2E1A] group-hover:opacity-100"
          >
            ×
          </button>
        ) : null}
      </span>
    </ScrollReveal>
  );
}

export default function VillaPageFacilities({ facilities }: VillaPageFacilitiesProps) {
  const core = useContext(AdminCoreContext);
  const { pageSlug, getText, updateText } = useAdminContent();
  const adminEditing = Boolean(core?.adminMode && core?.authenticated);
  const [adding, setAdding] = useState(false);
  const [newTag, setNewTag] = useState("");

  const includedRaw = getText("facilities.included");
  const included = useMemo(() => {
    const parsed = parseFacilityTags(includedRaw);
    if (parsed.length > 0) return parsed;
    return defaultIncludedTags(facilities);
  }, [facilities, includedRaw]);

  const saveIncluded = useCallback(
    async (next: string[]) => {
      updateText("facilities.included", next.join(","));
      if (core) {
        await core.saveSection([pageSlug]);
      }
    },
    [core, pageSlug, updateText],
  );

  const removeTag = useCallback(
    (label: string) => {
      const next = included.filter((item) => item !== label);
      void saveIncluded(next);
    },
    [included, saveIncluded],
  );

  const onNewTagKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape") {
        setAdding(false);
        setNewTag("");
        return;
      }
      if (event.key !== "Enter") return;
      event.preventDefault();
      const trimmed = newTag.trim();
      if (!trimmed) return;
      if (included.includes(trimmed)) {
        setNewTag("");
        setAdding(false);
        return;
      }
      const next = [...included, trimmed];
      setNewTag("");
      setAdding(false);
      void saveIncluded(next);
    },
    [included, newTag, saveIncluded],
  );

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
            <AdminEditableText blockKey="amenities.title" as="span" />
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
            <AdminEditableText blockKey="amenities.subtitle" as="span" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {included.map((label, index) => (
              <FacilityPill
                key={`${label}-${index}`}
                label={label}
                index={index}
                adminEditing={adminEditing}
                onRemove={adminEditing ? () => removeTag(label) : undefined}
              />
            ))}
            {adminEditing ? (
              adding ? (
                <input
                  autoFocus
                  value={newTag}
                  onChange={(event) => setNewTag(event.target.value)}
                  onKeyDown={onNewTagKeyDown}
                  onBlur={() => {
                    setAdding(false);
                    setNewTag("");
                  }}
                  placeholder="Add facility"
                  className="rounded-full border border-[#1A2E1A]/20 bg-white/70 px-3 py-2 text-[0.75rem] text-[#1A2E1A] placeholder:text-[#1A2E1A]/45 focus:border-[#1A2E1A]/40 focus:outline-none"
                />
              ) : (
                <button
                  type="button"
                  aria-label="Add facility"
                  onClick={() => setAdding(true)}
                  className="inline-flex items-center rounded-full border border-dashed border-[#1A2E1A]/25 px-3 py-2 text-[0.75rem] text-[#1A2E1A]/70 transition-colors hover:border-[#1A2E1A]/45 hover:text-[#1A2E1A]"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                >
                  +
                </button>
              )
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
