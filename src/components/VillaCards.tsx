"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { VILLAS } from "@/lib/villas";
import { VILLA_IMAGES } from "@/lib/media";

export default function VillaCards({ showHeader = true }: { showHeader?: boolean }) {
  const { t } = useLanguage();

  return (
    <section className="bg-[var(--bg)] py-20 md:py-28">
      <div className="container-site">
        {showHeader && (
          <div className="mb-14 text-center">
            <p className="section-eyebrow mb-3">Our Collection</p>
            <h2 className="section-heading">Four Private Pool Villas</h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-[var(--text-muted)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              Each villa offers two bedrooms, a private pool, and the warmth of
              personal Balinese hospitality in Seminyak&apos;s Bidadari area.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {VILLAS.map((villa) => (
            <article
              key={villa.slug}
              className="card-lift group relative cursor-pointer overflow-hidden rounded-sm bg-white shadow-sm"
            >
              <Link
                href={`/villas/${villa.slug}`}
                className="absolute inset-0 z-0"
                aria-label={`View ${villa.name}`}
              />

              <div className="img-zoom-wrap pointer-events-none relative z-[1] h-56 overflow-hidden sm:h-64">
                <Image
                  src={VILLA_IMAGES[villa.slug]}
                  alt={villa.name}
                  fill
                  className="zoom-target object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              <div className="pointer-events-none relative z-[1] p-6 md:p-8">
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
                  2 Bedrooms | Private Pool
                </p>
                <h3
                  className="mb-3 text-[var(--dark)]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.75rem",
                    fontWeight: 400,
                  }}
                >
                  {villa.name}
                </h3>
                <p
                  className="mb-6 text-[var(--text-muted)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.875rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {villa.description.length > 140
                    ? `${villa.description.slice(0, 140)}…`
                    : villa.description}
                </p>
                <div className="pointer-events-auto relative z-[2] flex flex-wrap gap-3">
                  <Link
                    href={`/villas/${villa.slug}`}
                    className="btn-outline-dark btn-hover !px-6 !py-2.5 !text-[10px]"
                  >
                    {t.villaCardViewVilla}
                  </Link>
                  <Link
                    href="/book"
                    className="btn-primary btn-hover !px-6 !py-2.5 !text-[10px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t.villaCardBookNow}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
