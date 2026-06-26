"use client";

import { useState, type FormEvent } from "react";
import { VILLAS } from "@/lib/villas";
import { SITE } from "@/lib/site";

type FormFields = {
  name: string;
  email: string;
  phone: string;
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
  phone: "",
  villa: "",
  arrivalDate: "",
  departureDate: "",
  adults: "",
  children: "0",
  message: "",
};

const labelStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: "var(--brand-green)",
};

const inputClassName =
  "w-full bg-transparent py-2.5 text-[#1A1A1A] outline-none transition-colors duration-300 placeholder:text-[#6B6B6B]/60";

const inputStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "14px",
  fontWeight: 300,
};

function fieldBorderStyle(hasError: boolean, isFocused = false) {
  return {
    borderBottom: `1px solid ${
      hasError
        ? "rgba(220, 100, 100, 0.7)"
        : isFocused
          ? "var(--brand-green)"
          : "rgba(26, 26, 26, 0.2)"
    }`,
  };
}

function buildWhatsAppMessage(form: FormFields): string {
  const villaName =
    VILLAS.find((v) => v.slug === form.villa)?.name ?? form.villa;

  const lines = [
    `*Enquiry — ${SITE.shortName}*`,
    "",
    `*Name:* ${form.name}`,
    `*Email:* ${form.email}`,
    `*Phone:* ${form.phone}`,
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
  compact?: boolean;
};

export default function InquiryForm({
  defaultVilla = "",
  compact = false,
}: InquiryFormProps) {
  const [form, setForm] = useState<FormFields>({
    ...initialForm,
    villa: defaultVilla,
  });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const updateField = <K extends FieldKey>(key: K, value: FormFields[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const validate = () => {
    const nextErrors: Partial<Record<FieldKey, boolean>> = {};
    const required: FieldKey[] = [
      "name",
      "email",
      "phone",
      "villa",
      "arrivalDate",
      "departureDate",
      "adults",
    ];

    required.forEach((key) => {
      if (!form[key]) nextErrors[key] = true;
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildWhatsAppMessage(form);
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldError = (key: FieldKey) => Boolean(errors[key]);
  const borderFor = (key: string, hasError: boolean) =>
    fieldBorderStyle(hasError, focusedField === key);

  const FormField = ({
    label,
    name,
    error,
    children,
    className = "",
  }: {
    label: string;
    name: string;
    error?: boolean;
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={className}>
      <label htmlFor={name} className="mb-2 block" style={labelStyle}>
        {label}
      </label>
      {children}
      {error && (
        <p
          className="mt-1"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            color: "rgba(220, 100, 100, 0.9)",
          }}
        >
          This field is required
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {!compact && (
        <div>
          <h3
            className="mb-2 text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 300,
            }}
          >
            Send an Enquiry
          </h3>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(26, 26, 26, 0.6)",
            }}
          >
            Fill in the form and we&apos;ll open WhatsApp with your details
            ready to send.
          </p>
        </div>
      )}

      <FormField label="Name" name="name" error={fieldError("name")}>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          onFocus={() => setFocusedField("name")}
          onBlur={() => setFocusedField(null)}
          className={inputClassName}
          style={{ ...inputStyle, ...borderFor("name", fieldError("name")) }}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FormField label="Email" name="email" error={fieldError("email")}>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className={inputClassName}
            style={{ ...inputStyle, ...borderFor("email", fieldError("email")) }}
          />
        </FormField>
        <FormField label="Phone" name="phone" error={fieldError("phone")}>
          <input
            id="phone"
            type="tel"
            required
            placeholder="+62"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onFocus={() => setFocusedField("phone")}
            onBlur={() => setFocusedField(null)}
            className={inputClassName}
            style={{ ...inputStyle, ...borderFor("phone", fieldError("phone")) }}
          />
        </FormField>
      </div>

      <FormField label="Villa" name="villa" error={fieldError("villa")}>
        <select
          id="villa"
          required
          value={form.villa}
          onChange={(e) => updateField("villa", e.target.value)}
          onFocus={() => setFocusedField("villa")}
          onBlur={() => setFocusedField(null)}
          className={`${inputClassName} cursor-pointer appearance-none`}
          style={{ ...inputStyle, ...borderFor("villa", fieldError("villa")) }}
        >
          <option value="" disabled className="bg-[#E8DFD4]">
            Select a villa
          </option>
          {VILLAS.map((v) => (
            <option key={v.slug} value={v.slug} className="bg-[#E8DFD4]">
              {v.name}
            </option>
          ))}
        </select>
      </FormField>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FormField
          label="Arrival Date"
          name="arrivalDate"
          error={fieldError("arrivalDate")}
        >
          <input
            id="arrivalDate"
            type="date"
            required
            value={form.arrivalDate}
            onChange={(e) => updateField("arrivalDate", e.target.value)}
            onFocus={() => setFocusedField("arrivalDate")}
            onBlur={() => setFocusedField(null)}
            className={`${inputClassName} [color-scheme:light]`}
            style={{
              ...inputStyle,
              ...borderFor("arrivalDate", fieldError("arrivalDate")),
            }}
          />
        </FormField>
        <FormField
          label="Departure Date"
          name="departureDate"
          error={fieldError("departureDate")}
        >
          <input
            id="departureDate"
            type="date"
            required
            value={form.departureDate}
            onChange={(e) => updateField("departureDate", e.target.value)}
            onFocus={() => setFocusedField("departureDate")}
            onBlur={() => setFocusedField(null)}
            className={`${inputClassName} [color-scheme:light]`}
            style={{
              ...inputStyle,
              ...borderFor("departureDate", fieldError("departureDate")),
            }}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FormField label="Adults" name="adults" error={fieldError("adults")}>
          <select
            id="adults"
            required
            value={form.adults}
            onChange={(e) => updateField("adults", e.target.value)}
            onFocus={() => setFocusedField("adults")}
            onBlur={() => setFocusedField(null)}
            className={`${inputClassName} cursor-pointer appearance-none`}
            style={{ ...inputStyle, ...borderFor("adults", fieldError("adults")) }}
          >
            <option value="" disabled className="bg-[#E8DFD4]">
              Select
            </option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={String(n)} className="bg-[#E8DFD4]">
                {n}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Children" name="children">
          <select
            id="children"
            value={form.children}
            onChange={(e) => updateField("children", e.target.value)}
            onFocus={() => setFocusedField("children")}
            onBlur={() => setFocusedField(null)}
            className={`${inputClassName} cursor-pointer appearance-none`}
            style={{ ...inputStyle, ...borderFor("children", false) }}
          >
            {Array.from({ length: 7 }, (_, i) => i).map((n) => (
              <option key={n} value={String(n)} className="bg-[#E8DFD4]">
                {n}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Message" name="message">
        <textarea
          id="message"
          rows={4}
          placeholder="Any special requests or questions..."
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          onFocus={() => setFocusedField("message")}
          onBlur={() => setFocusedField(null)}
          className={`${inputClassName} resize-none`}
          style={{ ...inputStyle, ...borderFor("message", false) }}
        />
      </FormField>

      <button
        type="submit"
        className="btn-alive w-full bg-[var(--brand-green)] py-4 text-white transition-colors duration-300 hover:bg-[var(--brand-green-hover)]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Send via WhatsApp
      </button>
    </form>
  );
}
