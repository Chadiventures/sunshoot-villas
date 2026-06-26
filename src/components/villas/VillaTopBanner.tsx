"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "villa-promo-dismissed";
export const BANNER_HEIGHT = 44;

export default function VillaTopBanner() {
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

  return (
    <div
      className="fixed top-0 right-0 left-0 z-[60] flex items-center justify-center px-10 py-2.5 text-center"
      style={{
        backgroundColor: "#C9A96E",
        color: "#1A2E1A",
        minHeight: `${BANNER_HEIGHT}px`,
      }}
    >
      <p
        className="text-[0.6875rem] leading-snug font-medium sm:text-xs"
        style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.02em" }}
      >
        <span className="sm:hidden">
          Limited availability July 2026 -{" "}
          <Link href="/book" className="underline">
            Enquire now
          </Link>
        </span>
        <span className="hidden sm:inline">
          Limited availability for July 2026 -{" "}
          <Link href="/book" className="underline hover:opacity-80">
            Enquire now to secure your villa!
          </Link>
        </span>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss banner"
        className="absolute top-1/2 right-3 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:scale-110"
        style={{ color: "#1A2E1A" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
