"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

const iconProps = {
  width: 44,
  height: 44,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#67bc6a",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const features: Feature[] = [
  {
    title: "Three Master Bedrooms",
    description:
      "Spacious ensuite rooms with premium linens and tropical views.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 10h18v8H3z" />
        <path d="M7 10V7a2 2 0 012-2h6a2 2 0 012 2v3" />
        <path d="M3 18v2M21 18v2" />
      </svg>
    ),
  },
  {
    title: "Semi-Outdoor Bathrooms",
    description:
      "Open-air bathing experiences surrounded by lush greenery.",
    icon: (
      <svg {...iconProps}>
        <path d="M4 12h16" />
        <path d="M6 12V8a2 2 0 012-2h8a2 2 0 012 2v4" />
        <path d="M8 20v-4M16 20v-4" />
        <circle cx="12" cy="6" r="1" />
      </svg>
    ),
  },
  {
    title: "Large Living and Dining",
    description: "Open-plan spaces perfect for gathering and entertaining.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="8" width="18" height="10" rx="1" />
        <path d="M7 8V5M17 8V5" />
        <path d="M3 14h18" />
      </svg>
    ),
  },
  {
    title: "8x3 Metre Private Pool",
    description: "Your own sparkling pool for morning laps and sunset dips.",
    icon: (
      <svg {...iconProps}>
        <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      </svg>
    ),
  },
  {
    title: "Fully Equipped Kitchen",
    description:
      "Modern appliances and cookware for effortless self-catering.",
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M4 10h16" />
        <path d="M10 4v6M14 4v6" />
      </svg>
    ),
  },
  {
    title: "Free WiFi Throughout",
    description:
      "High-speed connectivity across every corner of your villa.",
    icon: (
      <svg {...iconProps}>
        <path d="M5 12.55a11 11 0 0114.08 0" />
        <path d="M8.53 16.11a6 6 0 016.95 0" />
        <circle cx="12" cy="20" r="1" />
      </svg>
    ),
  },
  {
    title: "Attentive Staff",
    description: "Dedicated team ready to assist with every request.",
    icon: (
      <svg {...iconProps}>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Sun Deck and Gazebo",
    description:
      "Shaded lounging areas for reading, yoga, or afternoon naps.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8v4" />
        <path d="M5 20h14" />
        <path d="M8 20l4-8 4 8" />
      </svg>
    ),
  },
  {
    title: "Family Friendly",
    description:
      "Safe, spacious environments designed for guests of all ages.",
    icon: (
      <svg {...iconProps}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

function slideStyle(
  isVisible: boolean,
  fromX: number,
  delayMs = 0,
): CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : `translateX(${fromX}px)`,
    transition: `opacity 0.7s ease-out ${delayMs}ms, transform 0.7s ease-out ${delayMs}ms`,
  };
}

function FeatureRow({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isOdd = index % 2 === 0;

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  const iconFromX = isOdd ? -40 : 40;
  const textFromX = isOdd ? 40 : -40;

  const divider = (
    <div
      className="hidden shrink-0 sm:block"
      style={{
        width: "1px",
        height: "60px",
        backgroundColor: "#67bc6a",
        opacity: 0.35,
      }}
    />
  );

  const iconBlock = (
    <div
      className="flex shrink-0 items-center justify-center"
      style={{
        width: "56px",
        ...slideStyle(isVisible, iconFromX),
      }}
    >
      {feature.icon}
    </div>
  );

  const textBlock = (
    <div className="flex-1">
      <h4
        className="mb-1.5 text-[#1A1A1A]"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "24px",
          fontWeight: 300,
          lineHeight: 1.3,
          ...slideStyle(isVisible, textFromX),
        }}
      >
        {feature.title}
      </h4>
      <p
        className="text-[#6B6B6B]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "13px",
          fontWeight: 300,
          lineHeight: 1.65,
          ...slideStyle(isVisible, textFromX, 100),
        }}
      >
        {feature.description}
      </p>
    </div>
  );

  return (
    <div ref={rowRef}>
      <div
        className="feature-row-hover flex flex-col items-center gap-6 py-8 text-center md:flex-row md:items-center md:py-10 md:text-left"
      >
        <div className="flex w-full flex-col items-center gap-6 md:hidden">
          {iconBlock}
          {textBlock}
        </div>
        <div className="hidden w-full md:flex md:items-center md:gap-6">
          {isOdd ? (
            <>
              {iconBlock}
              {divider}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {divider}
              {iconBlock}
            </>
          )}
        </div>
      </div>
      {index < features.length - 1 && (
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(28, 46, 32, 0.1)",
          }}
        />
      )}
    </div>
  );
}

export default function Features() {
  return (
    <section className="bg-[#F7F3EE] py-12 md:py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="mb-12 text-center">
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
            Amenities
          </p>
          <h2
            className="text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            Top Features of Our Luxury Villas
          </h2>
        </div>

        <div>
          {features.map((feature, index) => (
            <FeatureRow key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
