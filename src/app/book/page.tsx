"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/Footer";
import PhoneNumberField, {
  DEFAULT_PHONE_VALUE,
  buildPhoneWhatsAppLines,
  isPhoneValid,
  type PhoneFieldValue,
} from "@/components/PhoneNumberField";
import { useLanguage } from "@/context/LanguageContext";
import { GLOBAL_POLICIES } from "@/lib/site";
import { VILLAS } from "@/lib/villas";

const WHATSAPP = "6281239701978";

const BOOK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1920&q=80";

type BookingFields = {
  villa: string;
  arrivalDate: string;
  departureDate: string;
  adults: string;
  children: string;
  fullName: string;
  email: string;
  phone: PhoneFieldValue;
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
  phone: DEFAULT_PHONE_VALUE,
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

function toYmd(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayYmd(): string {
  return toYmd(new Date());
}

function getTomorrowYmd(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return toYmd(date);
}

function addDaysToYmd(ymd: string, days: number): string {
  const date = new Date(`${ymd}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toYmd(date);
}

function getDepartureMinYmd(arrivalDate: string): string {
  return arrivalDate ? addDaysToYmd(arrivalDate, 1) : getTomorrowYmd();
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
    ...buildPhoneWhatsAppLines(fields.phone),
  ].filter(Boolean);

  if (fields.specialRequests.trim()) {
    lines.push("", "*Special Requests:*", fields.specialRequests.trim());
  }

  return lines.join("\n");
}

const REQUIRED_MESSAGE = "This field is required";

function RequiredMark() {
  return <span className="text-red-500"> *</span>;
}

const BOOK_FIELD_ORDER: (keyof BookingFields)[] = [
  "villa",
  "arrivalDate",
  "departureDate",
  "fullName",
  "email",
  "phone",
];

const BOOK_FIELD_ELEMENT_IDS: Partial<Record<keyof BookingFields, string>> = {
  villa: "book-villa",
  arrivalDate: "book-arrival",
  departureDate: "book-departure",
  fullName: "book-name",
  email: "book-email",
  phone: "book-phone-field",
};

function scrollToFirstBookError(
  nextErrors: Partial<Record<keyof BookingFields, boolean>>,
) {
  const firstKey = BOOK_FIELD_ORDER.find((key) => nextErrors[key]);
  if (!firstKey) return;

  const elementId = BOOK_FIELD_ELEMENT_IDS[firstKey];
  if (!elementId) return;

  const el = document.getElementById(elementId);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const focusable = el.querySelector<HTMLElement>(
    "input, select, textarea, button",
  );
  if (focusable) {
    focusable.focus();
  }
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
  "mb-1 block text-[0.625rem] font-medium tracking-[0.15em] text-[var(--dark)] uppercase md:mb-1.5 md:text-[0.6875rem]";

const inputClass =
  "w-full rounded-sm border border-[var(--text)]/15 bg-white px-3 py-2 text-sm text-[var(--text)] outline-none transition-colors focus:border-[var(--sand)] md:px-4 md:py-3 md:text-[0.875rem]";

const inputStyle = {
  fontFamily: "var(--font-inter)",
} as const;

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
      "fullName",
      "email",
      "phone",
    ];
    required.forEach((key) => {
      if (key === "phone") {
        if (!isPhoneValid(fields.phone)) next.phone = true;
      } else if (key === "fullName" || key === "email") {
        if (!fields[key].trim()) next[key] = true;
      } else if (!fields[key]) {
        next[key] = true;
      }
    });
    if (fields.arrivalDate && fields.departureDate && nights === null) {
      next.departureDate = true;
    }
    setErrors(next);

    if (Object.keys(next).length > 0) {
      scrollToFirstBookError(next);
      return false;
    }

    return true;
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

  const arrivalMin = getTodayYmd();
  const departureMin = getDepartureMinYmd(fields.arrivalDate);

  useEffect(() => {
    if (fields.arrivalDate && fields.arrivalDate < getTodayYmd()) {
      setFields((prev) => ({ ...prev, arrivalDate: "", departureDate: "" }));
      return;
    }
    if (
      fields.departureDate &&
      fields.departureDate < getDepartureMinYmd(fields.arrivalDate)
    ) {
      setFields((prev) => ({ ...prev, departureDate: "" }));
    }
  }, [fields.arrivalDate, fields.departureDate]);

  const handleArrivalDateChange = (value: string) => {
    if (value && value < getTodayYmd()) {
      setFields((prev) => ({ ...prev, arrivalDate: "", departureDate: "" }));
    } else {
      setFields((prev) => ({
        ...prev,
        arrivalDate: value,
        departureDate:
          prev.departureDate && value && prev.departureDate <= value
            ? ""
            : prev.departureDate,
      }));
    }
    setErrors((prev) => ({
      ...prev,
      arrivalDate: false,
      departureDate: false,
    }));
    if (submitted) setSubmitted(false);
  };

  const handleDepartureDateChange = (value: string) => {
    const min = getDepartureMinYmd(fields.arrivalDate);
    if (value && value < min) {
      setFields((prev) => ({ ...prev, departureDate: "" }));
      return;
    }
    update("departureDate", value);
  };

  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-7 md:pt-32 md:pb-16">
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
          <p className="section-eyebrow mb-2 md:mb-3">Reservations</p>
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
              Thank you! Your booking request has been sent. Warren will be in
              touch within 24 hours.
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
                  Booking Details
                </h2>

                <div className="space-y-3 md:space-y-5">
                  <div>
                    <label htmlFor="book-villa" className={labelClass}>
                      Select Villa
                      <RequiredMark />
                    </label>
                    <select
                      id="book-villa"
                      value={fields.villa}
                      onChange={(e) => update("villa", e.target.value)}
                      className={`${inputClass} cursor-pointer ${fieldError("villa") ? "border-red-400" : ""}`}
                      style={inputStyle}
                    >
                      <option value="">Choose a villa</option>
                      <option value="any">Any villa</option>
                      {VILLAS.map((v) => (
                        <option key={v.slug} value={v.slug}>
                          {v.name.replace("Villa ", "")}
                        </option>
                      ))}
                    </select>
                    {fieldError("villa") && (
                      <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
                    <div className="w-full">
                      <label htmlFor="book-arrival" className={labelClass}>
                        Arrival Date
                        <RequiredMark />
                      </label>
                      <input
                        id="book-arrival"
                        type="date"
                        value={fields.arrivalDate}
                        min={arrivalMin}
                        onChange={(e) => handleArrivalDateChange(e.target.value)}
                        className={`${inputClass} w-full [color-scheme:light] ${fieldError("arrivalDate") ? "border-red-400" : ""}`}
                        style={inputStyle}
                      />
                      {fieldError("arrivalDate") && (
                        <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
                      )}
                    </div>
                    <div className="w-full">
                      <label htmlFor="book-departure" className={labelClass}>
                        Departure Date
                        <RequiredMark />
                      </label>
                      <input
                        id="book-departure"
                        type="date"
                        value={fields.departureDate}
                        min={departureMin}
                        onChange={(e) => handleDepartureDateChange(e.target.value)}
                        className={`${inputClass} w-full [color-scheme:light] ${fieldError("departureDate") ? "border-red-400" : ""}`}
                        style={inputStyle}
                      />
                      {fieldError("departureDate") && (
                        <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
                      )}
                    </div>
                  </div>

                  <p
                    className="text-center italic text-[var(--text-muted)]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.75rem",
                      fontWeight: 300,
                    }}
                  >
                    Minimum stay is 4 nights
                  </p>

                  <div className="grid grid-cols-2 gap-3 md:gap-5">
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
                        style={inputStyle}
                      />
                      {fieldError("adults") && (
                        <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
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
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="book-name" className={labelClass}>
                      Full Name
                      <RequiredMark />
                    </label>
                    <input
                      id="book-name"
                      type="text"
                      value={fields.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      className={`${inputClass} ${fieldError("fullName") ? "border-red-400" : ""}`}
                      style={inputStyle}
                    />
                    {fieldError("fullName") && (
                      <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="book-email" className={labelClass}>
                      Email
                      <RequiredMark />
                    </label>
                    <input
                      id="book-email"
                      type="email"
                      value={fields.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={`${inputClass} ${fieldError("email") ? "border-red-400" : ""}`}
                      style={inputStyle}
                    />
                    {fieldError("email") && (
                      <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
                    )}
                  </div>

                  <PhoneNumberField
                    idPrefix="book"
                    fieldId="book-phone-field"
                    label="Phone Number"
                    value={fields.phone}
                    onChange={(phone) => update("phone", phone)}
                    hasError={fieldError("phone")}
                    required
                  />

                  <div>
                    <label htmlFor="book-requests" className={labelClass}>
                      Special Requests
                    </label>
                    <textarea
                      id="book-requests"
                      rows={3}
                      placeholder="Early check-in, dietary needs, airport pickup details..."
                      value={fields.specialRequests}
                      onChange={(e) => update("specialRequests", e.target.value)}
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
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
                  Secure payment is handled via our booking system. You will receive
                  payment instructions by email or WhatsApp after your booking is
                  confirmed.
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
                  Visa | Mastercard | Cash
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
                  Booking Summary
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
                  <p className="mb-3">
                    Check-in: {GLOBAL_POLICIES.checkIn}. Check-out: By{" "}
                    {GLOBAL_POLICIES.checkOut}.
                  </p>
                  <p>
                    Our team will confirm availability and pricing via WhatsApp
                    within 24 hours.
                  </p>
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
                    Payment Methods
                  </p>
                  <p>We accept Visa, Mastercard and Cash.</p>
                </div>
              </div>
            </div>

            {/* Trust section */}
            <div className="order-3 lg:col-span-3">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
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
