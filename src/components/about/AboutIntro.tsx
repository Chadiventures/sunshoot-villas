"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { AdminEditableImage } from "@/components/admin/AdminEditableImage";
import { AdminEditableText } from "@/components/admin/AdminEditableText";

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
              <AdminEditableText blockKey="story.title" as="span" />
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
              <AdminEditableText blockKey="story.body" allowLineBreaks as="span" />
            </p>
          </ScrollReveal>

          <div className="relative min-h-[260px] w-full overflow-hidden rounded-sm lg:min-h-0 lg:h-full">
            <AdminEditableImage
              imageBlockKey="story.image"
              altBlockKey="story.image.alt"
              className="object-cover"
              renderStaticImage={({ src, alt, className, style }) => (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className={className}
                  style={style}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
