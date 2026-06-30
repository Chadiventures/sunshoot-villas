"use client";

import { useLanguage } from "@/context/LanguageContext";
import { PLACEHOLDER_DISCOUNT_PERCENT } from "@/lib/pricing";

export default function PricingDiscountBadge() {
  const { t } = useLanguage();

  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full bg-[var(--sand)] px-2 py-0.5 text-[var(--dark)]"
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "0.625rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
        lineHeight: 1.3,
      }}
    >
      {t.priceSaveBadge.replace(
        "{percent}",
        String(PLACEHOLDER_DISCOUNT_PERCENT),
      )}
    </span>
  );
}
