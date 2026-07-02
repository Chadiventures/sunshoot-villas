"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { SITE } from "@/lib/site";

const sectionHeadingStyle = {
  fontFamily: "var(--font-cormorant)",
  fontSize: "1.5rem",
  fontWeight: 400,
} as const;

const bodyStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "0.9375rem",
  fontWeight: 300,
  lineHeight: 1.8,
} as const;

const TERMS_SECTIONS: Array<{ key: string; paragraphCount: number }> = [
  { key: "general", paragraphCount: 2 },
  { key: "checkin", paragraphCount: 2 },
  { key: "cancellation", paragraphCount: 2 },
  { key: "children", paragraphCount: 4 },
  { key: "payment", paragraphCount: 1 },
  { key: "house_rules", paragraphCount: 3 },
  { key: "pool", paragraphCount: 3 },
  { key: "damage", paragraphCount: 2 },
  { key: "privacy", paragraphCount: 1 },
  { key: "contact", paragraphCount: 1 },
];

export default function TermsPageContent({
  heroTitle,
  heroSubtitle,
}: {
  heroTitle: string;
  heroSubtitle: string;
}) {
  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        titleBlockKey="hero.title"
        subtitleBlockKey="hero.subtitle"
      />

      <section className="bg-[var(--bg)] py-14 md:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <p className="mb-10 text-[var(--text-muted)]" style={bodyStyle}>
              <AdminEditableText blockKey="intro.body" allowLineBreaks as="span" />
            </p>

            <div className="space-y-10">
              {TERMS_SECTIONS.map((section) => (
                <article key={section.key}>
                  <h2 className="mb-4 text-[var(--dark)]" style={sectionHeadingStyle}>
                    <AdminEditableText blockKey={`section.${section.key}.title`} as="span" />
                  </h2>
                  <div className="space-y-3 text-[var(--text)]">
                    {Array.from({ length: section.paragraphCount }, (_, index) => (
                      <p key={`${section.key}-${index}`} style={bodyStyle}>
                        <AdminEditableText
                          blockKey={`section.${section.key}.paragraph_${index + 1}`}
                          allowLineBreaks
                          as="span"
                        />
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-12 text-[var(--text-muted)]" style={bodyStyle}>
              <AdminEditableText blockKey="closing.body" as="span" />{" "}
              <Link
                href="/contact"
                className="text-[var(--sand)] transition-colors hover:text-[var(--dark)]"
              >
                <AdminEditableText blockKey="closing.contact_link" as="span" />
              </Link>{" "}
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--sand)] transition-colors hover:text-[var(--dark)]"
              >
                <AdminEditableText blockKey="closing.whatsapp_link" as="span" />
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
