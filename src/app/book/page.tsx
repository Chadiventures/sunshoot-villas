"use client";

import { useMemo, useState } from "react";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { VILLAS } from "@/lib/villas";

const WHATSAPP = "6281239701978";

type BookingFields = {
  villa: string;
  arrivalDate: string;
  departureDate: string;
  adults: string;
  children: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
};

const initialFields: BookingFields = {
  villa: "",
  arrivalDate: "",
  departureDate: "",
  adults: "2",
  children: "0",
  fullName: "",
  email: "",
  phone: "",
  specialRequests: "",
};

function calcNights(arrival: string, departure: string): number | null {
  if (!arrival || !departure) return null;
  const start = new Date(arrival);
  const end = new Date(departure);
  const nights = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );
  return nights > 0 ? nights : null;
}

function buildWhatsAppMessage(fields: BookingFields, nights: number | null): string {
  const villaName =
    VILLAS.find((v) => v.slug === fields.villa)?.name ?? fields.villa;

  const lines = [
    "*Booking Request - Sun Shoot Villas Seminyak*",
    "",
    `*Villa:* ${villaName}`,
    `*Arrival:* ${fields.arrivalDate}`,
    `*Departure:* ${fields.departureDate}`,
    nights !== null ? `*Nights:* ${nights}` : "",
    `*Adults:* ${fields.adults}`,
    `*Children:* ${fields.children}`,
    "",
    `*Full Name:* ${fields.fullName}`,
    `*Email:* ${fields.email}`,
    `*Phone:* ${fields.phone}`,
  ].filter(Boolean);

  if (fields.specialRequests.trim()) {
    lines.push("", "*Special Requests:*", fields.specialRequests.trim());
  }

  return lines.join("\n");
}

const trustItems = [
  {
    label: "Secure Booking",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Personal Host",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "Free Airport Pickup",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 19 4c-1 0-2 1-3.5 2.5L12 10 3.8 8.2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
  {
    label: "Flexible Dates",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
];

const labelClass =
  "mb-1.5 block text-[0.6875rem] font-medium tracking-[0.15em] text-[var(--dark)] uppercase";

const inputClass =
  "w-full rounded-sm border border-[var(--text)]/15 bg-white px-4 py-3 text-[var(--text)] outline-none transition-colors focus:border-[var(--sand)]";

export default function BookPage() {
  const { t } = useLanguage();
  const [fields, setFields] = useState<BookingFields>(initialFields);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const nights = useMemo(
    () => calcNights(fields.arrivalDate, fields.departureDate),
    [fields.arrivalDate, fields.departureDate],
  );

  const selectedVillaName = VILLAS.find((v) => v.slug === fields.villa)?.name;

  const update = <K extends keyof BookingFields>(key: K, value: BookingFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
    if (submitted) setSubmitted(false);
  };

  const validate = () => {
    const next: Partial<Record<keyof BookingFields, boolean>> = {};
    const required: (keyof BookingFields)[] = [
      "villa",
      "arrivalDate",
      "departureDate",
      "adults",
      "fullName",
      "email",
      "phone",
    ];
    required.forEach((key) => {
      if (!fields[key]) next[key] = true;
    });
    if (fields.arrivalDate && fields.departureDate && nights === null) {
      next.departureDate = true;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const message = buildWhatsAppMessage(fields, nights);
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fieldError = (key: keyof BookingFields) => Boolean(errors[key]);

  return (
    <>
      <section className="bg-[var(--dark)] pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="container-site text-center">
          <p className="section-eyebrow mb-3">Reservations</p>
          <h1
            className="mb-4 text-white"
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
          <div className="container-site py-5">
            <p
              className="text-center text-[var(--dark)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9375rem",
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Thank you! Your booking request has been sent. Warren will be in
              touch within 24 hours.
            </p>
          </div>
        </div>
      )}

      <section className="bg-[var(--bg)] py-12 md:py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
            {/* Booking fields */}
            <div className="order-1 lg:col-span-2">
              <div className="rounded-sm bg-white p-6 shadow-sm md:p-8">
                <h2
                  className="mb-8 text-[var(--dark)]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.75rem",
                    fontWeight: 300,
                  }}
                >
                  Booking Details
                </h2>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="book-villa" className={labelClass}>
                      Select Villa
                    </label>
                    <select
                      id="book-villa"
                      value={fields.villa}
                      onChange={(e) => update("villa", e.target.value)}
                      className={`${inputClass} cursor-pointer ${fieldError("villa") ? "border-red-400" : ""}`}
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
                    >
                      <option value="">Choose a villa</option>
                      {VILLAS.map((v) => (
                        <option key={v.slug} value={v.slug}>
                          {v.name.replace("Villa ", "")}
                        </option>
                      ))}
                    </select>
                    {fieldError("villa") && (
                      <p className="mt-1 text-xs text-red-500">Please select a villa</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="book-arrival" className={labelClass}>
                        Arrival Date
                      </label>
                      <input
                        id="book-arrival"
                        type="date"
                        value={fields.arrivalDate}
                        onChange={(e) => update("arrivalDate", e.target.value)}
                        className={`${inputClass} [color-scheme:light] ${fieldError("arrivalDate") ? "border-red-400" : ""}`}
                        style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
                      />
                      {fieldError("arrivalDate") && (
                        <p className="mt-1 text-xs text-red-500">Required</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="book-departure" className={labelClass}>
                        Departure Date
                      </label>
                      <input
                        id="book-departure"
                        type="date"
                        value={fields.departureDate}
                        onChange={(e) => update("departureDate", e.target.value)}
                        className={`${inputClass} [color-scheme:light] ${fieldError("departureDate") ? "border-red-400" : ""}`}
                        style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
                      />
                      {fieldError("departureDate") && (
                        <p className="mt-1 text-xs text-red-500">
                          Required - must be after arrival
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="book-adults" className={labelClass}>
                        Adults
                      </label>
                      <input
                        id="book-adults"
                        type="number"
                        min={1}
                        max={20}
                        value={fields.adults}
                        onChange={(e) => update("adults", e.target.value)}
                        className={`${inputClass} ${fieldError("adults") ? "border-red-400" : ""}`}
                        style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
                      />
                      {fieldError("adults") && (
                        <p className="mt-1 text-xs text-red-500">Required</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="book-children" className={labelClass}>
                        Children
                      </label>
                      <input
                        id="book-children"
                        type="number"
                        min={0}
                        max={20}
                        value={fields.children}
                        onChange={(e) => update("children", e.target.value)}
                        className={inputClass}
                        style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="book-name" className={labelClass}>
                      Full Name
                    </label>
                    <input
                      id="book-name"
                      type="text"
                      value={fields.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      className={`${inputClass} ${fieldError("fullName") ? "border-red-400" : ""}`}
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
                    />
                    {fieldError("fullName") && (
                      <p className="mt-1 text-xs text-red-500">Required</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="book-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="book-email"
                        type="email"
                        value={fields.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={`${inputClass} ${fieldError("email") ? "border-red-400" : ""}`}
                        style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
                      />
                      {fieldError("email") && (
                        <p className="mt-1 text-xs text-red-500">Required</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="book-phone" className={labelClass}>
                        Phone Number
                      </label>
                      <input
                        id="book-phone"
                        type="tel"
                        placeholder="+62"
                        value={fields.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={`${inputClass} ${fieldError("phone") ? "border-red-400" : ""}`}
                        style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
                      />
                      {fieldError("phone") && (
                        <p className="mt-1 text-xs text-red-500">Required</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="book-requests" className={labelClass}>
                      Special Requests
                    </label>
                    <textarea
                      id="book-requests"
                      rows={4}
                      placeholder="Early check-in, dietary needs, airport pickup details..."
                      value={fields.specialRequests}
                      onChange={(e) => update("specialRequests", e.target.value)}
                      className={`${inputClass} resize-none`}
                      style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
                    />
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={handleSubmit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                    className="btn-primary w-full cursor-pointer text-center"
                  >
                    Send Booking Request
                  </div>
                </div>
              </div>
            </div>

            {/* Summary box - right on desktop, below form on mobile */}
            <div className="order-2 lg:col-span-1">
              <div className="sticky top-24 rounded-sm border border-[var(--sand)]/30 bg-[var(--dark)] p-6 md:p-8">
                <h3
                  className="mb-6 text-[var(--sand)]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.5rem",
                    fontWeight: 300,
                  }}
                >
                  Booking Summary
                </h3>

                <dl className="space-y-4">
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
                      Villa
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
                        Arrival
                      </dt>
                      <dd
                        className="text-white"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.9375rem",
                          fontWeight: 300,
                        }}
                      >
                        {new Date(fields.arrivalDate).toLocaleDateString("en-GB", {
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
                        Departure
                      </dt>
                      <dd
                        className="text-white"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.9375rem",
                          fontWeight: 300,
                        }}
                      >
                        {new Date(fields.departureDate).toLocaleDateString("en-GB", {
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
                      Nights
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
                        Guests
                      </dt>
                      <dd
                        className="text-white"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.9375rem",
                          fontWeight: 300,
                        }}
                      >
                        {fields.adults} adult{fields.adults !== "1" ? "s" : ""}
                        {fields.children !== "0" &&
                          `, ${fields.children} child${fields.children !== "1" ? "ren" : ""}`}
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
                  Our team will confirm availability and pricing via WhatsApp
                  within 24 hours.
                </div>
              </div>
            </div>

            {/* Trust section */}
            <div className="order-3 lg:col-span-3">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {trustItems.map((item) => (
                  <div key={item.label} className="text-center">
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
