'use client'

import {
  useCallback,
  useContext,
  useMemo,
  type CSSProperties,
  type ElementType,
  type MouseEvent,
} from 'react'
import { AdminCoreContext, useAdminContent } from '@/hooks/useAdminContent'
import { getPageContentDefaults } from '@/lib/contentDefaults'
import { useLanguage } from '@/context/LanguageContext'
import { isSharedCmsBlockKey } from '@/lib/cmsKeys'

function mergeDisplayClass(className: string, allowLineBreaks: boolean): string | undefined {
  if (!allowLineBreaks) return className || undefined
  return [className.trim(), 'whitespace-pre-line'].filter(Boolean).join(' ') || 'whitespace-pre-line'
}

function isBlockElement(Comp: ElementType): boolean {
  return Comp !== 'span'
}

export type AdminEditableTextProps = {
  blockKey: string
  className?: string
  as?: ElementType
  isolateLink?: boolean
  /** Shown when CMS value is missing or empty. */
  fallback?: string
  /** When true, line breaks in the text are preserved. */
  allowLineBreaks?: boolean
}

export function AdminEditableText({
  blockKey,
  className = '',
  as: Comp = 'span',
  isolateLink = false,
  fallback = '',
  allowLineBreaks = false,
}: AdminEditableTextProps) {
  const core = useContext(AdminCoreContext)
  const { pageSlug, getText } = useAdminContent()
  const { language } = useLanguage()
  void core?.contentRevision
  const pageDefaults = useMemo(() => getPageContentDefaults(pageSlug, language), [pageSlug, language])
  const resolvedFallback = fallback || pageDefaults[blockKey] || ''
  const cmsValue = getText(blockKey)
  const hasStoredValue =
    core?.hasDraftKey(
      pageSlug,
      blockKey,
      isSharedCmsBlockKey(blockKey) ? 'en' : language,
    ) ?? false
  const text = hasStoredValue ? cmsValue : cmsValue || resolvedFallback
  const blockLayout = isBlockElement(Comp)
  const isFocused =
    Boolean(core?.adminMode) &&
    core?.focusedField?.pageSlug === pageSlug &&
    core?.focusedField?.blockKey === blockKey
  const focusOutline: CSSProperties | undefined = isFocused
    ? { outline: '2px solid #c9a84c', outlineOffset: '2px' }
    : undefined

  const adminEditing = Boolean(core?.adminMode && core?.authenticated)

  const blockDataAttrs = {
    'data-page-slug': pageSlug,
    'data-block-key': blockKey,
  }

  const stopLinkNavigation = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!adminEditing) return
      e.preventDefault()
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
    },
    [adminEditing],
  )

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!adminEditing || !isolateLink) return
      if (e.detail > 1) {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
      }
    },
    [adminEditing, isolateLink],
  )

  const handleDoubleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!adminEditing) return
      stopLinkNavigation(e)
      core?.focusPanelField(pageSlug, blockKey)
    },
    [adminEditing, blockKey, core, pageSlug, stopLinkNavigation],
  )

  const interactionProps = {
    ...blockDataAttrs,
    onMouseDown: handleMouseDown,
    onDoubleClick: handleDoubleClick,
  }

  const displayClass = [
    mergeDisplayClass(className, allowLineBreaks),
    blockLayout ? 'block' : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  if (Comp === 'span' && className === '') {
    if (!allowLineBreaks) {
      return (
        <span
          {...interactionProps}
          className={displayClass || undefined}
          style={focusOutline}
        >
          {text}
        </span>
      )
    }
    return (
      <span
        {...interactionProps}
        className={displayClass || 'whitespace-pre-line'}
        style={focusOutline}
      >
        {text}
      </span>
    )
  }

  return (
    <Comp
      className={displayClass || undefined}
      {...interactionProps}
      style={focusOutline}
    >
      {text}
    </Comp>
  )
}
