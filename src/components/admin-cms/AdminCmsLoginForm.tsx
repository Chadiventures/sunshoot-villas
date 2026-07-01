'use client'

import Link from 'next/link'
import { useCallback, useContext, useEffect, useRef, useState, type FormEvent } from 'react'
import AdminCmsDashboard from '@/components/admin-cms/AdminCmsDashboard'
import { useAdminSession } from '@/components/admin/AdminProvider'
import { AdminCoreContext } from '@/hooks/useAdminContent'
import { adminPublicPath } from '@/lib/adminPath'

const sessionLoadingUi = (
  <div className="rounded-lg border border-gold/35 bg-navy px-6 py-10 shadow-lg sm:px-8 sm:py-12">
    <p className="text-center font-sans text-sm text-pearl/70">Kontrollerar session...</p>
  </div>
)

export default function AdminCmsLoginForm() {
  const session = useAdminSession()
  const core = useContext(AdminCoreContext)
  const [mounted, setMounted] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    let cancelled = false
    async function check() {
      try {
        await fetch('/api/admin/auth/session', {
          credentials: 'include',
          cache: 'no-store',
        })
      } catch {
        /* ignore */
      }
      if (!cancelled) setCheckingSession(false)
    }
    void check()
    return () => {
      cancelled = true
    }
  }, [mounted])

  const loginRef = useRef(session.login)
  loginRef.current = session.login

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setError(null)
      setLoading(true)
      try {
        const result = await loginRef.current(password)
        if (!result.ok) {
          if (result.status === 401) {
            setFailedAttempts((prev) => {
              const next = prev + 1
              setError(`Ogiltiga inloggningsuppgifter (försök ${next}/3)`)
              return next
            })
          } else if (result.status === 429) {
            setError(result.error ?? 'För många inloggningsförsök. Kolla din mejl.')
          } else {
            setError(result.error ?? 'Ogiltiga inloggningsuppgifter')
          }
          return
        }
        setFailedAttempts(0)
        setPassword('')
      } catch {
        setError('Något gick fel. Försök igen.')
      } finally {
        setLoading(false)
      }
    },
    [password],
  )

  const btnBase =
    'min-h-[44px] w-full touch-manipulation px-4 py-2.5 font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 sm:px-5'

  if (!mounted) {
    return sessionLoadingUi
  }

  if (checkingSession && !core?.authenticated) {
    return sessionLoadingUi
  }

  if (core?.authenticated) {
    return <AdminCmsDashboard />
  }

  return (
    <div className="rounded-lg border border-gold/35 bg-navy px-6 py-10 shadow-lg sm:px-8 sm:py-12">
      <h1 className="mb-2 font-sans text-xl font-light tracking-wide text-pearl sm:text-2xl">CMS-inloggning</h1>
      <p className="mb-8 font-sans text-sm text-pearl/60">Logga in för att redigera innehåll på sajten.</p>

      <form
        onSubmit={(e) => void onSubmit(e)}
        autoComplete="off"
        className="relative flex flex-col gap-5"
      >
        <input
          type="password"
          name="fake-password"
          autoComplete="new-password"
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />
        <div>
          <label
            htmlFor="admin-cms-password"
            className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.25em] text-pearl/55"
          >
            Lösenord
          </label>
          <div className="relative">
            <input
              id="admin-cms-password"
              type={showPassword ? 'text' : 'password'}
              name="admin-cms-password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-white/15 bg-pearl/10 py-2.5 pl-3 pr-11 font-sans text-sm text-pearl placeholder:text-pearl/35 focus:border-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label="Visa/dölj lösenord"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pearl/55 transition-colors hover:text-pearl"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path d="M3 3l18 18" />
                  <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                  <path d="M9.88 9.88A3 3 0 0 1 12 5c4.48 0 8.24 3.66 10 7-1.09 2.12-2.72 3.85-4.65 5.02" />
                  <path d="M6.06 6.06C3.72 7.4 1.89 9.54 1 12c1.76 3.34 5.52 7 10 7 1.09 0 2.14-.18 3.12-.52" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="font-sans text-sm text-red-300/95" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className={`${btnBase} border border-gold bg-gold text-white hover:bg-gold-light disabled:opacity-50`}
        >
          {loading ? 'Loggar in...' : 'Logga in'}
        </button>
      </form>

      <p className="mt-6 text-center font-sans text-sm">
        <Link
          href={adminPublicPath('/aterstall')}
          className="text-gold underline decoration-gold/40 underline-offset-4 hover:text-gold-light"
        >
          Glömt lösenord
        </Link>
      </p>
    </div>
  )
}
