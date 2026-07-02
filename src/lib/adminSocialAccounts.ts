import type { PageSlug } from '@/lib/contentBlockTypes'

export const FOOTER_SOCIAL_PAGE_SLUG: PageSlug = 'global'
export const FOOTER_SOCIAL_MAX_ACCOUNTS = 4
export const SOCIAL_PLATFORMS = ['Instagram', 'Facebook', 'WhatsApp'] as const

export function socialPlatformBlockKey(index: number): string {
  return `footer.social.${index}.platform`
}

export function socialUrlBlockKey(index: number): string {
  return `footer.social.${index}.url`
}

export function listFooterSocialAccountIndices(
  getValue: (blockKey: string) => string,
): number[] {
  const indices: number[] = []
  for (let i = 0; i < FOOTER_SOCIAL_MAX_ACCOUNTS; i++) {
    const platform = getValue(socialPlatformBlockKey(i)).trim()
    const url = getValue(socialUrlBlockKey(i)).trim()
    if (platform || url) indices.push(i)
  }
  if (indices.length === 0) indices.push(0)
  return indices
}

export function nextFooterSocialAccountIndex(getValue: (blockKey: string) => string): number {
  const used = new Set(listFooterSocialAccountIndices(getValue))
  for (let i = 0; i < FOOTER_SOCIAL_MAX_ACCOUNTS; i++) {
    if (!used.has(i)) return i
  }
  return FOOTER_SOCIAL_MAX_ACCOUNTS
}
