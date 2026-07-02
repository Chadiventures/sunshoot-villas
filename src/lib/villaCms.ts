import { cache } from 'react'
import { cmsBlocksToMergedMap, type CmsLocale } from '@/lib/cmsLocale'
import { getPageContentDefaults } from '@/lib/contentDefaults'
import type { PageSlug } from '@/lib/contentBlockTypes'
import { readBlocksForPage } from '@/lib/cmsDb'
import { getSql } from '@/lib/db'
import { getVillaBySlug } from '@/lib/villas'
import { getVillaLongDescription } from '@/lib/villa-descriptions'
import { VILLA_IMAGES, getVillaGalleryImages } from '@/lib/media'
import { getVillaNightlyPriceIdr } from '@/lib/pricing'
import { translations } from '@/lib/translations'

export type VillaCmsData = {
  name: string
  description: string
  priceIdr: number
  bedrooms: number
  bathrooms: number
  sizeM2: number
  heroImage: string
  galleryImages: string[]
}

function buildFallback(slug: string, locale: CmsLocale = 'en'): VillaCmsData {
  const villa = getVillaBySlug(slug)
  const t = translations[locale]
  const longDescription =
    locale === 'id'
      ? (t[`villa${slug.charAt(0).toUpperCase()}${slug.slice(1)}Description` as keyof typeof t] as string) ||
        getVillaLongDescription(slug)
      : getVillaLongDescription(slug)
  return {
    name: villa?.name ?? `Villa ${slug}`,
    description: longDescription || villa?.description || '',
    priceIdr: getVillaNightlyPriceIdr(slug),
    bedrooms: villa?.stats.bedroomCount ?? 2,
    bathrooms: villa?.stats.bathroomCount ?? 2,
    sizeM2: villa?.stats.sizeM2 ?? 150,
    heroImage: VILLA_IMAGES[slug] ?? VILLA_IMAGES.mawar,
    galleryImages: getVillaGalleryImages(slug),
  }
}

const loadVillaBlocks = cache(async (slug: string) => {
  const sql = getSql()
  if (!sql) return null
  try {
    return await readBlocksForPage(sql, slug)
  } catch {
    return null
  }
})

function blocksToMap(
  blocks: { blockKey: string; value: string }[],
  locale: CmsLocale,
): Record<string, string> {
  return cmsBlocksToMergedMap(blocks, locale)
}

function mapToVillaCmsData(slug: string, map: Record<string, string>, locale: CmsLocale): VillaCmsData {
  const fallback = buildFallback(slug, locale)
  const heroImage = map['villa.hero_image']?.trim() || fallback.heroImage
  const galleryLines = (map['villa.gallery_urls'] ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  const galleryImages =
    galleryLines.length > 0
      ? galleryLines
      : map['villa.hero_image']
        ? getVillaGalleryImages(slug)
        : fallback.galleryImages

  const priceIdr = Number.parseInt(map['villa.price_idr'] ?? '', 10)
  const bedrooms = Number.parseInt(map['villa.bedrooms'] ?? '', 10)
  const bathrooms = Number.parseInt(map['villa.bathrooms'] ?? '', 10)
  const sizeM2 = Number.parseInt(map['villa.size_m2'] ?? '', 10)

  return {
    name: map['villa.name']?.trim() || fallback.name,
    description: map['villa.description']?.trim() || fallback.description,
    priceIdr: priceIdr > 0 ? priceIdr : fallback.priceIdr,
    bedrooms: bedrooms > 0 ? bedrooms : fallback.bedrooms,
    bathrooms: bathrooms > 0 ? bathrooms : fallback.bathrooms,
    sizeM2: sizeM2 > 0 ? sizeM2 : fallback.sizeM2,
    heroImage,
    galleryImages: galleryImages.length > 0 ? galleryImages : fallback.galleryImages,
  }
}

function villaDerivedBlocks(data: VillaCmsData, locale: CmsLocale): Record<string, string> {
  if (locale === 'id') {
    return {
      'details.size_value': `${data.sizeM2} m2`,
      'details.bedrooms_bathrooms_value': `${data.bedrooms} Kamar / ${data.bathrooms} Kamar Mandi`,
      'whatsapp.title': `Tertarik dengan ${data.name}?`,
      'whatsapp.message': `Halo! Saya tertarik dengan ${data.name}. Bisakah Anda mengirimkan informasi lebih lanjut tentang ketersediaan dan harga?`,
    }
  }
  return {
    'details.size_value': `${data.sizeM2} m2`,
    'details.bedrooms_bathrooms_value': `${data.bedrooms} Bed / ${data.bathrooms} Bath`,
    'whatsapp.title': `Interested in ${data.name}?`,
    'whatsapp.message': `Hi! I am interested in ${data.name}. Could you please send me more information about availability and pricing?`,
  }
}

export async function getVillaCmsData(slug: string, locale: CmsLocale = 'en'): Promise<VillaCmsData> {
  const fallback = buildFallback(slug, locale)
  const blocks = await loadVillaBlocks(slug)
  if (!blocks || blocks.length === 0) return fallback
  return mapToVillaCmsData(slug, blocksToMap(blocks, locale), locale)
}

export async function getVillaCmsContentBlocks(
  slug: string,
  locale: CmsLocale = 'en',
): Promise<Record<string, string>> {
  const defaults = getPageContentDefaults(slug as PageSlug, locale)
  const blocks = await loadVillaBlocks(slug)
  if (!blocks) return defaults

  const fromDb = blocksToMap(blocks, locale)
  const data = mapToVillaCmsData(slug, { ...defaults, ...fromDb }, locale)
  return { ...defaults, ...fromDb, ...villaDerivedBlocks(data, locale) }
}
