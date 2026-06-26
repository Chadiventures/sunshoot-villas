"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES, type Language } from "@/lib/translations";

type LanguageSelectorProps = {
  compact?: boolean;
};

function FlagIcon({ code }: { code: Language }) {
  if (code === "en") {
    return (
      <img
        src="https://flagcdn.com/w20/gb.png"
        width="20"
        height="14"
        alt="English"
        style={{ borderRadius: "2px" }}
      />
    );
  }
  return (
    <img
      src="https://flagcdn.com/w20/id.png"
      width="20"
      height="14"
      alt="Bahasa Indonesia"
      style={{ borderRadius: "2px" }}
    />
  );
}

function LanguageOptionLabel({
  code,
  displayLabel,
}: {
  code: Language;
  displayLabel: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <FlagIcon code={code} />
      {displayLabel}
    </span>
  );
}

export default function LanguageSelector({ compact = false }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const selectLanguage = (code: Language) => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${current.displayLabel}`}
        className="flex items-center gap-1.5 rounded-sm border border-white/20 px-2 py-1.5 text-white transition-all duration-300 ease-in-out hover:border-[var(--sand)] hover:text-[var(--sand)] md:gap-2 md:px-2.5"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: compact ? "1rem" : "0.6875rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
        }}
      >
        {compact ? (
          <FlagIcon code={current.code} />
        ) : (
          <span className="hidden md:inline">
            <LanguageOptionLabel
              code={current.code}
              displayLabel={current.displayLabel}
            />
          </span>
        )}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`hidden shrink-0 transition-transform duration-300 ease-in-out md:block ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        role="listbox"
        aria-label="Select language"
        className={`lang-dropdown absolute top-full right-0 z-50 mt-2 min-w-[200px] overflow-hidden rounded-sm border border-[var(--text)]/10 bg-[#FAF8F5] shadow-lg ${open ? "lang-dropdown-open" : ""}`}
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            role="option"
            aria-selected={language === lang.code}
            onClick={() => selectLanguage(lang.code)}
            className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors duration-300 ease-in-out hover:bg-[var(--sand)]/15 ${
              language === lang.code
                ? "bg-[var(--sand)]/10 text-[var(--dark)]"
                : "text-[var(--text)]"
            }`}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.8125rem",
              fontWeight: language === lang.code ? 500 : 400,
            }}
          >
            <LanguageOptionLabel
              code={lang.code}
              displayLabel={lang.displayLabel}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
