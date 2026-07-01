'use client'

import Link from 'next/link'
import { useAdminSession } from '@/components/admin/AdminProvider'

export default function AdminCmsDashboard() {
  const session = useAdminSession()

  const linkClass =
    'min-h-[44px] flex items-center justify-center border border-gold bg-gold px-4 py-2.5 font-sans text-[10px] tracking-[0.2em] uppercase text-white transition-colors hover:bg-gold-light'

  const secondaryClass =
    'min-h-[44px] flex items-center justify-center border border-pearl/25 px-4 py-2.5 font-sans text-[10px] tracking-[0.2em] uppercase text-pearl transition-colors hover:border-gold hover:text-gold'

  return (
    <div className="rounded-lg border border-gold/35 bg-navy px-6 py-10 shadow-lg sm:px-8 sm:py-12">
      <h1 className="mb-2 font-sans text-xl font-light tracking-wide text-pearl sm:text-2xl">CMS-panel</h1>
      <p className="mb-8 font-sans text-sm text-pearl/60">
        Du är inloggad. Öppna en sida på webbplatsen för att redigera text och bilder.
      </p>
      <div className="flex flex-col gap-3">
        <Link href="/" className={linkClass}>
          Redigera webbplatsen
        </Link>
        <Link href="/admin" className={secondaryClass}>
          Redigera veckomeny
        </Link>
        <button type="button" className={secondaryClass} onClick={session.logoutCms}>
          Logga ut
        </button>
      </div>
    </div>
  )
}
