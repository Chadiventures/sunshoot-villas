"use client";

import ScrollReveal from "@/components/ScrollReveal";

const MAPS_URL =
  "https://maps.google.com/?q=Jl.+Bidadari+II+E,+Seminyak,+Bali,+Indonesia";

const CARDS = [
  { label: "Location", value: "Jl. Bidadari II E, Seminyak", href: MAPS_URL },
  { label: "Bedrooms", value: "2" },
  { label: "Pool", value: "Private" },
  { label: "Check-in", value: "14:00" },
  { label: "Check-out", value: "12:00" },
  { label: "Distance to Beach", value: "10 min walk" },
];

function InfoCard({
  label,
  value,
  href,
  index,
}: {
  label: string;
  value: string;
  href?: string;
  index: number;
}) {
  const inner = (
    <>
      <p
        className="mb-2 text-[var(--sand)]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.625rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
      <p
        className="text-[var(--dark)]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.9375rem",
          fontWeight: 400,
          lineHeight: 1.4,
        }}
      >
        {value}
      </p>
    </>
  );

  const className =
    "card-lift flex h-full min-h-[100px] flex-col justify-center rounded-sm border border-[var(--text)]/10 bg-white px-4 py-4 sm:min-h-[110px]";

  return (
    <ScrollReveal delay={index * 80}>
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
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {CARDS.map((card, i) => (
        <InfoCard
          key={card.label}
          label={card.label}
          value={card.value}
          href={card.href}
          index={i}
        />
      ))}
    </div>
  );
}
