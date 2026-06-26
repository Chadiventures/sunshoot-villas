"use client";

import type { SyntheticEvent } from "react";

const PRIMARY_SRC =
  "https://videos.pexels.com/video-files/3015487/3015487-hd_1920_1080_30fps.mp4";
const FALLBACK_SRC =
  "https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4";

export default function AboutHeroVideo() {
  const handleError = (e: SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (!video.src.includes("856973")) {
      video.src = FALLBACK_SRC;
    }
  };

  return (
    <video
      src={PRIMARY_SRC}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={handleError}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ willChange: "transform" }}
    />
  );
}
