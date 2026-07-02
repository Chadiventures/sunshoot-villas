"use client";

import type { ReactNode } from "react";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { useAdminContent } from "@/hooks/useAdminContent";
import { getPageContentDefaults } from "@/lib/contentDefaults";

function IconWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const HIGHLIGHT_ICONS = [
  (
    <IconWrapper className="h-5 w-5 sm:h-7 sm:w-7" key="pool">
      <path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" strokeLinecap="round" />
      <path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" strokeLinecap="round" />
    </IconWrapper>
  ),
  (
    <IconWrapper className="h-5 w-5 sm:h-7 sm:w-7" key="clean">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19h14" strokeLinecap="round" />
      <path d="M8 19v2M16 19v2" strokeLinecap="round" />
    </IconWrapper>
  ),
  (
    <IconWrapper className="h-5 w-5 sm:h-7 sm:w-7" key="transfer">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 19 4c-1 0-2 1-3.5 2.5L12 10 3.8 8.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </IconWrapper>
  ),
];

type VillaHighlightsStripProps = {
  onBookClick: () => void;
};

export default function VillaHighlightsStrip({ onBookClick }: VillaHighlightsStripProps) {
  const { getText, pageSlug } = useAdminContent();
  const VILLA_DEFAULTS = getPageContentDefaults(pageSlug);
  const villaName = getText("villa.name") || VILLA_DEFAULTS["villa.name"] || "";
  const bookLabel = (getText("hero.book_button") || VILLA_DEFAULTS["hero.book_button"] || "Book {villaName}").replace(
    "{villaName}",
    villaName,
  );

  return (
    <div className="villa-highlights-strip bg-[var(--sand)]">
      <div className="container-site">
        <div className="grid max-h-[60px] grid-cols-3 divide-x divide-[var(--dark)]/10 sm:max-h-none">
          {[1, 2, 3].map((n, index) => (
            <div
              key={n}
              className="villa-highlights-strip-in flex max-h-[60px] flex-col items-center justify-center gap-0.5 p-3 text-center sm:max-h-none sm:gap-2 sm:px-4 sm:py-6"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div
                className="villa-highlight-bob shrink-0 text-[var(--dark)]"
                style={{ animationDelay: `${index * 0.35}s` }}
              >
                {HIGHLIGHT_ICONS[index]}
              </div>
              <p
                className="whitespace-nowrap leading-tight text-[var(--dark)] sm:whitespace-normal sm:leading-normal"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                <span className="sm:hidden">
                  <AdminEditableText blockKey={`highlights.${n}.mobile_label`} fallback={VILLA_DEFAULTS[`highlights.${n}.mobile_label`]} as="span" />
                </span>
                <span
                  className="hidden sm:inline"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
                >
                  <AdminEditableText blockKey={`highlights.${n}.label`} fallback={VILLA_DEFAULTS[`highlights.${n}.label`]} as="span" />
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--dark)]/10 py-2 text-center md:hidden">
          <button
            type="button"
            onClick={onBookClick}
            className="inline-flex min-h-[36px] items-center justify-center rounded-sm border-2 border-[var(--dark)] px-5 py-1.5 text-[var(--dark)] transition-all duration-300 ease-in-out hover:bg-[var(--dark)] hover:text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {bookLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
