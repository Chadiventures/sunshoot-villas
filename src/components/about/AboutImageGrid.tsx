"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const GRID_IMAGES = [
  {
    src: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    alt: "Private pool villa in Seminyak",
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    alt: "Tropical villa living space",
    tall: false,
  },
  {
    src: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    alt: "Bali villa bedroom",
    tall: false,
  },
  {
    src: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    alt: "Seminyak villa pool area",
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg",
    alt: "Tropical garden villa",
    tall: false,
  },
  {
    src: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
    alt: "Bali holiday villa",
    tall: true,
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
