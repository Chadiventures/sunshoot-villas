"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const STORAGE_KEY = "villa-promo-dismissed";
export const BANNER_HEIGHT = 44;

export default function VillaTopBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    setVisible(!dismissed);
    document.documentElement.style.setProperty(
      "--villa-banner-h",
      dismissed ? "0px" : `${BANNER_HEIGHT}px`,
    );
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
    document.documentElement.style.setProperty("--villa-banner-h", "0px");
    window.dispatchEvent(new Event("villa-banner-dismissed"));
  };

  if (!visible) return null;

  const marqueeText = t.bannerText;

  return (
    <div
      className="fixed top-0 right-0 left-0 z-[60] flex items-center"
      style={{
        backgroundColor: "#1A2E1A",
        color: "#ffffff",
        minHeight: `${BANNER_HEIGHT}px`,
      }}
    >
      <div className="villa-banner-marquee flex-1 overflow-hidden pr-12 pl-3">
        <div
          className="villa-banner-track flex w-max items-center"
          aria-hidden="true"
        >
          <span
            className="shrink-0 whitespace-nowrap px-6"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {marqueeText}
          </span>
          <span
            className="shrink-0 whitespace-nowrap px-6"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {marqueeText}
          </span>
        </div>
        <p className="sr-only">{marqueeText}</p>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss banner"
        className="absolute top-1/2 right-3 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#C9A96E] transition-all duration-300 ease-in-out hover:scale-110"
        style={{ color: "#1A2E1A" }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
