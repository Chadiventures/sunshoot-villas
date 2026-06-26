"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const STORY_IMAGE =
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/185354554.jpg?k=5541438d3715f06575d9cf5298bbf73db085483cebce43802645af39a6bdeb0f&o=&hp=1";

export default function AboutIntro() {
  return (
    <section className="bg-[var(--bg)] py-12 md:py-16">
      <div className="container-site">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <ScrollReveal direction="left" className="flex flex-col justify-center">
            <h2
              className="mb-6 text-[var(--dark)] lg:mb-8"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 5vw, 2.75rem)",
                fontWeight: 300,
              }}
            >
              Our Story
            </h2>
            <p
              className="text-[var(--text)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.85,
              }}
            >
              Sun Shoot Villas Seminyak was born from a simple belief: that every
              guest deserves more than just a place to sleep. Nestled in the famous
              Bidadari area of Seminyak, our four private pool villas have been
              welcoming families, couples, and groups of friends from all over the
              world for years. We are not a hotel. We are a home away from home,
              and that difference matters to us deeply.
            </p>
          </ScrollReveal>

          <div className="relative min-h-[260px] w-full overflow-hidden rounded-sm lg:min-h-0 lg:h-full">
            <Image
              src={STORY_IMAGE}
              alt="Sun Shoot Villas Seminyak"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
