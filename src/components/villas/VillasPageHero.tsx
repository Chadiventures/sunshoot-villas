"use client";

import VideoPageHero from "@/components/VideoPageHero";
import { useLanguage } from "@/context/LanguageContext";
import { HERO_VIDEO } from "@/lib/media";

export default function VillasPageHero() {
  const { t } = useLanguage();

  return (
    <VideoPageHero
      videoSrc={HERO_VIDEO}
      title={t.navOurVillas}
      subtitle={t.villasPageHeroSubtitle}
    />
  );
}
