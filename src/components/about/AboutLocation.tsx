"use client";

import { useContext } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { AdminCoreContext, useAdminContent } from "@/hooks/useAdminContent";
import { HERO_VIDEO } from "@/lib/media";

export default function AboutLocation() {
  const core = useContext(AdminCoreContext);
  const { getText } = useAdminContent();
  void core?.contentRevision;
  const videoUrl = getText("location.video_url") || HERO_VIDEO;

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
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
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <ScrollReveal className="mx-auto max-w-[800px] text-center">
          <h2
            className="mb-6 text-white md:mb-8"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            <AdminEditableText blockKey="location.title" as="span" />
          </h2>
          <p
            className="text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.85,
            }}
          >
            <AdminEditableText blockKey="location.body" allowLineBreaks as="span" />
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
