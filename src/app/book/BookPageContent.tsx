"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { BookingForm, useBookingForm } from "@/components/booking/BookingForm";
import Footer from "@/components/Footer";
import PricingDiscountBadge from "@/components/pricing/PricingDiscountBadge";
import { useLanguage } from "@/context/LanguageContext";
import { formatNightlyPrice, formatTotalPrice } from "@/lib/pricing";
import { GLOBAL_POLICIES } from "@/lib/site";
import { VILLAS } from "@/lib/villas";

const BOOK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1920&q=80";

export default function BookPageContent() {
  const { t, language } = useLanguage();
  const form = useBookingForm();
  const { fields, nights } = form;
  const [submitted, setSubmitted] = useState(false);

  const dateLocale = language === "id" ? "id-ID" : "en-GB";

  const trustItems = useMemo(
    () => [
      {
        key: "secure",
        label: t.bookTrustSecure,
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        ),
      },
      {
        key: "host",
        label: t.bookTrustPersonalHost,
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ),
      },
      {
        key: "pickup",
        label: t.bookTrustAirportPickup,
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 19 4c-1 0-2 1-3.5 2.5L12 10 3.8 8.2" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="17" cy="18" r="2" />
          </svg>
        ),
      },
      {
        key: "dates",
        label: t.bookTrustFlexibleDates,
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        ),
      },
    ],
    [t],
  );

  const selectedVillaName = VILLAS.find((v) => v.slug === fields.villa)?.name;

  const nightlyPriceLabel = formatNightlyPrice(language);
  const showTotalPrice = Boolean(fields.villa && nights !== null);
  const totalPriceLabel =
    nights !== null ? formatTotalPrice(nights, language) : null;

  const handleSubmitSuccess = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section
        className="relative overflow-hidden pb-7 md:pb-16"
        style={{ paddingTop: "var(--site-chrome-h)" }}
      >
        <Image
          src={BOOK_HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          aria-hidden="true"
        />
        <div className="container-site relative z-10 text-center">
          <p className="section-eyebrow mb-2 md:mb-3">{t.bookPageEyebrow}</p>
          <h1
            className="mb-3 text-white md:mb-4"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
            }}
          >
            {t.bookPageTitle}
          </h1>
          <p
            className="mx-auto max-w-xl text-white/70"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            {t.bookPageSubtitle}
          </p>
        </div>
      </section>

      {submitted && (
        <div className="border-b border-[var(--sand)]/30 bg-[var(--sand)]/15">
          <div className="container-site py-2.5 md:py-5">
            <p
              className="text-center text-[var(--dark)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9375rem",
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              {t.bookSubmittedMessage}
            </p>
          </div>
        </div>
      )}

      <section className="bg-[var(--bg)] py-6 md:py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-12">
            {/* Booking fields */}
            <div className="order-1 lg:col-span-2">
              <div className="rounded-sm bg-white p-3 shadow-sm md:p-8">
                <h2
                  className="mb-4 text-[var(--dark)] md:mb-8"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.75rem",
                    fontWeight: 300,
                  }}
                >
                  {t.bookDetailsTitle}
                </h2>

                <BookingForm
                  form={form}
                  idPrefix="book"
                  onSubmitSuccess={handleSubmitSuccess}
                />

              </div>

              <div className="mt-3 text-center md:mt-6">
                <p
                  className="mx-auto max-w-lg italic text-[var(--text-muted)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {t.bookPaymentNote}
                </p>
                <p
                  className="mt-3 text-[var(--text-muted)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.6875rem",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                  }}
                >
                  {t.bookPaymentMethodsLine}
                </p>
              </div>
            </div>

            {/* Summary box - right on desktop, below form on mobile */}
            <div className="order-2 lg:col-span-1">
              <div className="sticky top-24 rounded-sm border border-[var(--sand)]/30 bg-[var(--dark)] p-3 md:p-8">
                <h3
                  className="mb-4 text-[var(--sand)] md:mb-6"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.5rem",
                    fontWeight: 300,
                  }}
                >
                  {t.bookSummaryTitle}
                </h3>

                <dl className="space-y-3 md:space-y-4">
                  <div>
                    <dt
                      className="mb-1 text-white/50"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.6875rem",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {t.bookSummaryVilla}
                    </dt>
                    <dd
                      className="text-white"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "1rem",
                        fontWeight: 400,
                      }}
                    >
                      {selectedVillaName ?? "-"}
                    </dd>
                  </div>

                  {fields.arrivalDate && (
                    <div>
                      <dt
                        className="mb-1 text-white/50"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.6875rem",
                          fontWeight: 500,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t.bookSummaryArrival}
                      </dt>
                      <dd
                        className="text-white"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.9375rem",
                          fontWeight: 300,
                        }}
                      >
                        {new Date(fields.arrivalDate).toLocaleDateString(dateLocale, {
                          weekday: "short",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </dd>
                    </div>
                  )}

                  {fields.departureDate && (
                    <div>
                      <dt
                        className="mb-1 text-white/50"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.6875rem",
                          fontWeight: 500,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t.bookSummaryDeparture}
                      </dt>
                      <dd
                        className="text-white"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.9375rem",
                          fontWeight: 300,
                        }}
                      >
                        {new Date(fields.departureDate).toLocaleDateString(dateLocale, {
                          weekday: "short",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt
                      className="mb-1 text-white/50"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.6875rem",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {t.bookSummaryNights}
                    </dt>
                    <dd
                      className="text-white"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "2rem",
                        fontWeight: 300,
                      }}
                    >
                      {nights !== null ? nights : "-"}
                    </dd>
                  </div>

                  <div>
                    <dt
                      className="mb-1 text-white/50"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.6875rem",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {t.bookSummaryPrice}
                    </dt>
                    <dd className="text-white">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "0.9375rem",
                            fontWeight: 400,
                          }}
                        >
                          {nightlyPriceLabel}{" "}
                          <span className="text-white/60">{t.pricePerNight}</span>
                        </span>
                        <PricingDiscountBadge />
                      </div>
                      {showTotalPrice && totalPriceLabel && (
                        <p
                          className="mt-2"
                          style={{
                            fontFamily: "var(--font-cormorant)",
                            fontSize: "1.75rem",
                            fontWeight: 300,
                            lineHeight: 1.2,
                          }}
                        >
                          <span
                            className="mr-2 text-white/50"
                            style={{
                              fontFamily: "var(--font-inter)",
                              fontSize: "0.6875rem",
                              fontWeight: 500,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                            }}
                          >
                            {t.priceTotal}
                          </span>
                          {totalPriceLabel}
                        </p>
                      )}
                    </dd>
                  </div>

                  {(fields.adults || fields.children) && (
                    <div>
                      <dt
                        className="mb-1 text-white/50"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.6875rem",
                          fontWeight: 500,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t.bookSummaryGuests}
                      </dt>
                      <dd
                        className="text-white"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.9375rem",
                          fontWeight: 300,
                        }}
                      >
                        {fields.adults}{" "}
                        {fields.adults !== "1" ? t.bookGuestAdults : t.bookGuestAdult}
                        {fields.children !== "0" &&
                          `, ${fields.children} ${
                            fields.children !== "1"
                              ? t.bookGuestChildren
                              : t.bookGuestChild
                          }`}
                      </dd>
                    </div>
                  )}
                </dl>

                <div
                  className="mt-6 border-t border-white/10 pt-6"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8125rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  <p className="mb-3">
                    {t.bookSummaryPolicies
                      .replace("{checkIn}", GLOBAL_POLICIES.checkIn)
                      .replace("{checkOut}", GLOBAL_POLICIES.checkOut)}
                  </p>
                  <p>{t.bookSummaryConfirmNote}</p>
                </div>

                <div
                  className="mt-6 border-t border-white/10 pt-6"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8125rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  <p
                    className="mb-2 text-white/50"
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t.bookSummaryPaymentTitle}
                  </p>
                  <p>{t.bookSummaryPaymentText}</p>
                </div>
              </div>
            </div>

            {/* Trust section */}
            <div className="order-3 lg:col-span-3">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
                {trustItems.map((item) => (
                  <div key={item.key} className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--sand)] text-[var(--sand)]">
                      {item.icon}
                    </div>
                    <p
                      className="text-[var(--dark)]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
