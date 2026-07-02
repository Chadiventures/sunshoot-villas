'use client'

import { useContext, useEffect, useState, type ReactNode } from 'react'
import AdminProvider from '@/components/admin/AdminProvider'
import AdminSidePanel, { ADMIN_PANEL_WIDTH_PX } from '@/components/admin/AdminSidePanel'
import AdminToolbar from '@/components/admin/AdminToolbar'
import { AdminCoreContext } from '@/hooks/useAdminContent'
import { adminToolbarPaddingClass } from '@/lib/adminToolbar'

function AdminChrome({ children }: { children: ReactNode }) {
  const core = useContext(AdminCoreContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const adminMode = Boolean(core?.adminMode)
  const panelOpen = Boolean(core?.adminMode && core?.authenticated && core?.panelOpen)
  const padClass = mounted && adminMode ? adminToolbarPaddingClass : ''
  const contentShiftStyle =
    mounted && panelOpen ? { marginLeft: ADMIN_PANEL_WIDTH_PX } : undefined

  useEffect(() => {
    if (!mounted) return
    if (adminMode) {
      document.documentElement.setAttribute('data-admin-mode', '')
    } else {
      document.documentElement.removeAttribute('data-admin-mode')
    }
    return () => {
      document.documentElement.removeAttribute('data-admin-mode')
    }
  }, [adminMode, mounted])

  return (
    <>
      <div
        className={`${padClass} transition-[margin-left] duration-300 ease-out`}
        style={contentShiftStyle}
      >
        {children}
      </div>
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
