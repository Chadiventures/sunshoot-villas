"use client";

import ImageCollage from "@/components/ImageCollage";
import { useRef, useEffect, useState, type CSSProperties } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
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

  const slideStyle = (fromLeft: boolean): CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translateX(0)"
      : `translateX(${fromLeft ? "-60px" : "60px"})`,
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#F7F3EE] py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div className="relative" style={slideStyle(true)}>
          <ImageCollage />
        </div>

        <div ref={textRef} style={slideStyle(false)}>
          <p
            className="mb-4 text-[#67bc6a]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            The Sahana Story
          </p>

          <h2
            className="mb-8 text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
            }}
          >
            Where Bali&apos;s Heart{" "}
            <em className="text-[#67bc6a]">Meets</em> Modern Luxury
          </h2>

          <p
            className="mb-6 text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Nestled on Oberoi Street in the heart of Seminyak, Sahana Villas
            offers an intimate escape where tropical serenity meets refined
            contemporary design. Each villa is a private sanctuary with its own
            pool, open-air living spaces, and the gentle rhythm of Balinese
            hospitality.
          </p>

          <p
            className="mb-10 text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Whether you arrive as a family, a couple, or a group of friends,
            Sahana welcomes you with spacious bedrooms, attentive staff, and
            everything you need to feel at home in paradise.
          </p>

          <a
            href="/about"
            className="btn-alive group inline-flex items-center gap-2 border-b border-[#1A1A1A] pb-1 text-[#1A1A1A] transition-colors duration-300 hover:border-[#67bc6a] hover:text-[#67bc6a]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              fontWeight: 400,
              letterSpacing: "0.05em",
            }}
          >
            Read More About Us
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
