"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { AdminEditableText } from "@/components/admin/AdminEditableText";

const MAPS_URL =
  "https://maps.google.com/?q=Jl.+Bidadari+II+E,+Seminyak,+Bali,+Indonesia";

const KEY_CARDS = [
  { labelKey: "details.location_label", valueKey: "details.location_value", href: MAPS_URL },
  { labelKey: "details.size_label", valueKey: "details.size_value" },
  { labelKey: "details.bedrooms_bathrooms_label", valueKey: "details.bedrooms_bathrooms_value" },
  { labelKey: "details.pool_label", valueKey: "details.pool_value" },
  { labelKey: "details.checkin_label", valueKey: "details.checkin_value" },
  { labelKey: "details.transfer_label", valueKey: "details.transfer_value" },
] as const;

const INCLUDED_KEYS = [
  "details.included.1",
  "details.included.2",
  "details.included.3",
  "details.included.4",
] as const;

function InfoCard({
  labelKey,
  valueKey,
  href,
  index,
}: {
  labelKey: string;
  valueKey: string;
  href?: string;
  index: number;
}) {
  const inner = (
    <>
      <p
        className="mb-2 text-[var(--sand)]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.5625rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          lineHeight: 1.4,
        }}
      >
        <AdminEditableText blockKey={labelKey} as="span" />
      </p>
      <p
        className="text-[var(--dark)]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.875rem",
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        <AdminEditableText blockKey={valueKey} as="span" />
      </p>
    </>
  );

  const className =
    "card-lift flex h-full min-h-[96px] flex-col justify-center rounded-sm border border-[var(--text)]/10 bg-white px-3 py-4 sm:min-h-[104px] sm:px-4";

  return (
    <ScrollReveal direction="pop" delay={index * 70}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className} block transition-all duration-300 ease-in-out hover:border-[var(--sand)]`}
        >
          {inner}
        </a>
      ) : (
        <div className={className}>{inner}</div>
      )}
    </ScrollReveal>
  );
}

export default function VillaKeyInfo() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {KEY_CARDS.map((card, i) => (
          <InfoCard
            key={card.labelKey}
            labelKey={card.labelKey}
            valueKey={card.valueKey}
            href={"href" in card ? card.href : undefined}
            index={i}
          />
        ))}
      </div>

      <ScrollReveal delay={420} className="mt-5">
        <p
          className="mb-3 text-center text-[var(--text-muted)] md:text-left"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.625rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <AdminEditableText blockKey="details.included_heading" as="span" />
        </p>
        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
          {INCLUDED_KEYS.map((blockKey, i) => (
            <span
              key={blockKey}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sand)]/40 bg-[var(--sand)]/10 px-3 py-1.5 text-[var(--dark)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                fontWeight: 400,
                animationDelay: `${i * 80}ms`,
              }}
            >
              <span className="text-[var(--sand)]" aria-hidden="true">
                ✦
              </span>
              <AdminEditableText blockKey={blockKey} as="span" />
            </span>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
