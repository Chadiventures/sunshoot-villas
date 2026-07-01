'use client'

import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AdminCoreContext } from '@/hooks/useAdminContent'
import { useAdminSession } from '@/components/admin/AdminProvider'
import AdminHistoryPanel from '@/components/admin/AdminHistoryPanel'
import { ADMIN_TOOLBAR_HEIGHT_PX } from '@/lib/adminToolbar'
import { writePersistedAdminSession } from '@/lib/adminSessionPersist'

const btnCompact =
  'shrink-0 touch-manipulation whitespace-nowrap px-3 py-1 font-sans text-[10px] uppercase tracking-[0.12em] transition-colors disabled:opacity-50'

export default function AdminToolbar() {
  const core = useContext(AdminCoreContext)
  const session = useAdminSession()
  const pathname = usePathname()
  const router = useRouter()
  const onAdminMenuPage = pathname === '/admin' || pathname.startsWith('/admin/')
  const [mounted, setMounted] = useState(false)
  const [password, setPassword] = useState('')
  const [loginErr, setLoginErr] = useState<string | null>(null)
  const [loggingIn, setLoggingIn] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  const loginRef = useRef(session.login)
  loginRef.current = session.login

  const handleLogin = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setLoginErr(null)
      setLoggingIn(true)
      const result = await loginRef.current(password)
      setLoggingIn(false)
      if (!result.ok) {
        setLoginErr('Ogiltiga inloggningsuppgifter')
        return
      }
      setPassword('')
    },
    [password],
  )

  if (!mounted || !core || !core.adminMode) {
    return null
  }

  const {
    authenticated,
    save,
    saveStatus,
    saveError,
    loaded,
    loadError,
    isDirty,
    isSaving,
    setAdminMode,
  } = core

  const goHomeInAdmin = () => {
    if (authenticated) {
      writePersistedAdminSession(true)
      setAdminMode(true)
    }
    router.push('/')
  }

  const statusMessage = (() => {
    if (loadError) return loadError
    if (saveStatus === 'saving') return 'Sparar...'
    if (saveStatus === 'saved') return 'Sparat'
    if (saveStatus === 'error') return saveError ?? 'Kunde inte spara'
    if (!loaded && authenticated) return 'Laddar innehåll...'
    return null
  })()

  const statusIsError = Boolean(loadError || saveStatus === 'error')
  const statusIsSuccess = saveStatus === 'saved'

  return (
    <>
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] border-b border-gold/40 bg-navy/90 shadow-md backdrop-blur-md"
      style={{ height: ADMIN_TOOLBAR_HEIGHT_PX }}
      role="region"
      aria-label="Adminverktyg"
    >
      <div className="pointer-events-auto mx-auto flex h-full max-w-6xl items-center gap-2 px-3 sm:gap-3 sm:px-4">
        <span className="shrink-0 font-sans text-xs font-medium uppercase tracking-[0.2em] text-pearl/90">
          Admin
        </span>

        <div className="min-h-0 min-w-0 flex-1">
          {!authenticated ? (
            <form onSubmit={handleLogin} className="flex h-8 items-center gap-2">
              <label htmlFor="cms-toolbar-password" className="sr-only">
                Lösenord
              </label>
              <input
                id="cms-toolbar-password"
                type="password"
                autoComplete="current-password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="min-w-0 flex-1 border border-white/15 bg-white/10 px-2 py-1 font-sans text-xs text-pearl placeholder:text-pearl/40 focus:border-gold focus:outline-none"
              />
              {loginErr && (
                <p className="hidden shrink-0 font-sans text-[10px] text-red-300/95 sm:block" role="alert">
                  {loginErr}
                </p>
              )}
              <button
                type="submit"
                disabled={loggingIn || !password.trim()}
                className={`${btnCompact} border border-gold bg-gold text-white hover:bg-gold-light`}
              >
                {loggingIn ? '...' : 'Logga in'}
              </button>
            </form>
          ) : (
            statusMessage && (
              <p
                className={`truncate font-sans text-[11px] font-medium leading-none ${
                  statusIsError
                    ? 'text-red-300'
                    : statusIsSuccess
                      ? 'text-emerald-300'
                      : 'text-pearl/75'
                }`}
                role={statusIsError ? 'alert' : 'status'}
                title={statusMessage}
              >
                {statusMessage}
              </p>
            )
          )}
        </div>

        {authenticated && (
          <>
            {onAdminMenuPage ? (
              <button
                type="button"
                onClick={goHomeInAdmin}
                disabled={isSaving}
                className={`${btnCompact} border border-pearl/30 text-pearl hover:border-gold hover:text-gold disabled:opacity-45`}
              >
                Redigera hemsidan
              </button>
            ) : (
              <button
                type="button"
                onClick={() => router.push('/admin')}
                disabled={isSaving}
                className={`${btnCompact} border border-pearl/30 text-pearl hover:border-gold hover:text-gold disabled:opacity-45`}
              >
                Veckans meny
              </button>
            )}
            <button
              type="button"
              onClick={() => setHistoryOpen((open) => !open)}
              disabled={isSaving}
              className={`${btnCompact} border border-pearl/30 text-pearl hover:border-gold hover:text-gold disabled:opacity-45`}
              aria-expanded={historyOpen}
            >
              Historik
            </button>
            <button
              type="button"
              onClick={() => void save()}
              disabled={isSaving || !loaded || !isDirty}
              className={`${btnCompact} border border-gold bg-gold text-white hover:bg-gold-light disabled:opacity-50`}
            >
              {isSaving ? 'Sparar...' : 'Spara'}
            </button>
            <button
              type="button"
              onClick={session.logoutCms}
              disabled={isSaving}
              className={`${btnCompact} border border-pearl/30 text-pearl hover:border-gold hover:text-gold disabled:opacity-45`}
            >
              Logga ut
            </button>
          </>
        )}
      </div>
    </div>
    {authenticated && (
      <AdminHistoryPanel open={historyOpen} onClose={() => setHistoryOpen(false)} />
    )}
    </>
  )
}
