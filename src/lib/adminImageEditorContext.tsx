'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { PageSlug } from '@/lib/contentBlockTypes'

type EditorState = {
  open: boolean
  pageSlug: PageSlug | null
  imageBlockKey: string | null
  altBlockKey: string | null
  cropAspectRatio: number
}

type AdminImageEditorContextValue = {
  state: EditorState
  openImageEditor: (
    imageBlockKey: string,
    altBlockKey: string,
    opts: { pageSlug: PageSlug; cropAspectRatio?: number },
  ) => void
  closeImageEditor: () => void
}

const closedState: EditorState = {
  open: false,
  pageSlug: null,
  imageBlockKey: null,
  altBlockKey: null,
  cropAspectRatio: 16 / 9,
}

const AdminImageEditorContext = createContext<AdminImageEditorContextValue | null>(null)

export function AdminImageEditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorState>(closedState)

  const openImageEditor = useCallback(
    (
      imageBlockKey: string,
      altBlockKey: string,
      opts: { pageSlug: PageSlug; cropAspectRatio?: number },
    ) => {
      setState({
        open: true,
        pageSlug: opts.pageSlug,
        imageBlockKey,
        altBlockKey,
        cropAspectRatio: opts.cropAspectRatio ?? 16 / 9,
      })
    },
    [],
  )

  const closeImageEditor = useCallback(() => {
    setState(closedState)
  }, [])

  const value = useMemo(
    () => ({ state, openImageEditor, closeImageEditor }),
    [state, openImageEditor, closeImageEditor],
  )

  return (
    <AdminImageEditorContext.Provider value={value}>{children}</AdminImageEditorContext.Provider>
  )
}

export function useAdminImageEditor() {
  const ctx = useContext(AdminImageEditorContext)
  if (!ctx) {
    return {
      state: closedState,
      openImageEditor: () => {},
      closeImageEditor: () => {},
    }
  }
  return ctx
}
