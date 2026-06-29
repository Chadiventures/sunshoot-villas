"use client";

import { useEffect, useState } from "react";
import PhoneNumberField, {
  DEFAULT_PHONE_VALUE,
  buildPhoneWhatsAppLines,
  isPhoneValid,
  type PhoneFieldValue,
} from "@/components/PhoneNumberField";
import { VILLAS } from "@/lib/villas";
import { SITE } from "@/lib/site";

type FormFields = {
  name: string;
  email: string;
  phone: PhoneFieldValue;
  villa: string;
  arrivalDate: string;
  departureDate: string;
  adults: string;
  children: string;
  message: string;
};

type FieldKey = keyof FormFields;

const initialForm: FormFields = {
  name: "",
  email: "",
  phone: DEFAULT_PHONE_VALUE,
  villa: "",
  arrivalDate: "",
  departureDate: "",
  adults: "",
  children: "0",
  message: "",
};

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

const REQUIRED_MESSAGE = "This field is required";

function RequiredMark() {
  return <span className="text-red-500"> *</span>;
}

const CONTACT_FIELD_ORDER: FieldKey[] = ["name", "email", "message"];

const FULL_FIELD_ORDER: FieldKey[] = [
  "name",
  "email",
  "phone",
  "villa",
  "arrivalDate",
  "departureDate",
  "adults",
];

const FIELD_ELEMENT_IDS: Partial<Record<FieldKey, string>> = {
  name: "name",
  email: "email",
  message: "message",
  phone: "inquiry-phone-field",
  villa: "villa",
  arrivalDate: "arrivalDate",
  departureDate: "departureDate",
  adults: "adults",
};

function scrollToFirstError(
  nextErrors: Partial<Record<FieldKey, boolean>>,
  order: FieldKey[],
) {
  const firstKey = order.find((key) => nextErrors[key]);
  if (!firstKey) return;

  const elementId = FIELD_ELEMENT_IDS[firstKey];
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

function buildWhatsAppMessage(form: FormFields): string {
  const villaName =
    VILLAS.find((v) => v.slug === form.villa)?.name ?? form.villa;

  const lines = [
    `*Enquiry - ${SITE.shortName}*`,
    "",
    `*Name:* ${form.name}`,
    `*Email:* ${form.email}`,
    ...buildPhoneWhatsAppLines(form.phone),
    `*Villa:* ${villaName}`,
    `*Arrival:* ${form.arrivalDate}`,
    `*Departure:* ${form.departureDate}`,
    `*Adults:* ${form.adults}`,
    `*Children:* ${form.children}`,
  ];

  if (form.message.trim()) {
    lines.push("", `*Message:*`, form.message.trim());
  }

  return lines.join("\n");
}

type InquiryFormProps = {
  defaultVilla?: string;
  hideVillaSelect?: boolean;
  showHeading?: boolean;
  contactMode?: boolean;
};

export default function InquiryForm({
  defaultVilla = "",
  hideVillaSelect = false,
  showHeading = true,
  contactMode = false,
}: InquiryFormProps) {
  const [form, setForm] = useState<FormFields>({
    ...initialForm,
    villa: defaultVilla,
  });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, boolean>>>({});

  const updateField = <K extends FieldKey>(key: K, value: FormFields[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const validate = () => {
    const nextErrors: Partial<Record<FieldKey, boolean>> = {};

    if (contactMode) {
      if (!form.name.trim()) nextErrors.name = true;
      if (!form.email.trim()) nextErrors.email = true;
      if (!form.message.trim()) nextErrors.message = true;
    } else {
      const required: FieldKey[] = [
        "name",
        "email",
        "phone",
        "arrivalDate",
        "departureDate",
        "adults",
      ];
      if (!hideVillaSelect) required.push("villa");

      required.forEach((key) => {
        if (key === "phone") {
          if (!isPhoneValid(form.phone)) nextErrors.phone = true;
        } else if (!form[key]) {
          nextErrors[key] = true;
        }
      });
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const order = contactMode
        ? CONTACT_FIELD_ORDER
        : FULL_FIELD_ORDER.filter(
            (key) => key !== "villa" || !hideVillaSelect,
          );
      scrollToFirstError(nextErrors, order);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const message = buildWhatsAppMessage(form);
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldError = (key: FieldKey) => Boolean(errors[key]);

  const arrivalMin = getTodayYmd();
  const departureMin = getDepartureMinYmd(form.arrivalDate);

  useEffect(() => {
    if (form.arrivalDate && form.arrivalDate < getTodayYmd()) {
      setForm((prev) => ({ ...prev, arrivalDate: "", departureDate: "" }));
      return;
    }
    if (
      form.departureDate &&
      form.departureDate < getDepartureMinYmd(form.arrivalDate)
    ) {
      setForm((prev) => ({ ...prev, departureDate: "" }));
    }
  }, [form.arrivalDate, form.departureDate]);

  const handleArrivalDateChange = (value: string) => {
    if (value && value < getTodayYmd()) {
      setForm((prev) => ({ ...prev, arrivalDate: "", departureDate: "" }));
    } else {
      setForm((prev) => ({
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
  };

  const handleDepartureDateChange = (value: string) => {
    const min = getDepartureMinYmd(form.arrivalDate);
    if (value && value < min) {
      setForm((prev) => ({ ...prev, departureDate: "" }));
      return;
    }
    updateField("departureDate", value);
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-sm border bg-white px-4 py-3 text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-muted)]/50 ${
      hasError
        ? "border-red-400"
        : "border-[var(--text)]/15 focus:border-[var(--sand)]"
    }`;

  return (
    <div className="space-y-5">
      {showHeading && (
        <div className="mb-2">
          <h3
            className="mb-2 text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 300,
            }}
          >
            Send an Enquiry
          </h3>
          <p
            className="text-[var(--text-muted)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Complete the form and we&apos;ll open WhatsApp with your details
            ready to send.
          </p>
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-[0.6875rem] font-medium tracking-[0.15em] text-[var(--dark)] uppercase"
        >
          Name
          <RequiredMark />
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={inputClass(fieldError("name"))}
          style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
        />
        {fieldError("name") && (
          <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-[0.6875rem] font-medium tracking-[0.15em] text-[var(--dark)] uppercase"
        >
          Email
          <RequiredMark />
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={inputClass(fieldError("email"))}
          style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
        />
        {fieldError("email") && (
          <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
        )}
      </div>

      <PhoneNumberField
        idPrefix="inquiry"
        fieldId="inquiry-phone-field"
        label="Phone"
        value={form.phone}
        onChange={(phone) => updateField("phone", phone)}
        hasError={fieldError("phone")}
        required={!contactMode}
      />

      {!hideVillaSelect && (
        <div>
          <label
            htmlFor="villa"
            className="mb-1.5 block text-[0.6875rem] font-medium tracking-[0.15em] text-[var(--dark)] uppercase"
          >
            Villa
            {!contactMode && <RequiredMark />}
          </label>
          <select
            id="villa"
            value={form.villa}
            onChange={(e) => updateField("villa", e.target.value)}
            className={`${inputClass(fieldError("villa"))} cursor-pointer`}
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
          >
            <option value="" disabled>
              Select a villa
            </option>
            {VILLAS.map((v) => (
              <option key={v.slug} value={v.slug}>
                {v.name}
              </option>
            ))}
          </select>
          {fieldError("villa") && (
            <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="arrivalDate"
            className="mb-1.5 block text-[0.6875rem] font-medium tracking-[0.15em] text-[var(--dark)] uppercase"
          >
            Arrival Date
            {!contactMode && <RequiredMark />}
          </label>
          <input
            id="arrivalDate"
            type="date"
            value={form.arrivalDate}
            min={arrivalMin}
            onChange={(e) => handleArrivalDateChange(e.target.value)}
            className={`${inputClass(fieldError("arrivalDate"))} [color-scheme:light]`}
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
          />
          {fieldError("arrivalDate") && (
            <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="departureDate"
            className="mb-1.5 block text-[0.6875rem] font-medium tracking-[0.15em] text-[var(--dark)] uppercase"
          >
            Departure Date
            {!contactMode && <RequiredMark />}
          </label>
          <input
            id="departureDate"
            type="date"
            value={form.departureDate}
            min={departureMin}
            onChange={(e) => handleDepartureDateChange(e.target.value)}
            className={`${inputClass(fieldError("departureDate"))} [color-scheme:light]`}
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
          />
          {fieldError("departureDate") && (
            <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="adults"
            className="mb-1.5 block text-[0.6875rem] font-medium tracking-[0.15em] text-[var(--dark)] uppercase"
          >
            Adults
            {!contactMode && <RequiredMark />}
          </label>
          <select
            id="adults"
            value={form.adults}
            onChange={(e) => updateField("adults", e.target.value)}
            className={`${inputClass(fieldError("adults"))} cursor-pointer`}
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
          >
            <option value="" disabled>
              Select
            </option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={String(n)}>
                {n}
              </option>
            ))}
          </select>
          {fieldError("adults") && (
            <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="children"
            className="mb-1.5 block text-[0.6875rem] font-medium tracking-[0.15em] text-[var(--dark)] uppercase"
          >
            Children
          </label>
          <select
            id="children"
            value={form.children}
            onChange={(e) => updateField("children", e.target.value)}
            className={`${inputClass(false)} cursor-pointer`}
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
          >
            {Array.from({ length: 7 }, (_, i) => i).map((n) => (
              <option key={n} value={String(n)}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-[0.6875rem] font-medium tracking-[0.15em] text-[var(--dark)] uppercase"
        >
          Message
          {contactMode && <RequiredMark />}
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Any special requests or questions..."
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={`${inputClass(fieldError("message"))} resize-none`}
          style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
        />
        {fieldError("message") && (
          <p className="mt-1 text-xs text-red-500">{REQUIRED_MESSAGE}</p>
        )}
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
        Send via WhatsApp
      </div>
    </div>
  );
}
