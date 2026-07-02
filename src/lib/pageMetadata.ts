import type { Metadata } from 'next'
import type { PageSlug } from '@/lib/contentBlockTypes'
import { storageBlockKey } from '@/lib/cmsLocale'
import { getRequestLocale } from '@/lib/requestLocale'
import { getPageSeoDefaults } from '@/lib/pageSeoDefaults'
import { getPageCmsContentBlocks } from '@/lib/pageCms'
import { getVillaCmsContentBlocks } from '@/lib/villaCms'
import { isVillaPageSlug } from '@/lib/contentBlockTypes'

export async function buildPageMetadata(pageSlug: PageSlug): Promise<Metadata> {
  const locale = await getRequestLocale()
  const cms = isVillaPageSlug(pageSlug)
    ? await getVillaCmsContentBlocks(pageSlug, locale)
    : await getPageCmsContentBlocks(pageSlug, locale)
  const fallback = getPageSeoDefaults(pageSlug, locale)
  const title =
    cms[storageBlockKey(locale, 'seo.title')]?.trim() ||
    cms['seo.title']?.trim() ||
    fallback.title
  const description =
    cms[storageBlockKey(locale, 'seo.description')]?.trim() ||
    cms['seo.description']?.trim() ||
    fallback.description
  return { title, description }
}
