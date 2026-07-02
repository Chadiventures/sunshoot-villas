'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ContentBlockUpsertInput } from '@/lib/contentBlockTypes'
import type { PageSlug } from '@/lib/contentBlockTypes'
import {
  ADMIN_PANEL_PAGE_SLUGS,
  getAdminPanelSectionForRoute,
  isPageSlug,
  sectionPageSlugs,
} from '@/lib/adminPanelConfig'
import { resolveImageDisplayUrl } from '@/lib/resolveImageDisplayUrl'
import { adminPathSegment } from '@/lib/adminPath'
import { getPageContentDefaults } from '@/lib/contentDefaults'
import {
  draftKeyForBlock,
  isSharedCmsBlockKey,
  localeDraftKey,
  parseStorageBlockKey,
  sharedDraftKey,
  storageBlockKey,
  storageKeysForLocale,
  type CmsLocale,
} from '@/lib/cmsLocale'
import type { Language } from '@/lib/translations'
import { useLanguage } from '@/context/LanguageContext'

export const AdminBlockPageContext = createContext<PageSlug | null>(null)

export function pathnameToPageSlug(pathname: string | null): PageSlug | null {
  if (!pathname) return null

  const normalized = pathname.replace(/\/$/, '') || '/'
  const adminSeg = adminPathSegment()
  if (normalized === `/${adminSeg}` || normalized.startsWith(`/${adminSeg}/`)) return null

  const segments = normalized.split('/').filter(Boolean)
  if (segments.length === 0) return 'home'
  if (segments.length === 1) {
    if (segments[0] === 'about') return 'about'
    if (segments[0] === 'contact') return 'contact'
    if (segments[0] === 'book') return 'book'
    if (segments[0] === 'villas') return 'villas'
    if (segments[0] === 'families') return 'families'
    if (segments[0] === 'faq') return 'faq'
    if (segments[0] === 'promos') return 'promos'
    if (segments[0] === 'rates') return 'rates'
    if (segments[0] === 'terms') return 'terms'
  }

  if (segments[0] === 'villas' && segments.length === 2) {
    const villaSlug = segments[1].toLowerCase()
    if (isPageSlug(villaSlug)) return villaSlug as PageSlug
  }

  return null
}

export type AdminCoreContextValue = {
  routePageSlug: PageSlug | null
  adminMode: boolean
  authenticated: boolean
  panelOpen: boolean
  setPanelOpen: (open: boolean) => void
  setAdminMode: (value: boolean) => void
  setAuthenticated: (value: boolean) => void
  contentRevision: number
  loaded: boolean
  loadError: string | null
  isSaving: boolean
  focusedField: { pageSlug: PageSlug; blockKey: string } | null
  focusPanelField: (pageSlug: PageSlug, blockKey: string) => void
  adminLocale: CmsLocale
  setAdminLocale: (locale: CmsLocale) => void
  getDraft: (pageSlug: PageSlug, blockKey: string, locale?: CmsLocale) => string
  hasDraftKey: (pageSlug: PageSlug, blockKey: string, locale?: CmsLocale) => boolean
  getDisplayUrl: (pageSlug: PageSlug, imageBlockKey: string) => string
  updateText: (pageSlug: PageSlug, blockKey: string, value: string, locale?: CmsLocale) => void
  updateImage: (pageSlug: PageSlug, imageBlockKey: string, file: File) => Promise<void>
  saveSection: (pageSlugs: PageSlug[]) => Promise<void>
  save: () => Promise<void>
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  saveError: string | null
  isDirty: boolean
}

export const AdminCoreContext = createContext<AdminCoreContextValue | null>(null)

type BuildArgs = {
  routePageSlug: PageSlug | null
  adminMode: boolean
  authenticated: boolean
  setAuthenticated: (v: boolean) => void
  setAdminMode: (v: boolean) => void
  serverContent: Record<string, string>
  panelOpen: boolean
  setPanelOpen: (open: boolean) => void
}

export function useAdminContent() {
  const core = useContext(AdminCoreContext)
  const { language } = useLanguage()
  const pageSlugFromContext = useContext(AdminBlockPageContext)
  const pageSlug = pageSlugFromContext ?? core?.routePageSlug ?? ('home' as PageSlug)
  const [imageError, setImageError] = useState<string | null>(null)

  const getText = useCallback(
    (blockKey: string) => core?.getDraft(pageSlug, blockKey, language) ?? '',
    [core, pageSlug, language],
  )

  const getImageSrc = useCallback(
    (imageBlockKey: string) => core?.getDisplayUrl(pageSlug, imageBlockKey) ?? '',
    [core, pageSlug],
  )

  const updateTextForPage = useCallback(
    (blockKey: string, value: string) => {
      core?.updateText(pageSlug, blockKey, value, language)
    },
    [core, pageSlug, language],
  )

  const clearImageError = useCallback(() => {
    setImageError(null)
  }, [])

  const updateImageForPage = useCallback(
    async (imageBlockKey: string, file: File) => {
      if (!core) return false
      try {
        setImageError(null)
        await core.updateImage(pageSlug, imageBlockKey, file)
        return true
      } catch (err) {
        setImageError(err instanceof Error ? err.message : 'Upload failed')
        return false
      }
    },
    [core, pageSlug],
  )

  return {
    pageSlug,
    getText,
    getImageSrc,
    updateText: updateTextForPage,
    imageError,
    clearImageError,
    updateImage: updateImageForPage,
  }
}

export function useBuildAdminContentValue({
  routePageSlug,
  adminMode,
  authenticated,
  setAuthenticated,
  setAdminMode,
  serverContent,
  panelOpen,
  setPanelOpen,
}: BuildArgs): AdminCoreContextValue & { routePageSlug: PageSlug | null } {
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [loaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [saveError, setSaveError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)
  const [contentRevision, setContentRevision] = useState(0)
  const [focusedField, setFocusedField] = useState<{
    pageSlug: PageSlug
    blockKey: string
  } | null>(null)
  const [adminLocale, setAdminLocale] = useState<CmsLocale>('en')

  const serverRef = useRef(serverContent)
  serverRef.current = serverContent

  const loadPage = useCallback(async (pageSlug: PageSlug) => {
    setLoaded(false)
    setLoadError(null)
    try {
      const res = await fetch(
        `/api/admin/content?pageSlug=${encodeURIComponent(pageSlug)}`,
        { credentials: 'include', cache: 'no-store' },
      )
      const data = (await res.json().catch(() => ({}))) as {
        blocks?: { pageSlug: string; blockKey: string; value: string }[]
        error?: string
      }
      if (!res.ok) {
        setLoadError(typeof data.error === 'string' ? data.error : 'Could not load content')
        return
      }
      const blocks = Array.isArray(data.blocks) ? data.blocks : []
      setDrafts((prev) => {
        const next = { ...prev }
        for (const b of blocks) {
          const parsed = parseStorageBlockKey(b.blockKey)
          const logicalKey = parsed.logicalKey
          if (isSharedCmsBlockKey(logicalKey)) {
            next[sharedDraftKey(b.pageSlug, logicalKey)] = b.value ?? ''
          } else {
            const loc = parsed.locale ?? 'en'
            next[localeDraftKey(b.pageSlug, loc, logicalKey)] = b.value ?? ''
          }
        }
        return next
      })
      setContentRevision((r) => r + 1)
    } catch {
      setLoadError('Could not load content')
    } finally {
      setLoaded(true)
      setIsDirty(false)
    }
  }, [])

  useEffect(() => {
    if (!adminMode || !authenticated || !routePageSlug) {
      setLoaded(true)
      return
    }
    if (!(ADMIN_PANEL_PAGE_SLUGS as readonly string[]).includes(routePageSlug)) {
      setLoaded(true)
      return
    }
    void loadPage(routePageSlug)
  }, [adminMode, authenticated, routePageSlug, loadPage])

  const getDraft = useCallback(
    (pageSlug: PageSlug, blockKey: string, locale: CmsLocale = 'en') => {
      const shared = isSharedCmsBlockKey(blockKey)
      const key = draftKeyForBlock(pageSlug, blockKey, locale)
      const server = serverRef.current

      const resolveFallback = (): string => {
        if (shared) {
          if (server[blockKey] !== undefined) return server[blockKey] ?? ''
          return getPageContentDefaults(pageSlug, locale as Language)[blockKey] ?? ''
        }
        for (const storageKey of storageKeysForLocale(locale, blockKey)) {
          if (server[storageKey] !== undefined) return server[storageKey] ?? ''
        }
        if (locale === 'en' && server[blockKey] !== undefined) {
          return server[blockKey] ?? ''
        }
        return getPageContentDefaults(pageSlug, locale as Language)[blockKey] ?? ''
      }

      if (key in drafts) {
        return drafts[key] ?? ''
      }
      return resolveFallback()
    },
    [drafts],
  )

  const hasDraftKey = useCallback(
    (pageSlug: PageSlug, blockKey: string, locale: CmsLocale = 'en') =>
      draftKeyForBlock(pageSlug, blockKey, locale) in drafts,
    [drafts],
  )

  const getDisplayUrl = useCallback(
    (pageSlug: PageSlug, imageBlockKey: string) => {
      return resolveImageDisplayUrl(getDraft(pageSlug, imageBlockKey, 'en'))
    },
    [getDraft],
  )

  const updateText = useCallback(
    (pageSlug: PageSlug, blockKey: string, value: string, locale: CmsLocale = adminLocale) => {
      const key = draftKeyForBlock(pageSlug, blockKey, locale)
      setDrafts((prev) => ({
        ...prev,
        [key]: value,
      }))
      setContentRevision((r) => r + 1)
      setIsDirty(true)
      setSaveStatus('idle')
    },
    [adminLocale],
  )

  const updateImage = useCallback(
    async (pageSlug: PageSlug, imageBlockKey: string, file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string }
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Upload failed')
      }
      updateText(pageSlug, imageBlockKey, data.url)
      setIsDirty(true)
    },
    [updateText],
  )

  const focusPanelField = useCallback((pageSlug: PageSlug, blockKey: string) => {
    setFocusedField({ pageSlug, blockKey })
    setPanelOpen(true)
  }, [setPanelOpen])

  const saveSection = useCallback(
    async (pageSlugs: PageSlug[]) => {
      const section = routePageSlug ? getAdminPanelSectionForRoute(routePageSlug) : null
      if (!section) return

      const blocks: ContentBlockUpsertInput[] = []
      const slugsToSave = new Set(pageSlugs)

      for (const group of section.fieldGroups) {
        for (const field of group.fields) {
          if (!slugsToSave.has(field.pageSlug)) continue
          if (field.kind === 'text') {
            blocks.push({
              pageSlug: field.pageSlug,
              blockKey: storageBlockKey(adminLocale, field.blockKey),
              type: 'text',
              value: getDraft(field.pageSlug, field.blockKey, adminLocale),
            })
          } else {
            blocks.push({
              pageSlug: field.pageSlug,
              blockKey: storageBlockKey(adminLocale, field.imageBlockKey),
              type: 'image',
              value: getDraft(field.pageSlug, field.imageBlockKey, 'en'),
            })
            blocks.push({
              pageSlug: field.pageSlug,
              blockKey: storageBlockKey(adminLocale, field.altBlockKey),
              type: 'text',
              value: getDraft(field.pageSlug, field.altBlockKey, adminLocale),
            })
          }
        }
      }

      setIsSaving(true)
      setSaveStatus('saving')
      setSaveError(null)
      try {
        const res = await fetch('/api/admin/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ blocks }),
        })
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string }
          throw new Error(data.error ?? 'Could not save')
        }
        setContentRevision((r) => r + 1)
        setIsDirty(false)
        setSaveStatus('saved')
      } catch (err) {
        setSaveStatus('error')
        setSaveError(err instanceof Error ? err.message : 'Could not save')
        throw err
      } finally {
        setIsSaving(false)
      }
    },
    [getDraft, routePageSlug, adminLocale],
  )

  const save = useCallback(async () => {
    const section = routePageSlug ? getAdminPanelSectionForRoute(routePageSlug) : null
    if (!section) return
    try {
      await saveSection(sectionPageSlugs(section))
    } catch {
      /* saveSection sets error state */
    }
  }, [routePageSlug, saveSection])

  return useMemo(
    () => ({
      routePageSlug,
      adminMode,
      authenticated,
      panelOpen,
      setPanelOpen,
      setAdminMode,
      setAuthenticated,
      contentRevision,
      loaded,
      loadError,
      isSaving,
      focusedField,
      focusPanelField,
      adminLocale,
      setAdminLocale,
      getDraft,
      hasDraftKey,
      getDisplayUrl,
      updateText,
      updateImage,
      saveSection,
      save,
      saveStatus,
      saveError,
      isDirty,
    }),
    [
      routePageSlug,
      adminMode,
      authenticated,
      panelOpen,
      setPanelOpen,
      setAdminMode,
      setAuthenticated,
      contentRevision,
      loaded,
      loadError,
      isSaving,
      focusedField,
      focusPanelField,
      adminLocale,
      setAdminLocale,
      getDraft,
      hasDraftKey,
      getDisplayUrl,
      updateText,
      updateImage,
      saveSection,
      save,
      saveStatus,
      saveError,
      isDirty,
    ],
  )
}
