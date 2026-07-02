"use client";

import Image from "next/image";
import { useContext } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { AdminEditableImage } from "@/components/admin/AdminEditableImage";
import { AdminCoreContext, useAdminContent } from "@/hooks/useAdminContent";
import { useLanguage } from "@/context/LanguageContext";
import { getPageContentDefaults } from "@/lib/contentDefaults";

const HOME_DEFAULTS = getPageContentDefaults("home");

export default function SunshootersPartnerProgram() {
  const { t } = useLanguage();
  const core = useContext(AdminCoreContext);
  const { getText } = useAdminContent();
  void core?.contentRevision;

  const benefits = t.sunshootersPartnerBenefits.map((benefit, index) => (
    getText(`partner.benefit.${index + 1}`) || HOME_DEFAULTS[`partner.benefit.${index + 1}`] || benefit
  ));

  return (
    <section className="bg-[var(--bg)] py-8 md:py-12">
      <div className="container-site">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl rounded-lg border-[2.5px] border-[var(--dark)] bg-white px-6 py-7 text-center md:px-10 md:py-9">
            <div className="mx-auto mb-5 h-auto w-[130px] md:mb-6 md:w-[150px]">
              <AdminEditableImage
                imageBlockKey="partner.logo"
                altBlockKey="partner.logo.alt"
                className="h-auto w-full"
                renderStaticImage={({ src, alt, className, style }) => (
                  <Image
                    src={src}
                    alt={alt}
                    width={150}
                    height={150}
                    className={className}
                    style={style}
                  />
                )}
              />
            </div>

            <p
              className="mb-2 text-[var(--sand)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              <AdminEditableText blockKey="partner.label" fallback={HOME_DEFAULTS["partner.label"]} as="span" />
            </p>
            <h2
              className="mb-3 text-[var(--dark)]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                fontWeight: 300,
              }}
            >
              <AdminEditableText blockKey="partner.title" fallback={HOME_DEFAULTS["partner.title"]} as="span" />
            </h2>
            <p
              className="mx-auto mb-6 max-w-2xl text-[var(--dark)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              <AdminEditableText blockKey="partner.description" fallback={HOME_DEFAULTS["partner.description"]} as="span" />
            </p>

            <ul className="mx-auto mb-5 w-fit max-w-xl space-y-2 text-left">
              {benefits.map((benefit, index) => (
                <li
                  key={`${benefit}-${index}`}
                  className="flex items-start gap-3 text-[var(--dark)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8125rem",
                    fontWeight: 400,
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sand)]"
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>

            <p
              className="text-[var(--dark)]/60 italic"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              <AdminEditableText blockKey="partner.note" fallback={HOME_DEFAULTS["partner.note"]} as="span" />
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
