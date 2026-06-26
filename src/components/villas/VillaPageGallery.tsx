"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

type VillaPageGalleryProps = {
  images: string[];
  villaName: string;
};

export default function VillaPageGallery({
  images,
  villaName,
}: VillaPageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;
  const thumbnails = images.slice(0, 4);

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(diff) < 40) return;
    if (diff < 0) goNext();
    else goPrev();
  };

  if (total === 0) return null;

  return (
    <div className="w-full">
      <div
        className="img-zoom-wrap relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[var(--dark)] sm:aspect-[16/10]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={images[activeIndex]}
          alt={`${villaName} gallery image ${activeIndex + 1}`}
          fill
          className="zoom-target object-cover"
          sizes="(max-width: 768px) 100vw, 72rem"
          priority={activeIndex === 0}
        />

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="btn-hover absolute top-1/2 left-3 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--dark)] shadow-md transition-all duration-300 ease-in-out hover:bg-white md:flex"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="btn-hover absolute top-1/2 right-3 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--dark)] shadow-md transition-all duration-300 ease-in-out hover:bg-white md:flex"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
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
        Swipe left or right to browse photos
      </p>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
        {thumbnails.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={activeIndex === i ? "true" : undefined}
            className={`img-zoom-wrap relative aspect-[4/3] overflow-hidden rounded-sm border-2 transition-all duration-300 ease-in-out ${
              activeIndex === i
                ? "border-[var(--sand)]"
                : "border-transparent opacity-80 hover:opacity-100"
            }`}
          >
            <Image
              src={src}
              alt={`${villaName} thumbnail ${i + 1}`}
              fill
              className="zoom-target object-cover"
              sizes="25vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
