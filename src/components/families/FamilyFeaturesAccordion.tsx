"use client";

import { useState, type ReactNode } from "react";
import { AdminEditableText } from "@/components/admin/AdminEditableText";

interface FamilyFeature {
  bulletCount?: number;
  icon: ReactNode;
  isMenu?: boolean;
}

const iconProps = {
  width: 32,
  height: 32,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#67bc6a",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const menuEmojis = ["🍝", "🍜", "🍗", "🍟", "🍚"];

const features: FamilyFeature[] = [
  {
    bulletCount: 4,
    icon: (
      <svg {...iconProps}>
        <path d="M4 4v16M8 4v16M12 4v16M16 4v16M20 4v16" />
        <path d="M3 8h18M3 16h18" />
      </svg>
    ),
  },
  {
    bulletCount: 6,
    icon: (
      <svg {...iconProps}>
        <path d="M3 10h18v8H3z" />
        <path d="M7 10V7a2 2 0 012-2h6a2 2 0 012 2v3" />
      </svg>
    ),
  },
  {
    isMenu: true,
    icon: (
      <svg {...iconProps}>
        <path d="M8 3v8M8 11v10" />
        <path d="M16 3v4c0 2-2 3-2 5v9" />
        <path d="M6 7h4M14 7h4" />
      </svg>
    ),
  },
  {
    bulletCount: 4,
    icon: (
      <svg {...iconProps}>
        <path d="M12 22V12" />
        <path d="M12 12c-3-4-7-4-7-8 2 0 4 1 7 4" />
        <path d="M12 12c3-4 7-4 7-8-2 0-4 1-7 4" />
      </svg>
    ),
  },
  {
    bulletCount: 4,
    icon: (
      <svg {...iconProps}>
        <path d="M3 10l9-7 9 7v10H3z" />
        <path d="M9 20V12h6v8" />
      </svg>
    ),
  },
  {
    bulletCount: 4,
    icon: (
      <svg {...iconProps}>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M18 8.5c.5 1 1.5 1.5 2.5 1.5-.5 1.5-2 2.5-3.5 2.5" />
      </svg>
    ),
  },
  {
    bulletCount: 4,
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l8 4v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
      </svg>
    ),
  },
  {
    bulletCount: 3,
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8v3" />
        <path d="M5 20h14" />
        <path d="M8 20l4-8 4 8" />
      </svg>
    ),
  },
];

function BulletList({
  prefix,
  count,
  expanded,
}: {
  prefix: string;
  count: number;
  expanded?: boolean;
}) {
  return (
    <ul className="space-y-2.5">
      {Array.from({ length: count }, (_, i) => (
        <li key={`${prefix}.bullet_${i + 1}`} className="flex items-start gap-2.5">
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#67bc6a]"
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: 1.65,
              color: expanded ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.65)",
            }}
          >
            <AdminEditableText blockKey={`${prefix}.bullet_${i + 1}`} as="span" />
          </span>
        </li>
      ))}
    </ul>
  );
}

function KidsMenuCard() {
  return (
    <div
      style={{
        backgroundColor: "#F7F3EE",
        border: "2px dashed #67bc6a",
        borderRadius: "12px",
        padding: "24px",
      }}
    >
      <div className="mb-4 flex justify-center gap-2" aria-hidden="true">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: "#B07B72" }}
        />
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: "#67bc6a" }}
        />
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: "#8FA99A" }}
        />
      </div>

      <h4
        className="mb-5 text-center text-[#1A1A1A]"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "22px",
          fontWeight: 400,
          fontStyle: "italic",
        }}
      >
        <AdminEditableText blockKey="features.menu.title" as="span" />
      </h4>

      <ul className="space-y-2">
        {menuEmojis.map((emoji, i) => (
          <li key={`features.menu.item_${i + 1}.text`} className="flex items-start gap-2">
            <span className="shrink-0 text-base" aria-hidden="true">
              {emoji}
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "#1A1A1A",
              }}
            >
              <AdminEditableText blockKey={`features.menu.item_${i + 1}.text`} as="span" />
            </span>
          </li>
        ))}
      </ul>

      <p
        className="mt-5 text-center text-[#6B6B6B]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "12px",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.6,
        }}
      >
        <AdminEditableText blockKey="features.menu.note" as="span" />
      </p>
    </div>
  );
}

function FeatureCard({
  feature,
  featureIndex,
  activeIndex,
  onToggle,
}: {
  feature: FamilyFeature;
  featureIndex: number;
  activeIndex: number | null;
  onToggle: (index: number) => void;
}) {
  const isExpanded = activeIndex === featureIndex;
  const blockPrefix = `features.${featureIndex + 1}`;

  return (
    <button
      type="button"
      onClick={() => onToggle(featureIndex)}
      aria-expanded={isExpanded}
      className="group w-full self-start text-left transition-all duration-300"
      style={{
        height: isExpanded ? "auto" : "80px",
        overflow: "hidden",
        padding: isExpanded ? "28px" : "20px 28px",
        borderRadius: "4px",
        border: `1px solid ${
          isExpanded ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"
        }`,
        backgroundColor: isExpanded
          ? "rgba(255, 255, 255, 0.15)"
          : "rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        if (!isExpanded) {
          e.currentTarget.style.borderColor = "#67bc6a";
        }
      }}
      onMouseLeave={(e) => {
        if (!isExpanded) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        }
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="shrink-0">{feature.icon}</div>
          <h3
            className="truncate"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: 1.3,
              color: "#FFFFFF",
              transition: "color 0.3s ease",
            }}
          >
            <AdminEditableText blockKey={`${blockPrefix}.title`} as="span" />
          </h3>
        </div>
        <span
          className="shrink-0 transition-transform duration-300"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "20px",
            fontWeight: 300,
            lineHeight: 1,
            color: isExpanded ? "#FFFFFF" : "#67bc6a",
            transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        >
          +
        </span>
      </div>

      {isExpanded && (
        <div className="pt-4" style={{ paddingLeft: "48px" }}>
          {feature.isMenu ? (
            <KidsMenuCard />
          ) : (
            <BulletList
              prefix={blockPrefix}
              count={feature.bulletCount ?? 0}
              expanded
            />
          )}
        </div>
      )}
    </button>
  );
}

export default function FamilyFeaturesAccordion({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  const content = (
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="mb-14 text-center">
        <p
          className="mb-3 text-[#67bc6a]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          <AdminEditableText blockKey="features.eyebrow" as="span" />
        </p>
        <h2
          className="text-white"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          <AdminEditableText blockKey="features.title" as="span" />
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {features.map((feature, index) => (
          <div
            key={`features.${index + 1}`}
            className="w-full md:max-w-[calc(50%-16px)] md:flex-[0_0_calc(50%-16px)] lg:max-w-[calc(33.333%-16px)] lg:flex-[0_0_calc(33.333%-16px)]"
          >
            <FeatureCard
              feature={feature}
              featureIndex={index}
              activeIndex={activeIndex}
              onToggle={handleToggle}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="bg-[#c1bab2]" style={{ padding: "100px 0" }}>
      {content}
    </section>
  );
}
