"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { AdminEditableImage } from "@/components/admin/AdminEditableImage";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { getPageContentDefaults } from "@/lib/contentDefaults";

const HOME_DEFAULTS = getPageContentDefaults("home");

function CarouselImage({
  imageBlockKey,
  altBlockKey,
}: {
  imageBlockKey: string;
  altBlockKey: string;
}) {
  return (
    <div className="relative h-56 w-[280px] shrink-0 overflow-hidden rounded-sm sm:h-64 sm:w-[320px]">
      <AdminEditableImage
        imageBlockKey={imageBlockKey}
        altBlockKey={altBlockKey}
        className="object-cover"
        renderStaticImage={({ src, alt, className, style }) => (
          <Image src={src} alt={alt} fill className={className} style={style} sizes="320px" />
        )}
      />
    </div>
  );
}

export default function AboutImageGrid() {
  const images = useMemo(
    () => [
      { key: "1", imageBlockKey: "life_at.gallery.1", altBlockKey: "life_at.gallery.1.alt" },
      { key: "2", imageBlockKey: "life_at.gallery.2", altBlockKey: "life_at.gallery.2.alt" },
      { key: "3", imageBlockKey: "life_at.gallery.3", altBlockKey: "life_at.gallery.3.alt" },
      { key: "4", imageBlockKey: "life_at.gallery.4", altBlockKey: "life_at.gallery.4.alt" },
      { key: "5", imageBlockKey: "life_at.gallery.5", altBlockKey: "life_at.gallery.5.alt" },
    ],
    [],
  );
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
    <section className="bg-white py-12 md:py-16">
      <div className="container-site">
        <ScrollReveal className="mb-6 text-center md:mb-8">
          <h2
            className="text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            <AdminEditableText blockKey="life_at.title" fallback={HOME_DEFAULTS["life_at.title"]} as="span" />
          </h2>
        </ScrollReveal>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous images"
            className="btn-hover absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--sand)] bg-white text-[var(--dark)] shadow-md transition-all duration-300 ease-in-out hover:bg-[var(--bg)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            className="overflow-hidden px-10 md:px-12"
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
                <CarouselImage
                  key={`${image.key}-${i}`}
                  imageBlockKey={image.imageBlockKey}
                  altBlockKey={image.altBlockKey}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next images"
            className="btn-hover absolute top-1/2 right-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--sand)] bg-white text-[var(--dark)] shadow-md transition-all duration-300 ease-in-out hover:bg-[var(--bg)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <p className="mt-4 text-center text-[0.6875rem] text-[var(--text-muted)] md:hidden">
          <AdminEditableText blockKey="life_at.swipe_hint" fallback={HOME_DEFAULTS["life_at.swipe_hint"]} as="span" />
        </p>

        <ScrollReveal className="mt-10 text-center md:mt-12">
          <h3
            className="mb-4 text-[var(--dark)] text-[clamp(1.375rem,3.5vw,1.75rem)] md:text-[clamp(1.75rem,4vw,2.5rem)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
            }}
          >
            <AdminEditableText blockKey="life_at.cta_title" fallback={HOME_DEFAULTS["life_at.cta_title"]} as="span" />
          </h3>
          <p
            className="mx-auto mb-8 max-w-xl text-[var(--text-muted)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            <AdminEditableText blockKey="life_at.cta_subtext" fallback={HOME_DEFAULTS["life_at.cta_subtext"]} as="span" />
          </p>
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4">
            <Link
              href="/book"
              className="btn-hover inline-flex min-w-[200px] max-sm:min-w-0 max-sm:flex-1 max-sm:px-3 items-center justify-center rounded-sm border-2 border-[var(--dark)] bg-[var(--dark)] py-3.5 text-white transition-all duration-300 ease-in-out hover:border-[var(--dark-light)] hover:bg-[var(--dark-light)] sm:px-8"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <AdminEditableText blockKey="life_at.cta_book" fallback={HOME_DEFAULTS["life_at.cta_book"]} as="span" />
            </Link>
            <Link
              href="/villas"
              className="btn-outline-dark btn-hover min-w-[200px] max-sm:min-w-0 max-sm:flex-1 max-sm:px-3"
            >
              <AdminEditableText blockKey="life_at.cta_view_villas" fallback={HOME_DEFAULTS["life_at.cta_view_villas"]} as="span" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
