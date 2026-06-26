"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { getVillaBySlug } from "@/lib/villas";

const MAPS_URL =
  "https://maps.google.com/?q=Jl.+Bidadari+II+E,+Seminyak,+Bali,+Indonesia";

const INCLUDED_TAGS = [
  { label: "Daily Cleaning", icon: "✦" },
  { label: "Free WiFi", icon: "✦" },
  { label: "Free Airport Transfer", icon: "✦" },
  { label: "Baby Crib on Request", icon: "✦" },
];

type KeyCard = {
  label: string;
  value: string;
  href?: string;
};

function buildKeyCards(slug: string): KeyCard[] {
  const villa = getVillaBySlug(slug);
  if (!villa) return [];

  const { stats } = villa;
  return [
    {
      label: "Location, Seminyak Bali",
      value: "Jl. Bidadari II E, Seminyak",
      href: MAPS_URL,
    },
    { label: "Size", value: `${stats.sizeM2} m2` },
    {
      label: "Bedrooms & Bathrooms",
      value: `${stats.bedroomCount} Bed / ${stats.bathroomCount} Bath`,
    },
    { label: "Pool", value: "Private" },
    { label: "Check-in & Check-out", value: "14:00 / 11:00" },
    { label: "Airport Transfer", value: "Free" },
  ];
}

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
          fontSize: "0.5625rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          lineHeight: 1.4,
        }}
      >
        {label}
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
        {value}
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

type VillaKeyInfoProps = {
  slug: string;
};

export default function VillaKeyInfo({ slug }: VillaKeyInfoProps) {
  const cards = buildKeyCards(slug);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {cards.map((card, i) => (
          <InfoCard
            key={card.label}
            label={card.label}
            value={card.value}
            href={card.href}
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
          Included
        </p>
        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
          {INCLUDED_TAGS.map((tag, i) => (
            <span
              key={tag.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sand)]/40 bg-[var(--sand)]/10 px-3 py-1.5 text-[var(--dark)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                fontWeight: 400,
                animationDelay: `${i * 80}ms`,
              }}
            >
              <span className="text-[var(--sand)]" aria-hidden="true">
                {tag.icon}
              </span>
              {tag.label}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
