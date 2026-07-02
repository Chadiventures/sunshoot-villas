"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdminEditableImage } from "@/components/admin/AdminEditableImage";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { useAdminContent } from "@/hooks/useAdminContent";

const SLIDE_COUNT = 5;

export default function FamilySafetyCarousel() {
  const { getText } = useAdminContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDE_COUNT);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const slideNum = activeIndex + 1;
  const slidePrefix = `carousel.slide_${slideNum}`;

  return (
    <section className="bg-[#F7F3EE]" style={{ padding: "36px 0 60px" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px]"
            style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.25)" }}
          >
            {Array.from({ length: SLIDE_COUNT }, (_, index) => (
              <div
                key={`carousel.slide_${index + 1}.image`}
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  opacity: activeIndex === index ? 1 : 0,
                }}
              >
                <AdminEditableImage
                  imageBlockKey={`carousel.slide_${index + 1}.image`}
                  altBlockKey={`carousel.slide_${index + 1}.image.alt`}
                  className="object-cover"
                  renderStaticImage={({ src, alt, className, style }) => (
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className={className}
                      style={style}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  )}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setActiveIndex(
                  (prev) => (prev - 1 + SLIDE_COUNT) % SLIDE_COUNT,
                )
              }
              aria-label="Previous slide"
              className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1C2E20] shadow-md md:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % SLIDE_COUNT)
              }
              aria-label="Next slide"
              className="absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1C2E20] shadow-md md:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: SLIDE_COUNT }, (_, index) => (
              <button
                key={`carousel.slide_${index + 1}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === index ? "20px" : "8px",
                  backgroundColor:
                    activeIndex === index ? "#67bc6a" : "rgba(255, 255, 255, 0.85)",
                  transform: activeIndex === index ? "scale(1.3)" : "scale(1)",
                  boxShadow:
                    activeIndex === index
                      ? "0 0 8px rgba(196,150,58,0.8)"
                      : "inset 0 0 0 1px rgba(28, 46, 32, 0.08)",
                }}
              />
            ))}
          </div>
        </div>

        <div
          key={activeIndex}
          className="transition-opacity duration-500"
          style={{ opacity: 1 }}
        >
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
            <AdminEditableText blockKey={`${slidePrefix}.eyebrow`} as="span" />
          </p>
          <h2
            className="mb-6 text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 3.5vw, 2.5rem)",
              fontWeight: 300,
              lineHeight: 1.25,
            }}
          >
            <AdminEditableText blockKey={`${slidePrefix}.title`} as="span" />
          </h2>
          <p
            className="mb-8 text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            <AdminEditableText blockKey={`${slidePrefix}.text`} as="span" />
          </p>
          <Link
            href={getText(`${slidePrefix}.button_href`)}
            className="btn-alive inline-block border border-[#67bc6a] bg-[#67bc6a] px-8 py-3 text-white transition-all duration-300 hover:bg-[#5aaa5d] hover:text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            <AdminEditableText blockKey={`${slidePrefix}.button_label`} as="span" />
          </Link>
        </div>
      </div>
    </section>
  );
}
