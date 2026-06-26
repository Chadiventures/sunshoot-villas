"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#1A1A1A",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function LocationIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#67bc6a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

const contactItems: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}[] = [
  {
    icon: <LocationIcon />,
    label: "Location",
    value: (
      <a
        href="https://maps.google.com/?q=Sahana+Villas+Jl+Kayu+Aya+Seminyak+Bali"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors duration-300 hover:text-[#67bc6a]"
      >
        Jl. Kayu Aya (Oberoi Street) No. 35B, Seminyak, Bali, Indonesia
      </a>
    ),
  },
  {
    icon: <PhoneIcon />,
    label: "Phone",
    value: (
      <a
        href="tel:+62361736674"
        className="transition-colors duration-300 hover:text-[#67bc6a]"
      >
        Front Office: +62 361 73 66 74
      </a>
    ),
  },
  {
    icon: <PhoneIcon />,
    label: "Phone",
    value: (
      <a
        href="tel:+628113882070"
        className="transition-colors duration-300 hover:text-[#67bc6a]"
      >
        Reservations: +62 811 388 2070
      </a>
    ),
  },
  {
    icon: <WhatsAppIcon />,
    label: "WhatsApp",
    value: (
      <a
        href="https://wa.me/628113882070"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors duration-300 hover:text-[#67bc6a]"
      >
        +62 811 388 2070
      </a>
    ),
  },
  {
    icon: <EmailIcon />,
    label: "Email",
    value: (
      <a
        href="mailto:booking@sahanavillas.com"
        className="transition-colors duration-300 hover:text-[#67bc6a]"
      >
        booking@sahanavillas.com
      </a>
    ),
  },
  {
    icon: <ClockIcon />,
    label: "Office Hours",
    value: "Monday to Sunday, 09:00 to 17:00 (WITA)",
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sahanavillas/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/sahanavillas/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "TripAdvisor",
    href: "https://www.tripadvisor.com/Hotel_Review-g297697-d12496069-Reviews-Sahana_Villas-Kuta_Kuta_District_Bali.html",
    isTripAdvisor: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/628113882070",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
];

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  arrivalDate: string;
  departureDate: string;
  adults: string;
  children: string;
  message: string;
  agreeTerms: boolean;
};

type FieldKey = keyof FormFields;

const initialForm: FormFields = {
  firstName: "",
  lastName: "",
  email: "",
  whatsapp: "",
  arrivalDate: "",
  departureDate: "",
  adults: "",
  children: "0",
  message: "",
  agreeTerms: false,
};

const labelStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: "#67bc6a",
};

const valueStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "14px",
  fontWeight: 300,
  lineHeight: 1.7,
  color: "#1A1A1A",
};

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div>
      <div
        className="mb-5"
        style={{ height: "1px", backgroundColor: "#67bc6a", opacity: 0.35 }}
      />
      <div className="flex gap-4">
        <div className="shrink-0 pt-0.5">{icon}</div>
        <div>
          <p className="mb-1" style={labelStyle}>
            {label}
          </p>
          <div style={valueStyle}>{value}</div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  error,
  children,
  className = "",
}: {
  label: string;
  name: string;
  error?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
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
}

function fieldBorderStyle(hasError: boolean, isFocused = false) {
  return {
    borderBottom: `1px solid ${
      hasError
        ? "rgba(220, 100, 100, 0.7)"
        : isFocused
          ? "#67bc6a"
          : "rgba(26, 26, 26, 0.2)"
    }`,
  };
}

const inputClassName =
  "w-full bg-transparent py-2.5 text-[#1A1A1A] outline-none transition-colors duration-300 placeholder:text-[#6B6B6B]/60";

const inputStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "14px",
  fontWeight: 300,
};

export default function ContactSection() {
  const [form, setForm] = useState<FormFields>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
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
      "firstName",
      "lastName",
      "email",
      "whatsapp",
      "arrivalDate",
      "departureDate",
      "adults",
    ];

    required.forEach((key) => {
      if (!form[key]) nextErrors[key] = true;
    });

    if (!form.agreeTerms) nextErrors.agreeTerms = true;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const fieldError = (key: FieldKey) => Boolean(errors[key]);
  const borderFor = (key: string, hasError: boolean) =>
    fieldBorderStyle(hasError, focusedField === key);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-[#F7F3EE] px-6 py-12 md:px-[60px] md:py-16 lg:py-[80px]">
        <h2
          className="mb-10 text-[#1A1A1A]"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "36px",
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          Reach Us Directly
        </h2>

        <div className="space-y-6">
          {contactItems.map((item, index) => (
            <ContactItem
              key={`${item.label}-${index}`}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>

        <div className="mt-12">
          <p className="mb-4" style={labelStyle}>
            Follow Us
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-[#1A1A1A] transition-colors duration-300 hover:text-[#67bc6a]"
              >
                {"isTripAdvisor" in social && social.isTripAdvisor ? (
                  <Image
                    src="/tripadvisor.svg"
                    alt="TripAdvisor"
                    width={20}
                    height={20}
                    className="opacity-90 transition-opacity duration-300 hover:opacity-100"
                    style={{ filter: "brightness(0) saturate(100%) invert(12%) sepia(15%) saturate(1200%) hue-rotate(100deg) brightness(95%)" }}
                  />
                ) : (
                  social.icon
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#c1bab2] px-6 py-12 md:px-[60px] md:py-16 lg:py-[80px]">
        {submitted ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center px-4 text-center">
            <CheckIcon />
            <p
              className="mt-6 max-w-md text-[#1A1A1A]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.5,
              }}
            >
              Thank you for your enquiry. Our team will be in touch within 24
              hours.
            </p>
          </div>
        ) : (
          <>
            <h2
              className="mb-3 text-[#1A1A1A]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "36px",
                fontWeight: 300,
                lineHeight: 1.2,
              }}
            >
              Send an Enquiry
            </h2>
            <p
              className="mb-10"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "rgba(26, 26, 26, 0.6)",
              }}
            >
              Fill in the form below and our team will get back to you within 24
              hours to discuss your stay.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                  label="First Name"
                  name="firstName"
                  error={fieldError("firstName")}
                >
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClassName}
                    style={{ ...inputStyle, ...borderFor("firstName", fieldError("firstName")) }}
                  />
                </FormField>
                <FormField
                  label="Last Name"
                  name="lastName"
                  error={fieldError("lastName")}
                >
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClassName}
                    style={{ ...inputStyle, ...borderFor("lastName", fieldError("lastName")) }}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                  label="Email Address"
                  name="email"
                  error={fieldError("email")}
                >
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
                <FormField
                  label="WhatsApp Number"
                  name="whatsapp"
                  error={fieldError("whatsapp")}
                >
                  <input
                    id="whatsapp"
                    type="tel"
                    required
                    placeholder="+62"
                    value={form.whatsapp}
                    onChange={(e) => updateField("whatsapp", e.target.value)}
                    onFocus={() => setFocusedField("whatsapp")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClassName}
                    style={{ ...inputStyle, ...borderFor("whatsapp", fieldError("whatsapp")) }}
                  />
                </FormField>
              </div>

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
                    style={{ ...inputStyle, ...borderFor("arrivalDate", fieldError("arrivalDate")) }}
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
                    style={{ ...inputStyle, ...borderFor("departureDate", fieldError("departureDate")) }}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                  label="Number of Adults"
                  name="adults"
                  error={fieldError("adults")}
                >
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
                    <option value="" disabled className="bg-[#c1bab2]">
                      Select
                    </option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={String(n)} className="bg-[#c1bab2]">
                        {n}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Number of Children aged 0-12" name="children">
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
                      <option key={n} value={String(n)} className="bg-[#c1bab2]">
                        {n}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField label="Special Requests or Message" name="message">
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about any special requirements, dietary needs, or questions you may have..."
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputClassName} resize-none`}
                  style={{ ...inputStyle, ...borderFor("message", false) }}
                />
              </FormField>

              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={form.agreeTerms}
                    onChange={(e) => updateField("agreeTerms", e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#67bc6a]"
                    style={{
                      outline: fieldError("agreeTerms")
                        ? "1px solid rgba(220, 100, 100, 0.7)"
                        : undefined,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "12px",
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: "rgba(26, 26, 26, 0.65)",
                    }}
                  >
                    I agree to be contacted by the Sahana Villas team regarding
                    my enquiry
                  </span>
                </label>
                {fieldError("agreeTerms") && (
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "11px",
                      color: "rgba(220, 100, 100, 0.9)",
                    }}
                  >
                    Please confirm to continue
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-alive w-full bg-[#67bc6a] py-4 text-white transition-colors duration-300 hover:bg-[#5aaa5d]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Send Enquiry
                </button>
                <p
                  className="mt-4 text-center"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: "rgba(26, 26, 26, 0.45)",
                  }}
                >
                  We typically respond within 24 hours. For urgent enquiries
                  please WhatsApp us directly.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
