'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminSession } from '@/components/admin/AdminProvider'

const panelClass =
  'rounded-lg border border-[#c9a84c]/35 bg-[#1a2e1a] px-6 py-10 shadow-lg sm:px-8 sm:py-12'

const logoutClass =
  'min-h-[44px] flex w-full items-center justify-center border border-[#c9a84c] bg-[#c9a84c] px-4 py-2.5 font-sans text-[10px] tracking-[0.2em] uppercase text-white transition-colors hover:bg-[#d4b87f]'

export default function AdminCmsDashboard() {
  const session = useAdminSession()
  const router = useRouter()

  useEffect(() => {
    router.replace('/')
  }, [router])

  return (
    <div className={panelClass}>
      <h1 className="mb-2 font-sans text-xl font-light tracking-wide text-pearl sm:text-2xl">CMS panel</h1>
      <p className="mb-8 font-sans text-sm text-pearl/60">
        You are logged in. Redirecting to edit mode...
      </p>
      <button type="button" className={logoutClass} onClick={session.logoutCms}>
        Log out
      </button>
    </div>
  )
}
