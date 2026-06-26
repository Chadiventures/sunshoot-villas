"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  DEFAULT_REVIEWS,
  getVillaReviews,
  type ReviewPlatform,
  type VillaReview,
} from "@/lib/villa-reviews";

type VillaReviewsCarouselProps = {
  slug?: string;
};

function Stars() {
  return (
    <div className="mb-3 flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C9A96E" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function PlatformBadge({ platform }: { platform: ReviewPlatform }) {
  const colors: Record<ReviewPlatform, string> = {
    Google: "bg-[#4285F4]/10 text-[#4285F4]",
    TripAdvisor: "bg-[#34A853]/10 text-[#1A2E1A]",
    Facebook: "bg-[#1877F2]/10 text-[#1877F2]",
  };

  return (
    <span
      className={`inline-block rounded-sm px-2 py-0.5 text-[0.625rem] font-medium tracking-wide uppercase ${colors[platform]}`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {platform}
    </span>
  );
}

function ReviewCard({ review }: { review: VillaReview }) {
  return (
    <article className="card-lift flex h-full w-[85vw] max-w-[340px] shrink-0 flex-col rounded-sm border border-[var(--text)]/10 bg-white p-5 shadow-sm sm:w-[320px] md:w-[360px]">
      <Stars />
      <p
        className="mb-4 flex-1 text-[var(--text)]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.875rem",
          fontWeight: 300,
          lineHeight: 1.7,
        }}
      >
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p
            className="text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.8125rem",
              fontWeight: 500,
            }}
          >
            {review.name}
          </p>
          <p
            className="text-[var(--text-muted)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 300,
            }}
          >
            {review.country}
          </p>
        </div>
        <PlatformBadge platform={review.platform} />
      </div>
    </article>
  );
}

function CarouselArrow({
  direction,
  onClick,
  className = "",
}: {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous reviews" : "Next reviews"}
      className={`btn-hover flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#C9A96E] bg-white transition-all duration-300 ease-in-out hover:bg-[#C9A96E]/10 ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C9A96E"
        strokeWidth="2"
        aria-hidden="true"
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}

export default function VillaReviewsCarousel({ slug }: VillaReviewsCarouselProps) {
  const reviews = useMemo(
    () => (slug ? getVillaReviews(slug) : DEFAULT_REVIEWS),
    [slug],
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const positionRef = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const animRef = useRef<number | undefined>(undefined);

  const doubled = useMemo(() => [...reviews, ...reviews], [reviews]);
  const CARD_WIDTH = 340;
  const GAP = 16;
  const STEP = CARD_WIDTH + GAP;
  const TOTAL = STEP * reviews.length;

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

  const scroll = useCallback((dir: "left" | "right") => {
    positionRef.current += dir === "right" ? STEP : -STEP;
    if (positionRef.current < 0) positionRef.current = 0;
    if (positionRef.current > TOTAL) positionRef.current = 0;
  }, [STEP, TOTAL]);

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
    <section id="reviews" className="scroll-mt-28 bg-white py-14 md:py-20">
      <div className="container-site">
        <ScrollReveal className="mb-10 text-center md:mb-12">
          <h2
            className="mb-3 text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 300,
            }}
          >
            What Our Guests Say
          </h2>
          <p
            className="text-[var(--text-muted)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.9375rem",
              fontWeight: 300,
            }}
          >
            Reviews from Google, TripAdvisor and Facebook
          </p>
        </ScrollReveal>

        <div className="relative">
          <CarouselArrow
            direction="left"
            onClick={() => scroll("left")}
            className="absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 md:flex"
          />

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
              {doubled.map((review, i) => (
                <ReviewCard key={`${review.name}-${i}`} review={review} />
              ))}
            </div>
          </div>

          <CarouselArrow
            direction="right"
            onClick={() => scroll("right")}
            className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 md:flex"
          />
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
          <CarouselArrow direction="left" onClick={() => scroll("left")} />
          <CarouselArrow direction="right" onClick={() => scroll("right")} />
        </div>

        <p className="mt-3 text-center text-[0.6875rem] text-[var(--text-muted)] md:hidden">
          Swipe to read more reviews
        </p>

        <div className="mt-8 flex justify-center px-2 md:mt-10">
          <a
            href="https://www.booking.com/hotel/id/sun-shoot-villas-seminyak.html#tab-reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[44px] max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-sm border px-4 py-2.5 text-center transition-all duration-300 ease-in-out hover:bg-[#C9A96E] hover:text-white"
            style={{
              borderColor: "#C9A96E",
              color: "#C9A96E",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8125rem",
              fontWeight: 500,
            }}
          >
            <span>Read all reviews on</span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#003580] transition-colors duration-300 ease-in-out group-hover:bg-white"
                aria-hidden="true"
              />
              <span className="font-semibold text-[#003580] transition-colors duration-300 ease-in-out group-hover:text-white">
                booking.com
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
