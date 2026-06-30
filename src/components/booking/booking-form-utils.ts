import {
  DEFAULT_PHONE_VALUE,
  buildPhoneWhatsAppLines,
  type PhoneFieldValue,
} from "@/components/PhoneNumberField";
import { VILLAS } from "@/lib/villas";

export const BOOKING_WHATSAPP = "6281239701978";

export type BookingFields = {
  villa: string;
  arrivalDate: string;
  departureDate: string;
  adults: string;
  children: string;
  fullName: string;
  email: string;
  phone: PhoneFieldValue;
  airportPickup: boolean;
  flightNumber: string;
  specialRequests: string;
};

export function createInitialBookingFields(
  defaultVilla = "",
): BookingFields {
  return {
    villa: defaultVilla,
    arrivalDate: "",
    departureDate: "",
    adults: "2",
    children: "0",
    fullName: "",
    email: "",
    phone: DEFAULT_PHONE_VALUE,
    airportPickup: false,
    flightNumber: "",
    specialRequests: "",
  };
}

export function calcNights(
  arrival: string,
  departure: string,
): number | null {
  if (!arrival || !departure) return null;
  const start = new Date(arrival);
  const end = new Date(departure);
  const nights = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );
  return nights > 0 ? nights : null;
}

export function toYmd(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayYmd(): string {
  return toYmd(new Date());
}

export function getTomorrowYmd(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return toYmd(date);
}

export function addDaysToYmd(ymd: string, days: number): string {
  const date = new Date(`${ymd}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toYmd(date);
}

export function getDepartureMinYmd(arrivalDate: string): string {
  return arrivalDate ? addDaysToYmd(arrivalDate, 1) : getTomorrowYmd();
}

export function buildBookingWhatsAppMessage(
  fields: BookingFields,
  nights: number | null,
): string {
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

  if (fields.airportPickup) {
    lines.push("", "*Free Airport Pickup:* Yes");
    if (fields.flightNumber.trim()) {
      lines.push(`*Flight Number:* ${fields.flightNumber.trim()}`);
    }
  }

  if (fields.specialRequests.trim()) {
    lines.push("", "*Special Requests:*", fields.specialRequests.trim());
  }

  return lines.join("\n");
}

export const BOOK_FIELD_ORDER: (keyof BookingFields)[] = [
  "villa",
  "arrivalDate",
  "departureDate",
  "fullName",
  "email",
  "phone",
];

export function getBookFieldElementIds(
  idPrefix: string,
): Partial<Record<keyof BookingFields, string>> {
  return {
    villa: `${idPrefix}-villa`,
    arrivalDate: `${idPrefix}-arrival`,
    departureDate: `${idPrefix}-departure`,
    fullName: `${idPrefix}-name`,
    email: `${idPrefix}-email`,
    phone: `${idPrefix}-phone-field`,
  };
}

export function scrollToFirstBookError(
  nextErrors: Partial<Record<keyof BookingFields, boolean>>,
  idPrefix: string,
) {
  const elementIds = getBookFieldElementIds(idPrefix);
  const firstKey = BOOK_FIELD_ORDER.find((key) => nextErrors[key]);
  if (!firstKey) return;

  const elementId = elementIds[firstKey];
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

export const bookingLabelClass =
  "mb-1 block text-[0.625rem] font-medium tracking-[0.15em] text-[var(--dark)] uppercase md:mb-1.5 md:text-[0.6875rem]";

export const bookingInputClass =
  "w-full rounded-sm border border-[var(--text)]/15 bg-white px-3 py-2 text-sm text-[var(--text)] outline-none transition-colors focus:border-[var(--sand)] md:px-4 md:py-3 md:text-[0.875rem]";

export const bookingInputStyle = {
  fontFamily: "var(--font-inter)",
} as const;
