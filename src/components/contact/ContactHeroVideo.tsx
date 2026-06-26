"use client";

import type { SyntheticEvent } from "react";

const PRIMARY_SRC =
  "https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4";
const FALLBACK_SRC =
  "https://videos.pexels.com/video-files/1739011/1739011-hd_1920_1080_24fps.mp4";

export default function ContactHeroVideo() {
  const handleError = (e: SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (!video.src.includes("1739011")) {
      video.src = FALLBACK_SRC;
    }
  };

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={handleError}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        willChange: "transform",
      }}
      src={PRIMARY_SRC}
    />
  );
}
