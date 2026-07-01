'use client'

import { useContext, useEffect, useState, type ReactNode } from 'react'
import AdminProvider from '@/components/admin/AdminProvider'
import AdminSidePanel from '@/components/admin/AdminSidePanel'
import AdminToolbar from '@/components/admin/AdminToolbar'
import { AdminCoreContext } from '@/hooks/useAdminContent'
import { adminToolbarPaddingClass } from '@/lib/adminToolbar'

function AdminChrome({ children }: { children: ReactNode }) {
  const core = useContext(AdminCoreContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const adminMode = Boolean(core?.adminMode)
  const padClass = mounted && adminMode ? adminToolbarPaddingClass : ''

  return (
    <>
      <div className={padClass}>{children}</div>
      {mounted && (
        <>
          <AdminToolbar />
          <AdminSidePanel />
        </>
      )}
    </>
  )
}

type Props = {
  children: ReactNode
  layoutServerContent?: Record<string, string>
}

export default function AdminWrapper({ children, layoutServerContent = {} }: Props) {
  return (
    <AdminProvider layoutServerContent={layoutServerContent}>
      <AdminChrome>{children}</AdminChrome>
    </AdminProvider>
  )
}
