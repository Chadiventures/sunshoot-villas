"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type PhoneFieldValue = {
  countryId: string;
  customCountryCode: string;
  phoneNumber: string;
  hasWhatsApp: boolean;
};

export const DEFAULT_PHONE_VALUE: PhoneFieldValue = {
  countryId: "au",
  customCountryCode: "",
  phoneNumber: "",
  hasWhatsApp: false,
};

const COUNTRIES = [
  { id: "au", name: "Australia", flag: "\u{1F1E6}\u{1F1FA}", code: "+61" },
  { id: "se", name: "Sweden", flag: "\u{1F1F8}\u{1F1EA}", code: "+46" },
  { id: "gb", name: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", code: "+44" },
  { id: "us", name: "United States", flag: "\u{1F1FA}\u{1F1F8}", code: "+1" },
  { id: "id", name: "Indonesia", flag: "\u{1F1EE}\u{1F1E9}", code: "+62" },
  { id: "nz", name: "New Zealand", flag: "\u{1F1F3}\u{1F1FF}", code: "+64" },
  { id: "fr", name: "France", flag: "\u{1F1EB}\u{1F1F7}", code: "+33" },
  { id: "de", name: "Germany", flag: "\u{1F1E9}\u{1F1EA}", code: "+49" },
  { id: "nl", name: "Netherlands", flag: "\u{1F1F3}\u{1F1F1}", code: "+31" },
  { id: "sg", name: "Singapore", flag: "\u{1F1F8}\u{1F1EC}", code: "+65" },
  { id: "jp", name: "Japan", flag: "\u{1F1EF}\u{1F1F5}", code: "+81" },
  { id: "other", name: "Other", flag: "\u{1F310}", code: "" },
] as const;

export function getCountryById(id: string) {
  return COUNTRIES.find((c) => c.id === id) ?? COUNTRIES[0];
}

export function formatFullPhone(value: PhoneFieldValue): string {
  const country = getCountryById(value.countryId);
  const code =
    value.countryId === "other"
      ? value.customCountryCode.trim().startsWith("+")
        ? value.customCountryCode.trim()
        : value.customCountryCode.trim()
          ? `+${value.customCountryCode.trim()}`
          : ""
      : country.code;
  const digits = value.phoneNumber.replace(/\s/g, "");
  if (!code && !digits) return "";
  return `${code}${digits}`;
}

export function isPhoneValid(value: PhoneFieldValue): boolean {
  const full = formatFullPhone(value);
  const digits = full.replace(/\D/g, "");
  return digits.length >= 8;
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type PhoneNumberFieldProps = {
  value: PhoneFieldValue;
  onChange: (value: PhoneFieldValue) => void;
  hasError?: boolean;
  label?: string;
  idPrefix?: string;
  required?: boolean;
  fieldId?: string;
};

type CountryListProps = {
  filteredCountries: readonly (typeof COUNTRIES)[number][];
  onSelect: (countryId: string) => void;
  inputStyle: React.CSSProperties;
  search: string;
  onSearchChange: (value: string) => void;
};

function CountryList({
  filteredCountries,
  onSelect,
  inputStyle,
  search,
  onSearchChange,
}: CountryListProps) {
  return (
    <>
      <div className="border-b border-[var(--text)]/10 p-2">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search country..."
          className="w-full rounded-sm border border-[var(--text)]/15 px-3 py-2.5 text-[var(--text)] outline-none focus:border-[var(--sand)]"
          style={inputStyle}
        />
      </div>
      <ul className="max-h-52 overflow-y-auto py-1 sm:max-h-52" role="listbox">
        {filteredCountries.map((country) => (
          <li key={country.id} role="option">
            <button
              type="button"
              onClick={() => onSelect(country.id)}
              className="flex min-h-[48px] w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left transition-colors hover:bg-[var(--bg)]"
              style={inputStyle}
            >
              <span className="text-base" aria-hidden="true">
                {country.flag}
              </span>
              <span className="min-w-0 flex-1 truncate text-[var(--dark)]">
                {country.name}
              </span>
              <span className="shrink-0 text-[var(--text-muted)]">
                {country.code || "Custom"}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function PhoneNumberField({
  value,
  onChange,
  hasError = false,
  label = "Phone",
  idPrefix = "phone",
  required = false,
  fieldId,
}: PhoneNumberFieldProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected = getCountryById(value.countryId);

  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.includes(q) ||
        c.id.includes(q),
    );
  }, [search]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open || isMobile) return;

    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open, isMobile]);

  useEffect(() => {
    if (!open || !isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, isMobile]);

  const borderClass = hasError
    ? "border-red-400"
    : "border-[var(--text)]/15 focus-within:border-[var(--sand)]";

  const inputStyle = {
    fontFamily: "var(--font-inter)",
    fontSize: "0.875rem",
  } as const;

  const selectCountry = (countryId: string) => {
    onChange({ ...value, countryId });
    setOpen(false);
    setSearch("");
  };

  const displayCode =
    value.countryId === "other"
      ? value.customCountryCode || "+?"
      : selected.code;

  return (
    <div id={fieldId}>
      <p
        className="mb-1 block text-[0.625rem] font-medium tracking-[0.15em] text-[var(--dark)] uppercase md:mb-1.5 md:text-[0.6875rem]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </p>

      <div ref={wrapperRef} className="relative">
        <div className={`flex w-full overflow-hidden rounded-sm border bg-white transition-colors ${borderClass}`}>
          <div className="shrink-0 border-r border-[var(--text)]/15">
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="listbox"
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-full min-h-[48px] min-w-[5.5rem] cursor-pointer items-center gap-1.5 px-2.5 py-2 transition-colors hover:bg-[var(--bg)] sm:min-h-[46px] sm:gap-2 sm:px-3.5 sm:py-3"
              style={inputStyle}
            >
              <span className="text-base leading-none" aria-hidden="true">
                {selected.flag}
              </span>
              <span className="whitespace-nowrap text-sm font-medium text-[var(--dark)] sm:text-[0.875rem]">
                {displayCode}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`shrink-0 text-[var(--text-muted)] transition-transform ${open ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          <input
            id={`${idPrefix}-number`}
            type="tel"
            inputMode="tel"
            value={value.phoneNumber}
            onChange={(e) =>
              onChange({ ...value, phoneNumber: e.target.value })
            }
            placeholder="Phone number"
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-[var(--text)] outline-none sm:px-4 sm:py-3 sm:text-[0.875rem]"
            style={inputStyle}
          />
        </div>

        {open && !isMobile && (
          <div
            className="absolute top-full left-0 z-50 mt-1 w-[min(100vw-3rem,280px)] overflow-hidden rounded-sm border border-[var(--text)]/15 bg-white shadow-lg"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <CountryList
              filteredCountries={filteredCountries}
              onSelect={selectCountry}
              inputStyle={inputStyle}
              search={search}
              onSearchChange={setSearch}
            />
          </div>
        )}
      </div>

      {open && isMobile && (
        <div className="fixed inset-0 z-[200] flex flex-col justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close country selector"
            onClick={() => {
              setOpen(false);
              setSearch("");
            }}
          />
          <div
            className="relative flex max-h-[75vh] flex-col rounded-t-xl bg-white shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--text)]/10 px-4 py-3">
              <p
                className="text-[var(--dark)]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                }}
              >
                Select country
              </p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setSearch("");
                }}
                className="min-h-[48px] px-2 text-[var(--text-muted)]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                Close
              </button>
            </div>
            <CountryList
              filteredCountries={filteredCountries}
              onSelect={selectCountry}
              inputStyle={inputStyle}
              search={search}
              onSearchChange={setSearch}
            />
          </div>
        </div>
      )}

      {value.countryId === "other" && (
        <div className="mt-2">
          <input
            id={`${idPrefix}-custom-code`}
            type="text"
            inputMode="tel"
            value={value.customCountryCode}
            onChange={(e) =>
              onChange({ ...value, customCountryCode: e.target.value })
            }
            placeholder="Country code e.g. +47"
            className={`w-full rounded-sm border bg-white px-3 py-2 text-sm text-[var(--text)] outline-none transition-colors sm:px-4 sm:py-2.5 sm:text-[0.875rem] ${borderClass}`}
            style={inputStyle}
          />
        </div>
      )}

      <div className="mt-3">
        <div
          role="button"
          tabIndex={0}
          onClick={() =>
            onChange({ ...value, hasWhatsApp: !value.hasWhatsApp })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onChange({ ...value, hasWhatsApp: !value.hasWhatsApp });
            }
          }}
          className="flex cursor-pointer items-center gap-3"
        >
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 transition-all duration-300 ${
              value.hasWhatsApp
                ? "border-[#C9A96E] bg-[#C9A96E]"
                : "border-[var(--text)]/25 bg-white"
            }`}
            aria-hidden="true"
          >
            {value.hasWhatsApp && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
            )}
          </div>
          <span
            className="text-[var(--text)]"
            style={{ ...inputStyle, fontSize: "0.8125rem" }}
          >
            I have WhatsApp on this number
          </span>
          {value.hasWhatsApp && <WhatsAppIcon />}
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            value.hasWhatsApp
              ? "max-h-0 opacity-0"
              : "max-h-10 opacity-100"
          }`}
        >
          <p
            className="mt-2 text-[var(--text-muted)]"
            style={{ ...inputStyle, fontSize: "0.75rem", fontStyle: "italic" }}
          >
            We will contact you via email
          </p>
        </div>
      </div>

      {hasError && (
        <p className="mt-1 text-xs text-red-500">This field is required</p>
      )}
    </div>
  );
}

export function buildPhoneWhatsAppLines(value: PhoneFieldValue): string[] {
  const fullPhone = formatFullPhone(value);
  const lines = [`*Phone:* ${fullPhone}`];
  if (value.hasWhatsApp) {
    lines.push(`*WhatsApp on this number:* Yes`);
    lines.push(`*Please reply to guest on WhatsApp:* ${fullPhone}`);
  } else {
    lines.push(`*Contact preference:* Email`);
  }
  return lines;
}
