"use client";

import Link from "next/link";
import { AdminEditableText } from "@/components/admin/AdminEditableText";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  titleBlockKey?: string;
  subtitleBlockKey?: string;
  breadcrumb?: { label: string; href?: string }[];
};

export default function PageHero({
  title,
  subtitle,
  titleBlockKey,
  subtitleBlockKey,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section
      className="bg-[var(--dark)] pb-16 md:pb-20"
      style={{ paddingTop: "var(--site-chrome-h)" }}
    >
      <div className="container-site text-center">
        {breadcrumb && (
          <nav
            aria-label="Breadcrumb"
            className="mb-4"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {breadcrumb.map((item, i) => (
              <span key={item.label}>
                {i > 0 && <span className="mx-2">/</span>}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[var(--sand)]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1
          className="mb-4 text-white"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 300,
          }}
        >
          {titleBlockKey ? (
            <AdminEditableText blockKey={titleBlockKey} fallback={title} as="span" />
          ) : (
            title
          )}
        </h1>
        {(subtitle || subtitleBlockKey) && (
          <p
            className="mx-auto max-w-2xl text-white/70"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            {subtitleBlockKey ? (
              <AdminEditableText blockKey={subtitleBlockKey} fallback={subtitle ?? ""} as="span" />
            ) : (
              subtitle
            )}
          </p>
        )}
      </div>
    </section>
  );
}
