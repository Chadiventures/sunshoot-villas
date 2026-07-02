"use client";

import { useContext } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { AdminCoreContext, useAdminContent } from "@/hooks/useAdminContent";

type RatingItem = {
  platform: string;
  score: string;
  max: string;
  href?: string;
};

const RATINGS_FALLBACK: RatingItem[] = [
  {
    platform: "Booking.com",
    score: "8.5",
    max: "10",
    href: "https://www.booking.com/hotel/id/sun-shoot-villas-seminyak.html#tab-reviews",
  },
  { platform: "Agoda", score: "9.4", max: "10" },
  { platform: "Trip.com", score: "8.9", max: "10" },
  { platform: "Traveloka", score: "8.3", max: "10" },
  { platform: "Google", score: "3.7", max: "5" },
];

function StarIcon({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#C9A96E"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function MobileRatingEntry({ item }: { item: RatingItem }) {
  const content = (
    <div className="flex items-center justify-center gap-0.5 whitespace-nowrap px-0.5">
      <span
        className="text-white"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "10px",
          fontWeight: 500,
          lineHeight: 1.2,
        }}
      >
        {item.platform}
      </span>
      <StarIcon size={8} />
      <span
        className="text-[#C9A96E]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "10px",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {item.score}
      </span>
    </div>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity duration-300 ease-in-out hover:opacity-80"
      >
        {content}
      </a>
    );
  }

  return content;
}

function DesktopRatingEntry({ item }: { item: RatingItem }) {
  const content = (
    <div className="flex flex-row items-center gap-1.5 px-4 text-center">
      <span
        className="text-white"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          lineHeight: 1.2,
        }}
      >
        {item.platform}
      </span>
      <span className="flex items-center gap-1">
        <StarIcon />
        <span
          className="text-[#C9A96E]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "12px",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {item.score} / {item.max}
        </span>
      </span>
    </div>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity duration-300 ease-in-out hover:opacity-80"
      >
        {content}
      </a>
    );
  }

  return content;
}

export default function RatingsTrustBar() {
  const core = useContext(AdminCoreContext);
  const { getText } = useAdminContent();
  void core?.contentRevision;

  const ratings: RatingItem[] = RATINGS_FALLBACK.map((fallback, index) => {
    const num = index + 1;
    return {
      platform: getText(`ratings.${num}.platform`) || fallback.platform,
      score: getText(`ratings.${num}.score`) || fallback.score,
      max: getText(`ratings.${num}.max`) || fallback.max,
      href: getText(`ratings.${num}.url`) || fallback.href,
    };
  });

  const topRow = ratings.slice(0, 3);
  const bottomRow = ratings.slice(3);

  return (
    <section className="bg-[#1A2E1A] py-2 md:max-h-[80px] md:py-4">
      <div className="container-site">
        <ScrollReveal>
          <p
            className="mb-1.5 text-center text-white uppercase md:mb-2"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              opacity: 0.6,
              lineHeight: 1,
            }}
          >
            <span className="md:hidden" style={{ fontSize: "9px" }}>
              {getText("ratings.title")}
            </span>
            <span className="hidden md:inline" style={{ fontSize: "10px" }}>
              {getText("ratings.title")}
            </span>
          </p>

          <div className="md:hidden">
            <div className="grid grid-cols-3 gap-x-1 gap-y-1.5">
              {topRow.map((item) => (
                <MobileRatingEntry key={item.platform} item={item} />
              ))}
            </div>
            <div className="mt-1.5 flex items-center justify-center gap-6">
              {bottomRow.map((item) => (
                <MobileRatingEntry key={item.platform} item={item} />
              ))}
            </div>
          </div>

          <div className="hidden items-center justify-center md:flex">
            {ratings.map((item, index) => (
              <div key={item.platform} className="flex items-center">
                {index > 0 && (
                  <div
                    className="h-6 w-px shrink-0"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    aria-hidden="true"
                  />
                )}
                <DesktopRatingEntry item={item} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
