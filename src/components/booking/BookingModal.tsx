"use client";

import { useEffect } from "react";
import { BookingForm, useBookingForm } from "@/components/booking/BookingForm";
import PricingDiscountBadge from "@/components/pricing/PricingDiscountBadge";
import { useLanguage } from "@/context/LanguageContext";
import { formatNightlyPrice } from "@/lib/pricing";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  defaultVillaSlug: string;
  villaName: string;
};

export default function BookingModal({
  open,
  onClose,
  defaultVillaSlug,
  villaName,
}: BookingModalProps) {
  const { t, language } = useLanguage();
  const nightlyPrice = formatNightlyPrice(language, defaultVillaSlug);
  const form = useBookingForm(defaultVillaSlug);
  const { reset } = form;

  useEffect(() => {
    if (open) {
      reset(defaultVillaSlug);
    }
  }, [open, defaultVillaSlug, reset]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const title = t.villaBookButton.replace("{villaName}", villaName);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label={t.bookModalClose}
        onClick={onClose}
      />

      <div
        className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-sm bg-white shadow-xl sm:max-h-[90vh] sm:rounded-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--text)]/10 px-4 py-4 md:px-6">
          <div>
            <h2
              id="booking-modal-title"
              className="text-[var(--dark)]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.5rem",
                fontWeight: 300,
              }}
            >
              {title}
            </h2>
            <p
              className="mt-1 text-[var(--text-muted)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8125rem",
                fontWeight: 300,
              }}
            >
              {t.bookPageSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.bookModalClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--bg)] hover:text-[var(--dark)]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-4 py-4 md:px-6 md:py-6">
          <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-[var(--text)]/10 pb-4">
            <p
              className="text-[var(--dark)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9375rem",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                }}
              >
                {nightlyPrice}
              </span>{" "}
              <span className="text-[var(--text-muted)]">{t.pricePerNight}</span>
            </p>
            <PricingDiscountBadge />
          </div>
          <BookingForm
            form={form}
            idPrefix="modal-book"
            onSubmitSuccess={onClose}
          />
        </div>
      </div>
    </div>
  );
}
