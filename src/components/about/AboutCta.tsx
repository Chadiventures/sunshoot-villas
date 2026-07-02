"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { getPageContentDefaults } from "@/lib/contentDefaults";

const CTA_DEFAULTS = getPageContentDefaults("home");

export default function AboutCta() {
  return (
    <section className="bg-[var(--bg)] py-6 md:py-16">
      <div className="container-site">
        <ScrollReveal className="text-center">
          <h2
            className="mb-4 text-[var(--dark)] md:mb-8"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.125rem, 3.5vw, 2.75rem)",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            <AdminEditableText
              blockKey="cta.title"
              fallback={CTA_DEFAULTS["cta.title"]}
              as="span"
            />
          </h2>
          <div className="flex flex-row flex-wrap items-center justify-center gap-2 md:gap-4">
            <Link
              href="/villas"
              className="btn-outline-dark btn-hover min-w-0 flex-1 basis-[calc(50%-0.25rem)] !px-2 !py-2.5 !text-[0.5625rem] !tracking-[0.06em] md:min-w-[200px] md:flex-none md:basis-auto md:!px-8 md:!py-3.5 md:!text-[0.75rem] md:!tracking-[0.12em]"
            >
              <AdminEditableText
                blockKey="cta.view_villas"
                fallback={CTA_DEFAULTS["cta.view_villas"]}
                as="span"
              />
            </Link>
            <Link
              href="/book"
              className="btn-primary btn-hover min-w-0 flex-1 basis-[calc(50%-0.25rem)] !px-2 !py-2.5 !text-[0.5625rem] !tracking-[0.06em] md:min-w-[200px] md:flex-none md:basis-auto md:!px-8 md:!py-3.5 md:!text-[0.75rem] md:!tracking-[0.12em]"
            >
              <AdminEditableText
                blockKey="cta.book_button"
                fallback={CTA_DEFAULTS["cta.book_button"]}
                as="span"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
