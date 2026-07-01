'use client'

import type { ReactNode } from 'react'
import AdminWrapper from '@/components/admin/AdminWrapper'

type Props = {
  children: ReactNode
  layoutServerContent?: Record<string, string>
}

/** Static import - avoids remounting admin state on client navigations. */
export default function AdminWrapperRoot({ children, layoutServerContent = {} }: Props) {
  return <AdminWrapper layoutServerContent={layoutServerContent}>{children}</AdminWrapper>
}
