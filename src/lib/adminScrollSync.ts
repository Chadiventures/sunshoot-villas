import type { PageSlug } from '@/lib/contentBlockTypes'
import { panelFieldDomId } from '@/lib/adminPanelConfig'

export function scrollPageToCmsBlock(pageSlug: PageSlug, blockKey: string) {
  const el =
    document.querySelector(`[data-page-slug="${pageSlug}"][data-block-key="${blockKey}"]`) ??
    document.querySelector(`[data-page-slug="${pageSlug}"][data-alt-block-key="${blockKey}"]`)
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

export function scrollPanelToField(pageSlug: PageSlug, blockKey: string) {
  const domId = panelFieldDomId(pageSlug, blockKey)

  const run = () => {
    const el = document.getElementById(domId)
    if (!el) return false
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const input = el.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      'input:not([type="file"]), textarea, select',
    )
    input?.focus({ preventScroll: true })
    return true
  }

  const tryScroll = (attempt = 0) => {
    if (run() || attempt >= 5) return
    window.setTimeout(() => tryScroll(attempt + 1), 150)
  }

  tryScroll()
}
