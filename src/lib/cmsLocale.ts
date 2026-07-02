import type { Language } from '@/lib/translations'
import { isSharedCmsBlockKey } from '@/lib/cmsKeys'

export { isSharedCmsBlockKey }

export type CmsLocale = Language
export function storageBlockKey(locale: CmsLocale, logicalKey: string): string {
  if (isSharedCmsBlockKey(logicalKey)) return logicalKey
  if (logicalKey.startsWith('en.') || logicalKey.startsWith('id.')) {
    return logicalKey
  }
  return `${locale}.${logicalKey}`
}

export function parseStorageBlockKey(storageKey: string): {
  locale: CmsLocale | null
  logicalKey: string
} {
  if (storageKey.startsWith('en.')) {
    return { locale: 'en', logicalKey: storageKey.slice(3) }
  }
  if (storageKey.startsWith('id.')) {
    return { locale: 'id', logicalKey: storageKey.slice(3) }
  }
  return { locale: null, logicalKey: storageKey }
}

/** Keys to try when reading English text from server/DB. */
export function englishStorageLookupKeys(logicalKey: string): string[] {
  if (isSharedCmsBlockKey(logicalKey)) return [logicalKey]
  const prefixed = storageBlockKey('en', logicalKey)
  if (prefixed === logicalKey) return [logicalKey]
  return [prefixed, logicalKey]
}

export function storageKeysForLocale(locale: CmsLocale, logicalKey: string): string[] {
  if (isSharedCmsBlockKey(logicalKey)) return [logicalKey]
  return locale === 'en' ? englishStorageLookupKeys(logicalKey) : [storageBlockKey(locale, logicalKey)]
}

export function localeDraftKey(pageSlug: string, locale: CmsLocale, logicalKey: string): string {
  return `${pageSlug}::${locale}::${logicalKey}`
}

export function sharedDraftKey(pageSlug: string, logicalKey: string): string {
  return `${pageSlug}::__shared__::${logicalKey}`
}

export function draftKeyForBlock(
  pageSlug: string,
  logicalKey: string,
  locale: CmsLocale,
): string {
  return isSharedCmsBlockKey(logicalKey)
    ? sharedDraftKey(pageSlug, logicalKey)
    : localeDraftKey(pageSlug, locale, logicalKey)
}

export function parseLocaleDraftKey(key: string): {
  pageSlug: string
  locale: CmsLocale | 'shared'
  logicalKey: string
} | null {
  const first = key.indexOf('::')
  if (first === -1) return null
  const second = key.indexOf('::', first + 2)
  if (second === -1) return null
  const pageSlug = key.slice(0, first)
  const segment = key.slice(first + 2, second)
  if (segment === '__shared__') {
    return { pageSlug, locale: 'shared', logicalKey: key.slice(second + 2) }
  }
  if (segment !== 'en' && segment !== 'id') return null
  return { pageSlug, locale: segment, logicalKey: key.slice(second + 2) }
}

export const CMS_LANGUAGE_COOKIE = 'sunshoot-language'

export function parseCmsLocale(value: string | null | undefined): CmsLocale {
  return value === 'id' ? 'id' : 'en'
}

/**
 * Merge DB blocks into a logical-key map: shared values + locale-specific text.
 */
export function cmsBlocksToMergedMap(
  blocks: { blockKey: string; value: string }[],
  locale: CmsLocale,
): Record<string, string> {
  const map: Record<string, string> = {}

  for (const block of blocks) {
    if (block.value === '') continue
    const parsed = parseStorageBlockKey(block.blockKey)
    const logicalKey = parsed.logicalKey

    if (isSharedCmsBlockKey(logicalKey)) {
      map[logicalKey] = block.value
      continue
    }

    const blockLocale = parsed.locale ?? 'en'
    if (blockLocale === locale) {
      map[logicalKey] = block.value
    }
  }

  return map
}

/** @deprecated Use cmsBlocksToMergedMap */
export function cmsBlocksToLocaleMap(
  blocks: { blockKey: string; value: string }[],
  locale: CmsLocale,
): Record<string, string> {
  return cmsBlocksToMergedMap(blocks, locale)
}
