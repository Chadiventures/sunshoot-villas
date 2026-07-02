"use client";

import { useAdminContent } from "@/hooks/useAdminContent";
import { HERO_VIDEO } from "@/lib/media";

export default function VillaVideoStrip() {
  const { getText } = useAdminContent();
  const videoUrl = getText("video.url") || HERO_VIDEO;

  return (
    <div className="relative h-[200px] w-full overflow-hidden md:h-[300px]">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        aria-hidden="true"
      />
    </div>
  );
}
