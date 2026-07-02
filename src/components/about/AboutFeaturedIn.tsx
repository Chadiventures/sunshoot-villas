"use client";

import { useContext } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { AdminCoreContext, useAdminContent } from "@/hooks/useAdminContent";
import { getPageContentDefaults } from "@/lib/contentDefaults";

const ABOUT_DEFAULTS = getPageContentDefaults("about");

export default function AboutFeaturedIn() {
  const core = useContext(AdminCoreContext);
  const { getText } = useAdminContent();
  void core?.contentRevision;
  const articleUrl = getText("featured.article_url") || ABOUT_DEFAULTS["featured.article_url"] || "";

  return (
    <section className="bg-[var(--dark)] py-4 md:max-h-[80px] md:py-0">
      <ScrollReveal>
        <div className="container-site flex flex-col items-center justify-center gap-3 py-3 text-center md:h-20 md:flex-row md:justify-between md:gap-6 md:py-0 md:text-left">
          <p
            className="text-[#faf8f5]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.125rem, 3vw, 1.375rem)",
              fontWeight: 400,
            }}
          >
            <AdminEditableText blockKey="featured.title" fallback={ABOUT_DEFAULTS["featured.title"]} as="span" />
          </p>

          <p
            className="text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.9375rem",
              fontWeight: 700,
            }}
          >
            <AdminEditableText blockKey="featured.score" fallback={ABOUT_DEFAULTS["featured.score"]} as="span" />
          </p>

          <a
            href={articleUrl}
            target={articleUrl ? "_blank" : undefined}
            rel={articleUrl ? "noopener noreferrer" : undefined}
            className="inline-flex min-h-[40px] items-center justify-center rounded-sm border-2 border-white px-5 py-2 text-white transition-all duration-300 ease-in-out hover:bg-white/10"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <AdminEditableText blockKey="featured.cta" fallback={ABOUT_DEFAULTS["featured.cta"]} as="span" />
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
