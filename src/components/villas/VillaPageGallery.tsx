"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AdminCoreContext, useAdminContent } from "@/hooks/useAdminContent";
import { getPageContentDefaults } from "@/lib/contentDefaults";
import { AdminEditableText } from "@/components/admin/AdminEditableText";

export default function VillaPageGallery() {
  const core = useContext(AdminCoreContext);
  void core?.contentRevision;
  const { getText, pageSlug } = useAdminContent();
  const galleryDefaults = getPageContentDefaults(pageSlug);
  const villaName = getText("villa.name") || galleryDefaults["villa.name"] || "";
  const images = (getText("villa.gallery_urls") || galleryDefaults["villa.gallery_urls"] || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);
  const swipeRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontalSwipe = useRef(false);
  const activeIndexRef = useRef(activeIndex);

  const total = images.length;

  activeIndexRef.current = activeIndex;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  useEffect(() => {
    const el = swipeRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isHorizontalSwipe.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;

      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;

      if (!isHorizontalSwipe.current) {
        if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
          isHorizontalSwipe.current = true;
        }
      }

      if (isHorizontalSwipe.current) {
        e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;

      const diff = e.changedTouches[0].clientX - touchStartX.current;
      const wasHorizontal = isHorizontalSwipe.current;

      touchStartX.current = null;
      touchStartY.current = null;
      isHorizontalSwipe.current = false;

      if (wasHorizontal && Math.abs(diff) >= 40) {
        if (diff < 0) {
          goTo(activeIndexRef.current + 1);
        } else {
          goTo(activeIndexRef.current - 1);
        }
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo]);

  if (total === 0) {
    return (
      <div className="w-full rounded-sm border border-dashed border-[var(--text)]/15 bg-[var(--bg)] px-6 py-12 text-center">
        <p className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--text-muted)]">
          <AdminEditableText blockKey="gallery.title" fallback={galleryDefaults["gallery.title"]} as="span" />
        </p>
        <p className="mt-3 font-[family-name:var(--font-inter)] text-sm text-[var(--text-muted)]">
          No gallery images yet. Add image URLs in the admin panel (one per line).
        </p>
      </div>
    );
  }

  return (
    <div className="w-full touch-pan-y">
      <div className="flex flex-col items-center">
        <div
          ref={swipeRef}
          className="relative w-full max-h-[500px] touch-none overflow-hidden rounded-sm bg-[var(--dark)] md:w-[65%]"
          style={{ height: "min(500px, 55vw)" }}
        >
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${villaName} gallery image ${i + 1}`}
              fill
              className={`object-cover object-center transition-opacity duration-500 ease-in-out ${
                i === activeIndex ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 100vw, 65vw"
              priority={i === 0}
              draggable={false}
            />
          ))}

          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="btn-hover absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--dark)] shadow-md transition-all duration-300 ease-in-out hover:bg-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="btn-hover absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--dark)] shadow-md transition-all duration-300 ease-in-out hover:bg-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 md:hidden">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <p className="mt-2 text-center text-[0.6875rem] text-[var(--text-muted)] md:hidden">
          <AdminEditableText blockKey="gallery.swipe_hint" fallback={galleryDefaults["gallery.swipe_hint"]} as="span" />
        </p>
      </div>

      <div className="mt-5 flex justify-center px-2">
        <div className="flex max-w-full gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={activeIndex === i ? "true" : undefined}
              className={`gallery-thumbnail relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-300 ease-in-out sm:h-20 sm:w-28 ${
                activeIndex === i
                  ? "scale-105 border-[#C9A96E] opacity-100"
                  : "scale-100 border-transparent opacity-75 hover:scale-105 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${villaName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
