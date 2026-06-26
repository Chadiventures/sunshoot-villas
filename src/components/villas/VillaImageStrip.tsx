"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

type VillaImageStripProps = {
  src: string;
  alt: string;
};

export default function VillaImageStrip({ src, alt }: VillaImageStripProps) {
  return (
    <ScrollReveal className="w-full">
      <div className="relative h-48 w-full overflow-hidden sm:h-56 md:h-64">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(26,46,26,0.25) 0%, transparent 40%, transparent 60%, rgba(26,46,26,0.25) 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </ScrollReveal>
  );
}
