'use client'

import type { MouseEvent, PointerEvent, SyntheticEvent } from 'react'

type AdminEditPencilButtonProps = {
  onClick: () => void
  ariaLabel: string
}

function stopLinkNavigation(e: SyntheticEvent) {
  e.preventDefault()
  e.stopPropagation()
}

export function AdminEditPencilButton({ onClick, ariaLabel }: AdminEditPencilButtonProps) {
  return (
    <button
      type="button"
      data-admin-edit-pencil
      className="absolute right-1 top-1 z-[5] flex min-h-12 min-w-12 items-center justify-center rounded-md border border-gold/50 bg-gold/90 p-2 font-sans text-lg leading-none text-navy opacity-0 shadow-md transition-opacity group-hover:opacity-100 hover:bg-gold focus:opacity-100 md:min-h-11 md:min-w-11"
      aria-label={ariaLabel}
      onClick={(e) => {
        stopLinkNavigation(e)
        onClick()
      }}
      onMouseDown={stopLinkNavigation}
      onPointerDown={stopLinkNavigation}
      onTouchStart={stopLinkNavigation}
    >
      ✎
    </button>
  )
}
