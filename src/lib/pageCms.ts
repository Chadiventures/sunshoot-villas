import { cache } from 'react'
import type { PageSlug } from '@/lib/contentBlockTypes'
import { isVillaPageSlug } from '@/lib/contentBlockTypes'
import { cmsBlocksToMergedMap, type CmsLocale } from '@/lib/cmsLocale'
import { getPageContentDefaults } from '@/lib/contentDefaults'
import { getSql } from '@/lib/db'
import { readBlocksForPage } from '@/lib/cmsDb'
import { getVillaCmsContentBlocks } from '@/lib/villaCms'

const loadPageBlocks = cache(async (pageSlug: PageSlug) => {
  const sql = getSql()
  if (!sql) return null
  try {
    return await readBlocksForPage(sql, pageSlug)
  } catch {
    return null
  }
})

export async function getPageCmsContentBlocks(
  pageSlug: PageSlug,
  locale: CmsLocale = 'en',
): Promise<Record<string, string>> {
  if (isVillaPageSlug(pageSlug)) {
    return getVillaCmsContentBlocks(pageSlug, locale)
  }

  const defaults = getPageContentDefaults(pageSlug, locale)
  const blocks = await loadPageBlocks(pageSlug)
  if (!blocks) return defaults

  const fromDb = cmsBlocksToMergedMap(blocks, locale)
  return { ...defaults, ...fromDb }
}
