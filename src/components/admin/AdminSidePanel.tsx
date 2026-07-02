'use client'

import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  adminBlockLabel,
  getAdminPanelSectionForRoute,
  panelFieldDomId,
  sectionPageSlugs,
  type AdminPanelField,
  type AdminPanelFieldGroup,
} from '@/lib/adminPanelConfig'
import { formatTimeAgoSv, truncatePreview } from '@/lib/formatTimeAgoSv'
import {
  FOOTER_SOCIAL_MAX_ACCOUNTS,
  FOOTER_SOCIAL_PAGE_SLUG,
  listFooterSocialAccountIndices,
  nextFooterSocialAccountIndex,
  SOCIAL_PLATFORMS,
  socialPlatformBlockKey,
  socialUrlBlockKey,
} from '@/lib/adminSocialAccounts'
import type { PageSlug } from '@/lib/contentBlockTypes'
import type { CmsLocale } from '@/lib/cmsLocale'
import { AdminCoreContext, pathnameToPageSlug, type AdminCoreContextValue } from '@/hooks/useAdminContent'
import { ADMIN_TOOLBAR_HEIGHT_PX } from '@/lib/adminToolbar'
import { getPageSeoDefaults } from '@/lib/pageSeoDefaults'
import { useAdminImageEditor } from '@/lib/adminImageEditorContext'
import { isValidImageUploadFile } from '@/lib/isValidImageUploadFile'
import { IMAGE_UPLOAD_PLACEHOLDER, resolveImageDisplayUrl } from '@/lib/resolveImageDisplayUrl'
import { scrollPageToCmsBlock, scrollPanelToField } from '@/lib/adminScrollSync'
import { useLanguage } from '@/context/LanguageContext'

export const ADMIN_PANEL_WIDTH_PX = 320

function focusPanelFieldAndScrollPage(
  core: AdminCoreContextValue,
  pageSlug: PageSlug,
  blockKey: string,
) {
  scrollPageToCmsBlock(pageSlug, blockKey)
  core.focusPanelField(pageSlug, blockKey)
}

function fieldBlockKey(field: AdminPanelField): string {
  return field.kind === 'text' ? field.blockKey : field.imageBlockKey
}

function PanelLanguageToggle() {
  const core = useContext(AdminCoreContext)
  if (!core) return null
  const { language, setLanguage } = useLanguage()
  const { setAdminLocale } = core
  const tabClass = (locale: CmsLocale) =>
    [
      'flex-1 py-2 font-sans text-[10px] uppercase tracking-widest transition-colors',
      language === locale
        ? 'border border-[#c9a84c] bg-[#c9a84c]/20 text-[#c9a84c]'
        : 'border border-white/20 text-pearl/70 hover:border-white/40 hover:text-pearl',
    ].join(' ')

  return (
    <div className="flex gap-2">
      <button
        type="button"
        className={tabClass('en')}
        onClick={() => {
          setLanguage('en')
          setAdminLocale('en')
        }}
      >
        EN
      </button>
      <button
        type="button"
        className={tabClass('id')}
        onClick={() => {
          setLanguage('id')
          setAdminLocale('id')
        }}
      >
        ID
      </button>
    </div>
  )
}

function PanelTextField({
  pageSlug,
  inputId,
  blockKey,
  multiline,
  highlighted,
  charLimit,
}: {
  pageSlug: PageSlug
  inputId: string
  blockKey: string
  multiline?: boolean
  highlighted?: boolean
  charLimit?: number
}) {
  const core = useContext(AdminCoreContext)
  void core?.contentRevision
  const { language } = useLanguage()
  const locale = language as CmsLocale
  const value = core?.getDraft(pageSlug, blockKey, locale) ?? ''
  const handleChange = (newValue: string) => core?.updateText(pageSlug, blockKey, newValue, locale)
  const handleFocus = () => {
    if (!core) return
    focusPanelFieldAndScrollPage(core, pageSlug, blockKey)
  }

  const common = [
    'w-full rounded border bg-white/5 px-3 py-2 font-sans text-sm text-pearl placeholder:text-pearl/35 focus:border-gold focus:outline-none',
    highlighted
      ? 'border-[#c9a84c] ring-2 ring-[#c9a84c]/60 ring-offset-2 ring-offset-[#1a2e1a]'
      : 'border-white/20',
  ].join(' ')

  const charCount = value.length
  const overLimit = charLimit !== undefined && charCount > charLimit
  const counter =
    charLimit !== undefined ? (
      <p
        className={`mt-1 font-sans text-[10px] tracking-wide ${
          overLimit ? 'text-red-300' : 'text-pearl/45'
        }`}
      >
        {charCount}/{charLimit} characters
      </p>
    ) : null

  if (multiline) {
    return (
      <div>
        <textarea
          id={inputId}
          rows={4}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          className={`${common} resize-y min-h-[5rem]`}
        />
        {counter}
      </div>
    )
  }

  return (
    <div>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={handleFocus}
        className={common}
      />
      {counter}
    </div>
  )
}

function PanelImageField({
  pageSlug,
  field,
  highlighted,
}: {
  pageSlug: PageSlug
  field: Extract<AdminPanelField, { kind: 'image' }>
  highlighted?: boolean
}) {
  const core = useContext(AdminCoreContext)
  const revision = core?.contentRevision ?? 0
  const { language } = useLanguage()
  const locale = language as CmsLocale
  const { openImageEditor } = useAdminImageEditor()
  const fileRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const src = core?.getDisplayUrl(pageSlug, field.imageBlockKey) ?? ''
  const altText = core?.getDraft(pageSlug, field.altBlockKey, locale) ?? ''
  void revision
  const preview = src || IMAGE_UPLOAD_PLACEHOLDER
  const companions = field.companionFields ?? []

  const highlightWrap = highlighted
    ? 'rounded ring-2 ring-[#c9a84c]/60 ring-offset-2 ring-offset-[#1a2e1a]'
    : ''

  const uploadFile = (file: File) => {
    if (isValidImageUploadFile(file)) {
      void core?.updateImage(pageSlug, field.imageBlockKey, file)
    }
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) uploadFile(file)
  }

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOver(false)
    }
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) uploadFile(file)
  }

  const altInputClass = [
    'w-full rounded border bg-white/5 px-3 py-2 font-sans text-sm text-pearl focus:border-gold focus:outline-none',
    highlighted ? 'border-gold' : 'border-white/20',
  ].join(' ')

  return (
    <div className={`space-y-2 ${highlightWrap}`}>
      <div
        className={`relative aspect-video w-full overflow-hidden rounded border bg-black/20 transition-colors ${
          dragOver ? 'border-gold ring-2 ring-gold/50' : 'border-white/20'
        }`}
        onClick={() => {
          if (!core) return
          focusPanelFieldAndScrollPage(core, pageSlug, field.imageBlockKey)
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <img src={preview} alt={altText} className="h-full w-full object-cover" />
        {dragOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a2e1a]/60">
            <span className="font-sans text-xs uppercase tracking-wider text-gold">
              Drop image here
            </span>
          </div>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={onFileChange}
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded border border-gold/60 px-3 py-1.5 font-sans text-[10px] uppercase tracking-wider text-gold transition-colors hover:bg-gold/10"
        >
          Upload image
        </button>
        <button
          type="button"
          onClick={() =>
            openImageEditor(field.imageBlockKey, field.altBlockKey, {
              pageSlug,
            })
          }
          className="rounded border border-white/20 px-3 py-1.5 font-sans text-[10px] uppercase tracking-wider text-pearl/90 transition-colors hover:border-gold hover:text-gold"
        >
          Adjust crop
        </button>
      </div>
      <label
        htmlFor={`panel-alt-${pageSlug}-${field.altBlockKey}`}
        className="block font-sans text-[10px] uppercase tracking-wider text-pearl/55"
      >
        Alt-text
      </label>
      <input
        id={`panel-alt-${pageSlug}-${field.altBlockKey}`}
        type="text"
        readOnly={false}
        value={core?.getDraft(pageSlug, field.altBlockKey, locale) ?? ''}
        onChange={(e) => core?.updateText(pageSlug, field.altBlockKey, e.target.value, locale)}
        onFocus={() => {
          if (!core) return
          focusPanelFieldAndScrollPage(core, pageSlug, field.altBlockKey)
        }}
        className={altInputClass}
      />
      {companions.map((companion) => (
        <div key={companion.blockKey}>
          <label
            htmlFor={`panel-${companion.pageSlug}-${companion.blockKey}`}
            className="mb-1.5 block font-sans text-[10px] uppercase tracking-wider text-pearl/55"
          >
            {companion.label}
          </label>
          <PanelTextField
            pageSlug={companion.pageSlug}
            inputId={`panel-${companion.pageSlug}-${companion.blockKey}`}
            blockKey={companion.blockKey}
            multiline={companion.multiline}
            highlighted={highlighted}
            charLimit={companion.charLimit}
          />
        </div>
      ))}
    </div>
  )
}

function PanelFooterSocialAccounts() {
  const core = useContext(AdminCoreContext)
  const revision = core?.contentRevision ?? 0
  const { language } = useLanguage()
  const locale = language as CmsLocale
  const pageSlug = FOOTER_SOCIAL_PAGE_SLUG
  const [extraIndices, setExtraIndices] = useState<number[]>([])

  const getValue = (blockKey: string) => core?.getDraft(pageSlug, blockKey, locale) ?? ''
  void revision

  const indices = [
    ...new Set([...listFooterSocialAccountIndices(getValue), ...extraIndices]),
  ].sort((a, b) => a - b)

  const addAccount = () => {
    const next = nextFooterSocialAccountIndex(getValue)
    if (next >= FOOTER_SOCIAL_MAX_ACCOUNTS) return
    setExtraIndices((prev) => [...new Set([...prev, next])])
    if (!getValue(socialPlatformBlockKey(next)).trim()) {
      core?.updateText(pageSlug, socialPlatformBlockKey(next), SOCIAL_PLATFORMS[0], locale)
    }
  }

  const removeAccount = (index: number) => {
    core?.updateText(pageSlug, socialPlatformBlockKey(index), '', locale)
    core?.updateText(pageSlug, socialUrlBlockKey(index), '', locale)
    setExtraIndices((prev) => prev.filter((i) => i !== index))
  }

  return (
    <div className="space-y-3 border-t border-white/10 pt-4">
      <p className="font-sans text-[10px] uppercase tracking-wider text-pearl/55">
        Social media
      </p>
      {indices.map((index) => (
        <div
          key={index}
          className="space-y-2 rounded border border-white/10 bg-white/[0.03] p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-sans text-[10px] uppercase tracking-wider text-pearl/45">
              Account {index + 1}
            </span>
            {indices.length > 1 && (
              <button
                type="button"
                onClick={() => removeAccount(index)}
                className="font-sans text-[10px] uppercase tracking-wider text-red-300/90 hover:text-red-200"
              >
                Remove
              </button>
            )}
          </div>
          <label
            htmlFor={`panel-social-platform-${index}`}
            className="mb-1 block font-sans text-[10px] uppercase tracking-wider text-pearl/55"
          >
            Platform
          </label>
          <select
            id={`panel-social-platform-${index}`}
            value={getValue(socialPlatformBlockKey(index))}
            onChange={(e) =>
              core?.updateText(pageSlug, socialPlatformBlockKey(index), e.target.value, locale)
            }
            onFocus={() => {
              if (!core) return
              focusPanelFieldAndScrollPage(core, pageSlug, socialPlatformBlockKey(index))
            }}
            className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-gray-900 focus:border-gold focus:outline-none"
          >
            {SOCIAL_PLATFORMS.map((platform) => (
              <option key={platform} value={platform} className="text-gray-900">
                {platform}
              </option>
            ))}
          </select>
          <label
            htmlFor={`panel-social-url-${index}`}
            className="mb-1 block font-sans text-[10px] uppercase tracking-wider text-pearl/55"
          >
            URL
          </label>
          <input
            id={`panel-social-url-${index}`}
            type="url"
            readOnly={false}
            value={getValue(socialUrlBlockKey(index))}
            onChange={(e) => core?.updateText(pageSlug, socialUrlBlockKey(index), e.target.value, locale)}
            onFocus={() => {
              if (!core) return
              focusPanelFieldAndScrollPage(core, pageSlug, socialUrlBlockKey(index))
            }}
            placeholder="https://"
            className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-pearl placeholder:text-pearl/35 focus:border-gold focus:outline-none"
          />
        </div>
      ))}
      {indices.length < FOOTER_SOCIAL_MAX_ACCOUNTS && (
        <button
          type="button"
          onClick={addAccount}
          className="w-full rounded border border-dashed border-white/20 px-3 py-2 font-sans text-[10px] uppercase tracking-wider text-pearl/70 transition-colors hover:border-gold hover:text-gold"
        >
          Add account
        </button>
      )}
    </div>
  )
}

function PanelFieldEditor({
  field,
  highlighted,
}: {
  field: AdminPanelField
  highlighted?: boolean
}) {
  const blockKey = fieldBlockKey(field)
  const domId = panelFieldDomId(field.pageSlug, blockKey)
  const inputId =
    field.kind === 'text' ? `panel-${field.pageSlug}-${field.blockKey}` : undefined

  return (
    <div id={domId} className="scroll-mt-4">
      {field.kind === 'text' ? (
        <>
          <label
            htmlFor={inputId}
            className={`mb-1.5 block font-sans text-[10px] uppercase tracking-wider ${
              highlighted ? 'text-gold' : 'text-pearl/55'
            }`}
          >
            {field.label}
          </label>
          <PanelTextField
            pageSlug={field.pageSlug}
            inputId={inputId!}
            blockKey={field.blockKey}
            multiline={field.multiline}
            highlighted={highlighted}
            charLimit={field.charLimit}
          />
        </>
      ) : (
        <>
          <p
            className={`mb-1.5 font-sans text-[10px] uppercase tracking-wider ${
              highlighted ? 'text-gold' : 'text-pearl/55'
            }`}
          >
            {field.label}
          </p>
          <PanelImageField pageSlug={field.pageSlug} field={field} highlighted={highlighted} />
        </>
      )}
    </div>
  )
}

function groupContainsFocusedField(
  group: AdminPanelFieldGroup,
  focused: { pageSlug: PageSlug; blockKey: string } | null,
): boolean {
  if (!focused) return false
  return group.fields.some((field) => {
    const blockKey = fieldBlockKey(field)
    if (focused.pageSlug === field.pageSlug && focused.blockKey === blockKey) return true
    if (field.kind === 'image' && focused.blockKey === field.altBlockKey) return true
    return false
  })
}

function PanelSeoGooglePreview({ pageSlug }: { pageSlug: PageSlug }) {
  const core = useContext(AdminCoreContext)
  const revision = core?.contentRevision ?? 0
  const { language } = useLanguage()
  const locale = language as CmsLocale
  void revision

  const defaults = getPageSeoDefaults(pageSlug, locale)
  const titleDraft = core?.getDraft(pageSlug, 'seo.title', locale) ?? ''
  const descriptionDraft = core?.getDraft(pageSlug, 'seo.description', locale) ?? ''

  const displayTitle = titleDraft.trim() || defaults.title
  const displayDescription = descriptionDraft.trim() || defaults.description
  const titleOver = titleDraft.length > 60
  const descriptionOver = descriptionDraft.length > 160

  return (
    <div className="mt-2 rounded border border-white/10 bg-white p-3">
      <p className="mb-2 font-sans text-[10px] uppercase tracking-wider text-pearl/55">
        Google preview
      </p>
      <div className="font-sans text-left">
        <p className="text-sm leading-snug text-[#681da8]">sunshootvillasseminyak.com</p>
        <p
          className={`mt-0.5 text-lg leading-snug ${
            titleOver ? 'text-red-600' : 'text-[#1a0dab]'
          }`}
        >
          {displayTitle}
        </p>
        <p
          className={`mt-1 text-sm leading-relaxed ${
            descriptionOver ? 'text-red-600' : 'text-[#545454]'
          }`}
        >
          {displayDescription}
        </p>
      </div>
    </div>
  )
}

function PanelFieldGroupAccordion({
  group,
  defaultOpen,
  focused,
}: {
  group: AdminPanelFieldGroup
  defaultOpen: boolean
  focused: { pageSlug: PageSlug; blockKey: string } | null
}) {
  const hasFocusedField = groupContainsFocusedField(group, focused)
  const [open, setOpen] = useState(defaultOpen || hasFocusedField)

  useEffect(() => {
    if (hasFocusedField) setOpen(true)
  }, [hasFocusedField, focused])

  return (
    <div className="overflow-hidden rounded border border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 bg-white/5 px-3 py-2.5 font-sans text-[11px] uppercase tracking-wider text-pearl transition-colors hover:bg-white/10"
        aria-expanded={open}
      >
        <span>{group.label}</span>
        <span className="text-pearl/50" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="space-y-4 border-t border-white/10 px-3 py-3">
          {group.fields.map((field) => {
            const blockKey = fieldBlockKey(field)
            const highlighted =
              focused?.pageSlug === field.pageSlug && focused?.blockKey === blockKey
            return (
              <PanelFieldEditor
                key={`${field.pageSlug}-${blockKey}`}
                field={field}
                highlighted={highlighted}
              />
            )
          })}
          {group.id === 'footer' && <PanelFooterSocialAccounts />}
          {group.id === 'seo' && group.fields.length > 0 && (
            <PanelSeoGooglePreview pageSlug={group.fields[0].pageSlug} />
          )}
        </div>
      )}
    </div>
  )
}

type HistoryChange = {
  id: number
  pageSlug: string
  blockKey: string
  value: string
  previousValue: string
  savedAt: string
}

function PanelHistoryView({
  pageSlug,
  onBack,
}: {
  pageSlug: PageSlug
  onBack: () => void
}) {
  const core = useContext(AdminCoreContext)
  const router = useRouter()
  const [changes, setChanges] = useState<HistoryChange[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [restoringId, setRestoringId] = useState<number | null>(null)

  const loadHistory = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/history?pageSlug=${encodeURIComponent(pageSlug)}`, {
        credentials: 'include',
        cache: 'no-store',
      })
      const data = (await res.json().catch(() => ({}))) as {
        changes?: HistoryChange[]
        error?: string
      }
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Could not load history')
        setChanges([])
        return
      }
      setChanges(Array.isArray(data.changes) ? data.changes : [])
    } catch {
      setError('Could not load history')
      setChanges([])
    } finally {
      setLoading(false)
    }
  }, [pageSlug])

  useEffect(() => {
    void loadHistory()
  }, [loadHistory])

  const [confirmMessage, setConfirmMessage] = useState<string | null>(null)

  const handleRestore = async (item: HistoryChange) => {
    const restoredValue = item.previousValue
    const restorePageSlug = item.pageSlug as PageSlug
    setRestoringId(item.id)
    setError(null)
    setConfirmMessage(null)
    try {
      const res = await fetch('/api/admin/history/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: item.id }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Could not restore')
        return
      }
      core?.updateText(restorePageSlug, item.blockKey, restoredValue)
      router.refresh()
      setConfirmMessage('Restored!')
      window.setTimeout(() => setConfirmMessage(null), 2500)
      await loadHistory()
    } catch {
      setError('Could not restore')
    } finally {
      setRestoringId(null)
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={onBack}
        className="w-full rounded border border-white/20 py-2 font-sans text-[10px] uppercase tracking-widest text-pearl transition-colors hover:border-gold hover:text-gold"
      >
        Back to editing
      </button>

      {confirmMessage && (
        <p className="font-sans text-xs font-medium text-emerald-300" role="status">
          {confirmMessage}
        </p>
      )}
      {loading && <p className="font-sans text-xs text-pearl/50">Loading history...</p>}
      {error && (
        <p className="font-sans text-xs text-red-300" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && changes.length === 0 && (
        <p className="font-sans text-xs text-pearl/50">No saved history for this page yet.</p>
      )}
      <ul className="space-y-2">
        {changes.map((item) => (
          <li
            key={item.id}
            className="rounded border border-white/10 bg-white/5 px-3 py-2.5"
          >
            <p className="font-sans text-[11px] font-medium text-gold">
              {adminBlockLabel(item.blockKey)}
            </p>
            <p className="mt-1 font-sans text-xs leading-relaxed text-pearl/80">
              {truncatePreview(item.previousValue)}
            </p>
            <p className="mt-1 font-sans text-[10px] text-pearl/45">{formatTimeAgoSv(item.savedAt)}</p>
            <button
              type="button"
              disabled={restoringId !== null}
              onClick={() => void handleRestore(item)}
              className="mt-2 rounded border border-pearl/25 px-2 py-1 font-sans text-[10px] uppercase tracking-wider text-pearl transition-colors hover:border-gold hover:text-gold disabled:opacity-45"
            >
              {restoringId === item.id ? 'Restoring...' : 'Restore'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function AdminSidePanel() {
  const core = useContext(AdminCoreContext)
  const { language } = useLanguage()
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [panelView, setPanelView] = useState<'edit' | 'history'>('edit')

  const routePageSlug = core?.routePageSlug ?? pathnameToPageSlug(pathname)
  const section = getAdminPanelSectionForRoute(routePageSlug)

  const focused = core?.focusedField ?? null

  useEffect(() => {
    if (!focused || !section || !core?.panelOpen) return
    const t = window.setTimeout(() => {
      scrollPanelToField(focused.pageSlug, focused.blockKey)
    }, 100)
    return () => window.clearTimeout(t)
  }, [focused, section, core?.panelOpen])

  useEffect(() => {
    setPanelView('edit')
  }, [routePageSlug])

  useEffect(() => {
    core?.setAdminLocale(language)
  }, [language, core])

  if (!core?.adminMode || !core.authenticated) return null

  const { panelOpen, setPanelOpen, isSaving, loaded, loadError } = core
  const saving = isSaving

  return (
    <>
      <button
        type="button"
        onClick={() => setPanelOpen(!panelOpen)}
        className="fixed left-0 z-[10000] flex h-12 w-8 items-center justify-center rounded-r-md bg-[#c9a84c] font-sans text-lg text-[#1a2e1a] shadow-lg transition-[transform] duration-300 ease-out"
        style={{
          top: '50%',
          transform: `translateY(-50%) translateX(${panelOpen ? `${ADMIN_PANEL_WIDTH_PX}px` : '0'})`,
        }}
        aria-label={panelOpen ? 'Close edit panel' : 'Open edit panel'}
        aria-expanded={panelOpen}
      >
        ✎
      </button>

      <aside
        className="fixed left-0 z-[9999] flex flex-col bg-[#1a2e1a] shadow-2xl transition-transform duration-300 ease-out"
        style={{
          top: ADMIN_TOOLBAR_HEIGHT_PX,
          width: ADMIN_PANEL_WIDTH_PX,
          height: `calc(100% - ${ADMIN_TOOLBAR_HEIGHT_PX}px)`,
          transform: panelOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
        aria-label="Content editing"
      >
        <div className="shrink-0 border-b border-white/20 px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-serif text-lg font-light text-pearl">
              {section?.title ?? 'Edit content'}
            </h2>
          </div>
          <div className="mt-3">
            <PanelLanguageToggle />
          </div>
          {!loaded && !loadError && (
            <p className="mt-1 font-sans text-xs text-pearl/50">Loading...</p>
          )}
          {loadError && (
            <p className="mt-1 font-sans text-xs text-red-300" role="alert">
              {loadError}
            </p>
          )}
        </div>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          {section ? (
            <div key={section.id} className="space-y-3">
              {panelView === 'history' && routePageSlug ? (
                <PanelHistoryView pageSlug={routePageSlug} onBack={() => setPanelView('edit')} />
              ) : panelView === 'history' ? null : (
                <>
                  {section.fieldGroups.map((group, index) => (
                    <PanelFieldGroupAccordion
                      key={`${section.id}-${group.id}`}
                      group={group}
                      defaultOpen={index === 0}
                      focused={focused}
                    />
                  ))}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPanelView('history')}
                      className="flex-1 rounded border border-white/20 py-2.5 font-sans text-[10px] uppercase tracking-widest text-pearl transition-colors hover:border-gold hover:text-gold"
                    >
                      History
                    </button>
                    <button
                      type="button"
                      disabled={saving || !loaded}
                      onClick={() => void core.saveSection(sectionPageSlugs(section))}
                      className="flex-1 rounded border border-gold bg-gold py-2.5 font-sans text-[10px] uppercase tracking-widest text-white transition-colors hover:bg-gold-light disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <p className="font-sans text-sm text-pearl/60">
              {routePageSlug === 'villas'
                ? 'Open an individual villa page (e.g. /villas/mawar) to edit content.'
                : 'This page has no editable fields in the panel.'}
            </p>
          )}
        </div>
      </aside>
    </>
  )
}
