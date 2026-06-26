"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const locationHighlights = [
  {
    emoji: "🏖️",
    text: "15 min walk to Seminyak Beach and KuDeTa, perfect for building sandcastles and watching the sunset",
  },
  {
    emoji: "🍦",
    text: "Surrounded by cafes and restaurants with kids menus, ice cream and fresh juice bars",
  },
  {
    emoji: "🎭",
    text: "Easy access to family-friendly activities, from water parks to cultural experiences",
  },
];

const columnDelays = [0, 200, 400];

function columnStyle(isVisible: boolean, delayMs: number): CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.7s ease-out ${delayMs}ms, transform 0.7s ease-out ${delayMs}ms`,
  };
}

export default function FamilyLocationHighlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#c1bab2] py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2
          className="mb-12 text-center text-[#1A1A1A]"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          The Perfect Family Base in Seminyak
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {locationHighlights.map((item, index) => (
            <div
              key={item.text}
              className="text-center"
              style={columnStyle(isVisible, columnDelays[index])}
            >
              <span className="mb-4 block text-3xl" aria-hidden="true">
                {item.emoji}
              </span>
              <p
                className="text-[#6B6B6B]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
