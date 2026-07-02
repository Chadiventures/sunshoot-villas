"use client";

import { useContext } from "react";
import PricingDiscountBadge from "@/components/pricing/PricingDiscountBadge";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { AdminCoreContext, useAdminContent } from "@/hooks/useAdminContent";
import { useLanguage } from "@/context/LanguageContext";
import { getVillaNightlyPriceIdr, IDR_TO_USD_RATE } from "@/lib/pricing";

type VillaNightlyPriceProps = {
  slug: string;
};

function formatIdr(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatUsdFromIdr(idr: number): string {
  return `${Math.round(idr * IDR_TO_USD_RATE)} USD`;
}

export default function VillaNightlyPrice({ slug }: VillaNightlyPriceProps) {
  const core = useContext(AdminCoreContext);
  void core?.contentRevision;
  const { language } = useLanguage();
  const { getText } = useAdminContent();
  const priceRaw = getText("villa.price_idr").trim();
  const parsedIdr = Number.parseInt(priceRaw.replace(/[^\d]/g, ""), 10);
  const idr =
    priceRaw !== "" && Number.isFinite(parsedIdr) && parsedIdr > 0
      ? parsedIdr
      : null;
  const effectiveIdr = idr ?? getVillaNightlyPriceIdr(slug);
  const nightlyPrice =
    language === "en"
      ? formatUsdFromIdr(effectiveIdr)
      : formatIdr(effectiveIdr);

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
        <span className="text-white/75">
          <AdminEditableText blockKey="hero.price_suffix" as="span" />
        </span>
      </p>
      <PricingDiscountBadge />
    </div>
  );
}
