import Image from "next/image";

const collageImages = [
  {
    src: "/about-us-section-1.png",
    alt: "Sahana Villas living space",
    marginTop: 0,
  },
  {
    src: "/about-us-section-2.png",
    alt: "Sahana Villas pool area",
    marginTop: 48,
  },
  {
    src: "/about-us-section-3.png",
    alt: "Sahana Villas bedroom",
    marginTop: -24,
  },
  {
    src: "/about-us-section.png",
    alt: "Sahana Villas tropical garden",
    marginTop: 24,
  },
];

interface ImageCollageProps {
  fixedHeight?: number;
}

export default function ImageCollage({ fixedHeight }: ImageCollageProps) {
  const imageHeight = fixedHeight ? 236 : 280;
  const padding = fixedHeight ? 12 : 24;

  return (
    <div
      className={`relative w-full overflow-hidden ${fixedHeight ? "md:h-[560px]" : ""}`}
    >
      <div
        className="grid h-full grid-cols-2"
        style={{
          gap: "12px",
          padding: `${padding}px`,
        }}
      >
        {collageImages.map((image) => (
          <div
            key={image.src}
            className="relative overflow-hidden rounded-[3px] img-alive max-md:!mt-0 max-md:h-36 md:h-[var(--collage-h)] md:[margin-top:var(--collage-mt)]"
            style={{
              ["--collage-mt" as string]: fixedHeight
                ? `${Math.round(image.marginTop * 0.75)}px`
                : `${image.marginTop}px`,
              ["--collage-h" as string]: `${imageHeight}px`,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 45vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
