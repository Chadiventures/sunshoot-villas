"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useContext, useMemo } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { AdminEditableImage } from "@/components/admin/AdminEditableImage";
import { AdminCoreContext, useAdminContent } from "@/hooks/useAdminContent";
import { useLanguage } from "@/context/LanguageContext";
import { getPageContentDefaults } from "@/lib/contentDefaults";
import { formatCardNightlyPrice, formatNightlyPrice } from "@/lib/pricing";
import { VILLAS } from "@/lib/villas";
import { VILLA_IMAGES } from "@/lib/media";

const HOME_CARD_DEFAULTS = getPageContentDefaults("home");

export default function VillaCards({
  showHeader = true,
  animateEntrance = false,
}: {
  showHeader?: boolean;
  animateEntrance?: boolean;
}) {
  const { t, language, getVillaDescription } = useLanguage();
  const core = useContext(AdminCoreContext);
  const { getText } = useAdminContent();
  void core?.contentRevision;

  const getCardsText = (key: string) =>
    getText(`cards.${key}`) || getText(`villas.${key}`);
  const viewAriaLabel = getCardsText("view_aria") || t.villaCardViewAriaLabel;
  const viewButtonLabel = getCardsText("view_button") || t.villaCardViewVilla;
  const bookButtonLabel = getCardsText("book_button") || t.villaCardBookNow;
  const metaMobileLabel = getCardsText("meta_mobile") || t.villaCardsMetaMobile;
  const metaDesktopLabel = getCardsText("meta_desktop") || t.villaCardsMetaDesktop;

  const cardDefaultsBySlug = useMemo(() => {
    const map: Record<string, { title: string; description: string; price: string }> = {};
    for (const villa of VILLAS) {
      map[villa.slug] = {
        title: HOME_CARD_DEFAULTS[`cards.${villa.slug}.title`] || villa.name,
        description:
          HOME_CARD_DEFAULTS[`cards.${villa.slug}.description`] || villa.description,
        price: HOME_CARD_DEFAULTS[`cards.${villa.slug}.price`] || "",
      };
    }
    return map;
  }, []);

  return (
    <section className="bg-[var(--bg)] py-12 md:py-28">
      <div className="container-site">
        {showHeader && (
          <div className="mb-14 text-center">
            <p className="section-eyebrow mb-3">
              <AdminEditableText blockKey="villas.eyebrow" as="span" />
            </p>
            <h2 className="section-heading">
              <AdminEditableText blockKey="villas.title" as="span" />
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-[var(--text-muted)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              <AdminEditableText blockKey="villas.subtitle" as="span" />
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
          {VILLAS.map((villa, index) => {
            const defaults = cardDefaultsBySlug[villa.slug];
            const title =
              getText(`cards.${villa.slug}.title`) || defaults.title || villa.name;
            const description =
              getText(`cards.${villa.slug}.description`) ||
              defaults.description ||
              getVillaDescription(villa.slug);
            const priceIdr = Number.parseInt(getText(`cards.${villa.slug}.price`), 10);
            const priceLabel =
              priceIdr > 0
                ? formatNightlyPrice(language, villa.slug, priceIdr)
                : formatCardNightlyPrice(villa.slug, language);
            const card = (
              <article className="card-lift group relative cursor-pointer overflow-hidden rounded-sm bg-white shadow-sm">
                <Link
                  href={`/villas/${villa.slug}`}
                  className="absolute inset-0 z-0"
                  aria-label={`${viewAriaLabel} ${title}`}
                />

                <div className="img-zoom-wrap pointer-events-none relative z-[1] h-[180px] overflow-hidden sm:h-64">
                  <AdminEditableImage
                    imageBlockKey={`cards.${villa.slug}.image`}
                    altBlockKey={`cards.${villa.slug}.image.alt`}
                    fallbackSrc={VILLA_IMAGES[villa.slug]}
                    className="zoom-target object-cover"
                    renderStaticImage={({ src, alt, className, style }) => (
                      <Image
                        src={src || VILLA_IMAGES[villa.slug]}
                        alt={alt || title}
                        fill
                        className={className}
                        style={style}
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    )}
                  />
                </div>

                <div className="pointer-events-none relative z-[1] p-4 md:p-8">
                  <p
                    className="absolute top-4 right-4 text-[var(--sand)] md:top-8 md:right-8"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {priceLabel}
                  </p>
                  <p
                    className="mb-1.5 text-[var(--sand)] sm:mb-2"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.625rem",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span className="sm:hidden">{metaMobileLabel}</span>
                    <span className="hidden sm:inline">{metaDesktopLabel}</span>
                  </p>
                  <h3
                    className="mb-2 text-[1.375rem] text-[var(--dark)] sm:mb-3 sm:text-[1.75rem]"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 400,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    className="mb-4 text-[var(--text-muted)] sm:mb-6"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8125rem",
                      fontWeight: 300,
                      lineHeight: 1.6,
                    }}
                  >
                    <span className="sm:hidden">
                      {description.length > 90
                        ? `${description.slice(0, 90)}…`
                        : description}
                    </span>
                    <span
                      className="hidden sm:inline"
                      style={{ fontSize: "0.875rem", lineHeight: 1.7 }}
                    >
                      {description.length > 140
                        ? `${description.slice(0, 140)}…`
                        : description}
                    </span>
                  </p>
                  <div className="pointer-events-auto relative z-[2] flex flex-wrap gap-2 sm:gap-3">
                    <Link
                      href={`/villas/${villa.slug}`}
                      className="btn-outline-dark btn-hover !px-4 !py-2 !text-[9px] sm:!px-6 sm:!py-2.5 sm:!text-[10px]"
                    >
                      {viewButtonLabel}
                    </Link>
                    <Link
                      href="/book"
                      className="btn-primary btn-hover !px-4 !py-2 !text-[9px] sm:!px-6 sm:!py-2.5 sm:!text-[10px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {bookButtonLabel}
                    </Link>
                  </div>
                </div>
              </article>
            );

            if (!animateEntrance) {
              return <Fragment key={villa.slug}>{card}</Fragment>;
            }

            return (
              <ScrollReveal
                key={villa.slug}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
              >
                {card}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
