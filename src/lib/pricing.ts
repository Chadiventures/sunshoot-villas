import type { Language } from "@/lib/translations";

/** Reference nightly rate used to derive the site-wide IDR → USD rate. */
export const BASE_NIGHTLY_PRICE_IDR = 1_000_000;

/** Fixed IDR → USD rate (55 USD ≈ 1,000,000 IDR). */
export const IDR_TO_USD_RATE = 55 / BASE_NIGHTLY_PRICE_IDR;

/** Per-villa nightly rates in IDR (source of truth). */
export const VILLA_NIGHTLY_PRICE_IDR: Record<string, number> = {
  mawar: 1_000_000,
  jepun: 1_400_000,
  anggrek: 1_200_000,
  sandat: 900_000,
};

export const PLACEHOLDER_DISCOUNT_PERCENT = 20;

export function getVillaNightlyPriceIdr(slug: string, overrideIdr?: number): number {
  if (overrideIdr !== undefined && overrideIdr > 0) return overrideIdr;
  return VILLA_NIGHTLY_PRICE_IDR[slug] ?? BASE_NIGHTLY_PRICE_IDR;
}

export function getVillaNightlyPriceUsd(slug: string, overrideIdr?: number): number {
  return Math.round(getVillaNightlyPriceIdr(slug, overrideIdr) * IDR_TO_USD_RATE);
}

export function getNightlyPriceUsd(slug?: string): number {
  return slug
    ? getVillaNightlyPriceUsd(slug)
    : Math.round(BASE_NIGHTLY_PRICE_IDR * IDR_TO_USD_RATE);
}

export function getTotalPriceIdr(nights: number, slug?: string): number {
  const nightly = slug ? getVillaNightlyPriceIdr(slug) : BASE_NIGHTLY_PRICE_IDR;
  return nightly * nights;
}

export function getTotalPriceUsd(nights: number, slug?: string): number {
  return Math.round(getTotalPriceIdr(nights, slug) * IDR_TO_USD_RATE);
}

function formatIdr(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatUsd(amount: number): string {
  return `${amount} USD`;
}

export function formatNightlyPrice(
  language: Language,
  slug?: string,
  overrideIdr?: number,
): string {
  const idr = slug
    ? getVillaNightlyPriceIdr(slug, overrideIdr)
    : overrideIdr && overrideIdr > 0
      ? overrideIdr
      : BASE_NIGHTLY_PRICE_IDR;
  return language === "en"
    ? formatUsd(Math.round(idr * IDR_TO_USD_RATE))
    : formatIdr(idr);
}

/** Compact card price: "$55" (EN) or "Rp 1.000.000" (ID). */
export function formatCardNightlyPrice(
  slug: string,
  language: Language,
): string {
  if (language === "en") {
    return `$${getVillaNightlyPriceUsd(slug)}`;
  }
  const idr = getVillaNightlyPriceIdr(slug);
  return `Rp ${new Intl.NumberFormat("id-ID").format(idr)}`;
}

export function formatTotalPrice(
  nights: number,
  language: Language,
  slug?: string,
): string {
  return language === "en"
    ? formatUsd(getTotalPriceUsd(nights, slug))
    : formatIdr(getTotalPriceIdr(nights, slug));
}
