"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { BOOKING_PHOTOS } from "@/lib/media";

const CAROUSEL_IMAGES = [
  { src: BOOKING_PHOTOS[0], alt: "Sun Shoot Villas private pool" },
  { src: BOOKING_PHOTOS[1], alt: "Villa living area at Sun Shoot Villas" },
  { src: BOOKING_PHOTOS[2], alt: "Bedroom at Sun Shoot Villas Seminyak" },
  { src: BOOKING_PHOTOS[3], alt: "Pool area at Sun Shoot Villas" },
  { src: BOOKING_PHOTOS[4], alt: "Sun Shoot Villas garden villa" },
];

function CarouselImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-56 w-[280px] shrink-0 overflow-hidden rounded-sm sm:h-64 sm:w-[320px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="320px"
      />
    </div>
  );
}

export default function AboutImageGrid() {
  const images = CAROUSEL_IMAGES;
  const doubled = useMemo(() => [...images, ...images], [images]);

  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const positionRef = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const animRef = useRef<number | undefined>(undefined);

  const CARD_WIDTH = 320;
  const GAP = 16;
  const STEP = CARD_WIDTH + GAP;
  const TOTAL = STEP * images.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      if (!isPaused) {
        positionRef.current += 0.4;
        if (positionRef.current >= TOTAL) positionRef.current = 0;
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPaused, TOTAL]);

  const scroll = useCallback(
    (dir: "left" | "right") => {
      positionRef.current += dir === "right" ? STEP : -STEP;
      if (positionRef.current < 0) positionRef.current = 0;
      if (positionRef.current > TOTAL) positionRef.current = 0;
    },
    [STEP, TOTAL],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(diff) < 40) return;
    scroll(diff < 0 ? "right" : "left");
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-site">
        <ScrollReveal className="mb-10 text-center md:mb-14">
          <h2
            className="text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            Life at Sun Shoot Villas
          </h2>
        </ScrollReveal>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous images"
            className="btn-hover absolute top-1/2 left-0 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--sand)] bg-white text-[var(--dark)] shadow-md transition-all duration-300 ease-in-out hover:bg-[var(--bg)] md:flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            className="overflow-hidden px-0 md:px-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex gap-4 will-change-transform"
              style={{ width: "max-content" }}
            >
              {doubled.map((image, i) => (
                <CarouselImage key={`${image.src}-${i}`} src={image.src} alt={image.alt} />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next images"
            className="btn-hover absolute top-1/2 right-0 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--sand)] bg-white text-[var(--dark)] shadow-md transition-all duration-300 ease-in-out hover:bg-[var(--bg)] md:flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <p className="mt-4 text-center text-[0.6875rem] text-[var(--text-muted)] md:hidden">
          Swipe to see more photos
        </p>
      </div>
    </section>
  );
}
