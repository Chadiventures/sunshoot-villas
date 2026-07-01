'use client'

import {
  useCallback,
  useContext,
  type CSSProperties,
  type ElementType,
  type MouseEvent,
} from 'react'
import { AdminCoreContext, useAdminContent } from '@/hooks/useAdminContent'

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
  /** Om sant: radbrytningar i texten visas. */
  allowLineBreaks?: boolean
}

export function AdminEditableText({
  blockKey,
  className = '',
  as: Comp = 'span',
  allowLineBreaks = false,
}: AdminEditableTextProps) {
  const core = useContext(AdminCoreContext)
  const { pageSlug, getText } = useAdminContent()
  void core?.contentRevision
  const text = getText(blockKey)
  const blockLayout = isBlockElement(Comp)
  const isFocused =
    Boolean(core?.adminMode) &&
    core?.focusedField?.pageSlug === pageSlug &&
    core?.focusedField?.blockKey === blockKey
  const focusOutline: CSSProperties | undefined = isFocused
    ? { outline: '2px solid #c9a84c', outlineOffset: '2px' }
    : undefined

  const handleDoubleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!core?.adminMode || !core.authenticated) return
      e.preventDefault()
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
      core.focusPanelField(pageSlug, blockKey)
    },
    [blockKey, core, pageSlug],
  )

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
          onDoubleClick={handleDoubleClick}
          className={displayClass || undefined}
          style={focusOutline}
        >
          {text}
        </span>
      )
    }
    return (
      <span
        onDoubleClick={handleDoubleClick}
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
      onDoubleClick={handleDoubleClick}
      style={focusOutline}
    >
      {text}
    </Comp>
  )
}
