"use client";

import VideoPageHero from "@/components/VideoPageHero";
import { HERO_VIDEO } from "@/lib/media";

type VillasPageHeroProps = {
  title: string;
  subtitle: string;
  videoSrc?: string;
};

export default function VillasPageHero({ title, subtitle, videoSrc }: VillasPageHeroProps) {
  return (
    <VideoPageHero
      videoSrc={videoSrc || HERO_VIDEO}
      title={title}
      subtitle={subtitle}
    />
  );
}
