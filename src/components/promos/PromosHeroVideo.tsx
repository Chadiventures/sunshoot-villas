"use client";

export default function PromosHeroVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ willChange: "transform" }}
    >
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
