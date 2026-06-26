"use client";

import { useState } from "react";
import Image from "next/image";

const galleryImages = [
  "/your-private-sanctuary.png",
  "/about-us-section-1.png",
  "/about-us-section-2.png",
  "/about-us-section-3.png",
  "/about-us-section.png",
  "/familiy-section.png",
];

const virtualTourSrc =
  "https://www.google.com/maps/embed?pb=!4v1734665741514!6m8!1m7!1sCAoSLEFGMVFpcE5WVGtzbU94aTk4TFFUX1B5elFTVk1WTEdWamoxa090MFlFRnpD!2m2!1d-8.68464934604003!2d115.1634601690474!3f77.88!4f-1.1299999999999955!5f0.5970117501821992";

const arrowButtonStyle = {
  position: "absolute" as const,
  top: "50%",
  transform: "translateY(-50%)",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.85)",
  border: "none",
  color: "#1C2E20",
  fontSize: "18px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
  zIndex: 1,
};

export default function VillaGalleryViewer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tourOpen, setTourOpen] = useState(false);

  const goToPrevious = () => {
    setSelectedIndex(
      (index) =>
        (index - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const goToNext = () => {
    setSelectedIndex((index) => (index + 1) % galleryImages.length);
  };

  return (
    <div className="w-full">
      <div className="relative h-[400px] w-full overflow-hidden rounded-[4px]">
        <Image
          src={galleryImages[selectedIndex]}
          alt={`Sahana Villas view ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={selectedIndex === 0}
        />

        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Previous image"
          className="transition-colors duration-200 hover:bg-white"
          style={{ ...arrowButtonStyle, left: "12px" }}
        >
          ‹
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next image"
          className="transition-colors duration-200 hover:bg-white"
          style={{ ...arrowButtonStyle, right: "12px" }}
        >
          ›
        </button>

        <span
          className="absolute right-3 top-3 rounded bg-black/50 px-2.5 py-1 text-white"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "12px",
            fontWeight: 400,
            letterSpacing: "0.05em",
          }}
        >
          {selectedIndex + 1} / {galleryImages.length}
        </span>
      </div>

      <div
        className="carousel-scroll mt-3 flex gap-2 overflow-x-auto pb-1"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {galleryImages.map((src, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={src}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="relative shrink-0 overflow-hidden rounded-[3px] transition-opacity duration-200 hover:opacity-100"
              style={{
                width: "120px",
                height: "80px",
                opacity: isActive ? 1 : 0.65,
                border: isActive ? "2px solid #67bc6a" : "2px solid transparent",
              }}
              aria-label={`View image ${index + 1}`}
              aria-pressed={isActive}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setTourOpen((open) => !open)}
        className="mt-4 cursor-pointer text-[#67bc6a] transition-colors duration-200 hover:text-[#5aaa5d]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          background: "none",
          border: "none",
          padding: 0,
        }}
        aria-expanded={tourOpen}
      >
        {tourOpen ? "Hide Virtual Tour" : "View Virtual Tour"}
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: tourOpen ? "312px" : "0px" }}
      >
        <iframe
          title="Sahana Villas virtual tour"
          src={virtualTourSrc}
          width="100%"
          height="300"
          className="mt-3 w-full rounded-[4px] border-0"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
