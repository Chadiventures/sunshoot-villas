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
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="#C9A96E"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function RatingEntry({ item }: { item: RatingItem }) {
  const content = (
    <div className="flex flex-col items-center gap-0.5 px-2 text-center md:flex-row md:gap-1.5 md:px-4">
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
  return (
    <section className="bg-[#1A2E1A] py-4 md:max-h-[80px]">
      <div className="container-site">
        <ScrollReveal>
          <p
            className="mb-2 text-center text-white uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              opacity: 0.6,
              lineHeight: 1,
            }}
          >
            Trusted by guests worldwide
          </p>

          <div className="grid grid-cols-3 gap-x-2 gap-y-3 md:hidden">
            {RATINGS.map((item) => (
              <RatingEntry key={item.platform} item={item} />
            ))}
          </div>

          <div className="hidden items-center justify-center md:flex">
            {RATINGS.map((item, index) => (
              <div key={item.platform} className="flex items-center">
                {index > 0 && (
                  <div
                    className="h-6 w-px shrink-0"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    aria-hidden="true"
                  />
                )}
                <RatingEntry item={item} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
