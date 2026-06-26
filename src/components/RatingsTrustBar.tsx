"use client";

import ScrollReveal from "@/components/ScrollReveal";

type RatingItem = {
  platform: string;
  score: string;
  max: string;
  href?: string;
};

const RATINGS: RatingItem[] = [
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
  {
    platform: "The Bali Guideline",
    score: "8.7",
    max: "10",
    href: "https://thebaliguideline.com/stay/seminyak/sun-shoot-villas-private-pool-villa-anggrek",
  },
];

function StarIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="#C9A96E"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function RatingCard({ item }: { item: RatingItem }) {
  const scoreContent = (
    <div className="mt-1.5 flex items-center justify-center gap-1.5 md:justify-start">
      <StarIcon />
      <span
        className="text-[#C9A96E]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.9375rem",
          fontWeight: 500,
        }}
      >
        {item.score} / {item.max}
      </span>
    </div>
  );

  const platformName = (
    <p
      className="text-white"
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "0.8125rem",
        fontWeight: 600,
        lineHeight: 1.4,
      }}
    >
      {item.platform}
    </p>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-sm px-3 py-4 text-center transition-all duration-300 ease-in-out hover:bg-white/5 md:px-4 md:text-left"
      >
        {platformName}
        {scoreContent}
      </a>
    );
  }

  return (
    <div className="rounded-sm px-3 py-4 text-center md:px-4 md:text-left">
      {platformName}
      {scoreContent}
    </div>
  );
}

export default function RatingsTrustBar() {
  return (
    <section className="bg-[#1A2E1A] py-10 md:py-12">
      <div className="container-site">
        <ScrollReveal>
          <h2
            className="mb-6 text-center text-white md:mb-8"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 300,
            }}
          >
            Ratings &amp; Reviews
          </h2>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {RATINGS.map((item, index) => (
              <ScrollReveal key={item.platform} delay={index * 60}>
                <RatingCard item={item} />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
