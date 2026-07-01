'use client'

import { useContext, useLayoutEffect, type ReactNode } from 'react'
import { PageServerContentContext } from '@/components/admin/AdminProvider'

type Props = {
  content: Record<string, string>
  children: ReactNode
}

/** Registers server-fetched CMS content for the current page (merged in AdminProvider). */
export default function ServerPageContent({ content, children }: Props) {
  const setPageServerContent = useContext(PageServerContentContext)

  useLayoutEffect(() => {
    if (!setPageServerContent) return
    setPageServerContent(content)
    return () => {
      setPageServerContent({})
    }
  }, [content, setPageServerContent])

  return children
}
