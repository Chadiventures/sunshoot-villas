"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { BOOKING_PHOTOS } from "@/lib/media";

const GRID_IMAGES = [
  {
    src: BOOKING_PHOTOS[0],
    alt: "Sun Shoot Villas private pool",
    tall: true,
  },
  {
    src: BOOKING_PHOTOS[1],
    alt: "Villa living area at Sun Shoot Villas",
    tall: false,
  },
  {
    src: BOOKING_PHOTOS[2],
    alt: "Bedroom at Sun Shoot Villas Seminyak",
    tall: false,
  },
  {
    src: BOOKING_PHOTOS[3],
    alt: "Pool area at Sun Shoot Villas",
    tall: true,
  },
  {
    src: BOOKING_PHOTOS[4],
    alt: "Sun Shoot Villas garden villa",
    tall: false,
  },
];

export default function AboutImageGrid() {
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

        <div className="columns-2 gap-3 md:columns-3 md:gap-4">
          {GRID_IMAGES.map((image, index) => (
            <ScrollReveal
              key={image.src}
              delay={index * 100}
              className="mb-3 break-inside-avoid md:mb-4"
            >
              <div
                className={`img-zoom-wrap relative w-full overflow-hidden rounded-sm ${
                  image.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="zoom-target object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
