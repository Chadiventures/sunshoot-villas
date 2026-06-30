"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const textStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
};

function BannerSegment({ text, hidden }: { text: string; hidden?: boolean }) {
  return (
    <span
      className="top-banner-content inline-flex shrink-0 items-center whitespace-nowrap text-white"
      aria-hidden={hidden || undefined}
    >
      <span className="whitespace-nowrap" style={textStyle}>
        {text}
      </span>
      <span
        className="top-banner-separator text-white/70"
        style={textStyle}
        aria-hidden="true"
      >
        ✦
      </span>
    </span>
  );
}

export default function TopBanner() {
  const { t } = useLanguage();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div
      className="top-banner fixed top-0 right-0 left-0 z-[70] block overflow-hidden bg-[var(--brand-green)] transition-colors duration-300 hover:bg-[var(--brand-green-hover)]"
      style={{
        height: "var(--top-banner-h)",
        margin: 0,
        padding: 0,
      }}
    >
      <Link
        href="/contact"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          textDecoration: "none",
        }}
        aria-label="Contact Sun Shoot Villas"
      >
        <div className="top-banner-track flex h-full flex-nowrap items-center">
          <BannerSegment text={t.topBannerText} />
          <BannerSegment text={t.topBannerText} hidden />
        </div>
      </Link>
    </div>
  );
}
