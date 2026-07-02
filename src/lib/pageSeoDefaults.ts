import type { PageSlug } from '@/lib/contentBlockTypes'
import type { Language } from '@/lib/translations'
import { getPageContentDefaults } from '@/lib/contentDefaults'

export function getPageSeoDefaults(pageSlug: PageSlug, locale: Language = 'en'): {
  title: string
  description: string
} {
  const defaults = getPageContentDefaults(pageSlug, locale)
  return {
    title: defaults['seo.title'] ?? 'Sun Shoot Villas',
    description: defaults['seo.description'] ?? '',
  }
}
