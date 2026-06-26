"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { getVillaKeyInfoCards } from "@/lib/villas";

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

type VillaKeyInfoProps = {
  slug: string;
};

export default function VillaKeyInfo({ slug }: VillaKeyInfoProps) {
  const cards = getVillaKeyInfoCards(slug);

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
      <p
        className="mt-4 text-center text-[var(--text-muted)] lg:text-left"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.8125rem",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.6,
        }}
      >
        Baby crib and extra bed available on request
      </p>
    </div>
  );
}
