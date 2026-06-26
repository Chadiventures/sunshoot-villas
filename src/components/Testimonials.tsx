"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  author: string;
  meta: string;
  platform: "airbnb" | "tripadvisor" | "facebook";
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Our family of five had the most wonderful stay. The kids lived in the pool while we enjoyed the spacious living areas. The staff made us feel like VIPs from the moment we arrived.",
    author: "The Andersons",
    meta: "Family · Sydney, Australia",
    platform: "airbnb",
  },
  {
    quote:
      "A perfect escape for two. Waking up to tropical birdsong, swimming under the stars, and walking to incredible restaurants just minutes away. Pure magic.",
    author: "Marcus and Clara",
    meta: "Couple · Stockholm, Sweden",
    platform: "tripadvisor",
  },
  {
    quote:
      "We came as a group of friends and left as family. The villa had everything we needed for a week of laughter, long dinners, and unforgettable sunsets by the pool.",
    author: "Sophie and the Girls",
    meta: "Friends · London, UK",
    platform: "facebook",
  },
];

function PlatformLogo({ platform }: { platform: Testimonial["platform"] }) {
  if (platform === "airbnb") {
    return (
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
        alt="Airbnb"
        width={48}
        height={48}
        className="object-contain"
        style={{
          opacity: 0.5,
          filter: "brightness(0) saturate(100%)",
        }}
      />
    );
  }

  if (platform === "tripadvisor") {
    return (
      <Image
        src="/tripadvisor.svg"
        alt="TripAdvisor"
        width={80}
        height={20}
        className="object-contain"
        style={{
          opacity: 0.5,
          filter: "brightness(0) saturate(100%)",
        }}
      />
    );
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#1877F2"
      style={{ opacity: 0.5 }}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function getPosition(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden bg-white py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 text-center md:mb-16">
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
            Guest Reviews
          </p>
          <h2
            className="text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            What Our Guests Say
          </h2>
        </div>

        <div className="relative flex min-h-[280px] items-center justify-center md:min-h-[380px]">
          {testimonials.map((testimonial, index) => {
            const position = getPosition(
              index,
              activeIndex,
              testimonials.length,
            );
            const isActive = position === 0;
            const isVisible = Math.abs(position) <= 1;

            if (!isVisible) return null;

            return (
              <article
                key={testimonial.author}
                className={`absolute px-4 ${position !== 0 ? "hidden md:block" : "w-full max-w-full md:w-auto"}`}
                style={{
                  width: isActive ? "min(640px, 90vw)" : "min(480px, 70vw)",
                  transform: `translateX(${position * 110}%) scale(${isActive ? 1 : 0.85})`,
                  opacity: isActive ? 1 : 0.5,
                  zIndex: isActive ? 10 : 5,
                  transition:
                    "transform 0.6s ease, opacity 0.6s ease, width 0.6s ease",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div className="card-alive relative border border-[rgba(0,0,0,0.08)] bg-white p-8 lg:p-12">
                  <div
                    className="mb-6 text-[#67bc6a]"
                    aria-label="5 stars"
                    style={{ fontSize: isActive ? "18px" : "14px" }}
                  >
                    ★★★★★
                  </div>

                  <blockquote
                    className="mb-8 text-[#1A1A1A]"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: isActive
                        ? "clamp(1.25rem, 2.5vw, 1.75rem)"
                        : "1rem",
                      fontWeight: 300,
                      fontStyle: "italic",
                      lineHeight: 1.7,
                    }}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="border-t border-[#1A1A1A]/10 pt-6 pr-20">
                    <p
                      className="text-[#1A1A1A]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {testimonial.author}
                    </p>
                    <p
                      className="mt-1 text-[#6B6B6B]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "12px",
                        fontWeight: 300,
                      }}
                    >
                      {testimonial.meta}
                    </p>
                  </div>

                  <div className="absolute right-6 bottom-6">
                    <PlatformLogo platform={testimonial.platform} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: activeIndex === index ? "24px" : "8px",
                backgroundColor:
                  activeIndex === index ? "#67bc6a" : "rgba(26, 26, 26, 0.25)",
              }}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.tripadvisor.com/VacationRentalReview-g469404-d2551837"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[#67bc6a] transition-colors duration-300 hover:text-[#5aaa5d]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              fontWeight: 400,
              letterSpacing: "0.05em",
            }}
          >
            Read More Reviews
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
