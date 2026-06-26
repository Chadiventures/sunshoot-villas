"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  text: string;
  buttonLabel: string;
  buttonHref: string;
}

const slides: Slide[] = [
  {
    image: "/baby-fence-pool.png",
    alt: "Pool fencing at Sahana Villas",
    eyebrow: "Pool Safety",
    title: "Your Children's Safety Comes First",
    text: "We know that not having a pool fence can be a worry when travelling with young children. Our custom-built temporary pool fences feature a gate with a safety lock and can be installed before your arrival. Simply let us know during the booking process and we will take care of everything.",
    buttonLabel: "Request Pool Fencing",
    buttonHref: "/book",
  },
  {
    image: "/baby-proof-area.png",
    alt: "Child-friendly villa layout",
    eyebrow: "Child-Friendly Design",
    title: "Built Safe from the Ground Up",
    text: "Sahana Villas was designed from the start with families in mind. The entire villa is on one level with minimal steps, no low-lying water features, and built to the highest safety standards so your little ones can explore freely.",
    buttonLabel: "Learn More",
    buttonHref: "/about",
  },
  {
    image: "/baby-sail-pool.png",
    alt: "Sun sail over the pool",
    eyebrow: "Sun Protection",
    title: "Enjoy the Pool All Day Long",
    text: "The Bali sun can burn quickly. Our sun sail over the pool is available on request, allowing your family to enjoy the water all day without worrying about sun exposure. Just let us know before arrival and we will have it ready for you.",
    buttonLabel: "Request Sun Sail",
    buttonHref: "/book",
  },
  {
    image: "/bedtime-story.png",
    alt: "Bedtime story at Sahana Villas",
    eyebrow: "Evening Routine",
    title: "A Bedtime Story to End the Day",
    text: "Every evening our staff are happy to read a bedtime story to your little ones, helping them wind down after a full day of Bali adventures. It is one of those small touches that our youngest guests always remember.",
    buttonLabel: "Meet Our Team",
    buttonHref: "/about",
  },
  {
    image: "/baby-sitter-image.png",
    alt: "Babysitting at Sahana Villas",
    eyebrow: "Babysitting",
    title: "A Trusted Pair of Hands",
    text: "Our staff love children and are happy to help during working hours. For evening babysitting a small charge of IDR 50,000 per hour applies. For full-time babysitting we can arrange outside help with advance notice. Simply speak to our team on arrival.",
    buttonLabel: "Contact Us",
    buttonHref: "/contact",
  },
];

export default function FamilySafetyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const activeSlide = slides[activeIndex];

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
            {slides.map((slide, index) => (
              <Image
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover transition-opacity duration-700"
                style={{
                  opacity: activeIndex === index ? 1 : 0,
                }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={index === 0}
              />
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
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
            {activeSlide.eyebrow}
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
            {activeSlide.title}
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
            {activeSlide.text}
          </p>
          <Link
            href={activeSlide.buttonHref}
            className="btn-alive inline-block border border-[#67bc6a] bg-[#67bc6a] px-8 py-3 text-white transition-all duration-300 hover:bg-[#5aaa5d] hover:text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {activeSlide.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
