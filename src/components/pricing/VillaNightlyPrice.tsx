"use client";

import PricingDiscountBadge from "@/components/pricing/PricingDiscountBadge";
import { useLanguage } from "@/context/LanguageContext";
import { formatNightlyPrice } from "@/lib/pricing";

export default function VillaNightlyPrice() {
  const { t, language } = useLanguage();
  const nightlyPrice = formatNightlyPrice(language);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
      <p
        className="text-white"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
          fontWeight: 500,
        }}
      >
        <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25em", fontWeight: 400 }}>
          {nightlyPrice}
        </span>{" "}
        <span className="text-white/75">{t.pricePerNight}</span>
      </p>
      <PricingDiscountBadge />
    </div>
  );
}
