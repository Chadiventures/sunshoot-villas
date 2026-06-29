"use client";

import Image from "next/image";

type VideoPageHeroProps = {
  videoSrc?: string;
  imageSrc?: string;
  title: string;
  subtitle: string;
};

export default function VideoPageHero({
  videoSrc,
  imageSrc,
  title,
  subtitle,
}: VideoPageHeroProps) {
  return (
    <section
      className="relative flex h-[40vh] min-h-[280px] items-center justify-center overflow-hidden md:h-[50vh]"
      style={{ paddingTop: "var(--site-chrome-h)" }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1
          className="mb-5 text-white"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </h1>
        <p
          className="mx-auto max-w-2xl text-white/90"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            fontWeight: 300,
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
