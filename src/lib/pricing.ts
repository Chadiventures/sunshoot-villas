import type { Language } from "@/lib/translations";

/** Source-of-truth nightly rate in Indonesian Rupiah. */
export const BASE_NIGHTLY_PRICE_IDR = 1_000_000;

/** Fixed IDR → USD rate (55 USD ≈ 1,000,000 IDR). Update this single value to refresh USD prices site-wide. */
export const IDR_TO_USD_RATE = 55 / BASE_NIGHTLY_PRICE_IDR;

export const PLACEHOLDER_DISCOUNT_PERCENT = 20;

export function getNightlyPriceUsd(): number {
  return Math.round(BASE_NIGHTLY_PRICE_IDR * IDR_TO_USD_RATE);
}

export function getTotalPriceIdr(nights: number): number {
  return BASE_NIGHTLY_PRICE_IDR * nights;
}

export function getTotalPriceUsd(nights: number): number {
  return Math.round(getTotalPriceIdr(nights) * IDR_TO_USD_RATE);
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

export function formatNightlyPrice(language: Language): string {
  return language === "en"
    ? formatUsd(getNightlyPriceUsd())
    : formatIdr(BASE_NIGHTLY_PRICE_IDR);
}

export function formatTotalPrice(nights: number, language: Language): string {
  return language === "en"
    ? formatUsd(getTotalPriceUsd(nights))
    : formatIdr(getTotalPriceIdr(nights));
}
