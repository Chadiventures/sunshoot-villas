"use client";

import VideoPageHero from "@/components/VideoPageHero";
import { HERO_VIDEO } from "@/lib/media";

type AboutHeroProps = {
  title: string;
  subtitle: string;
  videoSrc?: string;
};

export default function AboutHero({ title, subtitle, videoSrc }: AboutHeroProps) {
  return (
    <VideoPageHero
      videoSrc={videoSrc || HERO_VIDEO}
      title={title}
      subtitle={subtitle}
    />
  );
}
