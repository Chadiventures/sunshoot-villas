"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AdminEditableText } from "@/components/admin/AdminEditableText";

const locationEmojis = ["🏖️", "🍦", "🎭"];

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
          <AdminEditableText blockKey="location.title" as="span" />
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {locationEmojis.map((emoji, index) => (
            <div
              key={`location.item_${index + 1}.text`}
              className="text-center"
              style={columnStyle(isVisible, columnDelays[index])}
            >
              <span className="mb-4 block text-3xl" aria-hidden="true">
                {emoji}
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
                <AdminEditableText blockKey={`location.item_${index + 1}.text`} as="span" />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
