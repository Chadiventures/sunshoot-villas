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

import { ADMIN_TOOLBAR_HEIGHT_PX, ADMIN_TOOLBAR_Z_CLASS } from '@/lib/adminToolbar'

import { writePersistedAdminSession } from '@/lib/adminSessionPersist'

import { adminPathSegment, adminPublicPath } from '@/lib/adminPath'



const btnCompact =

  'shrink-0 touch-manipulation whitespace-nowrap px-3 py-1 font-sans text-[10px] uppercase tracking-[0.12em] transition-colors disabled:opacity-50'



const navBtnClass =

  'flex h-8 w-8 shrink-0 items-center justify-center border border-white/20 text-pearl transition-colors hover:border-[#c9a84c] hover:text-[#c9a84c] disabled:opacity-45'



export default function AdminToolbar() {

  const core = useContext(AdminCoreContext)

  const session = useAdminSession()

  const pathname = usePathname()

  const router = useRouter()

  const adminSeg = `/${adminPathSegment()}`

  const onAdminMenuPage = pathname === adminSeg || pathname.startsWith(`${adminSeg}/`)

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

        setLoginErr('Invalid credentials')

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

    autoSavePending,

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

    if (autoSavePending) return 'Auto-saving...'

    if (saveStatus === 'saving') return 'Saving...'

    if (saveStatus === 'saved') return 'Saved'

    if (saveStatus === 'error') return saveError ?? 'Could not save'

    if (!loaded && authenticated) return 'Loading content...'

    return null

  })()



  const statusIsError = Boolean(loadError || saveStatus === 'error')

  const statusIsSuccess = !autoSavePending && saveStatus === 'saved'



  return (

    <>

    <div

      className={`pointer-events-none fixed inset-x-0 top-0 ${ADMIN_TOOLBAR_Z_CLASS} border-b border-[#c9a84c]/40 bg-[#1a2e1a]/90 shadow-md backdrop-blur-md`}

      style={{ height: ADMIN_TOOLBAR_HEIGHT_PX }}

      role="region"

      aria-label="Admin tools"

    >

      <div className="pointer-events-auto mx-auto flex h-full max-w-6xl items-center gap-2 px-3 sm:gap-3 sm:px-4">

        {authenticated && (

          <div className="flex shrink-0 items-center gap-1">

            <button

              type="button"

              onClick={() => router.back()}

              disabled={isSaving}

              className={navBtnClass}

              aria-label="Back"

            >

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">

                <path d="M15 18l-6-6 6-6" />

              </svg>

            </button>

            <button

              type="button"

              onClick={() => router.forward()}

              disabled={isSaving}

              className={navBtnClass}

              aria-label="Forward"

            >

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">

                <path d="M9 18l6-6-6-6" />

              </svg>

            </button>

          </div>

        )}



        <span className="shrink-0 font-sans text-xs font-medium uppercase tracking-[0.2em] text-pearl/90">

          Admin

        </span>



        <div className="min-h-0 min-w-0 flex-1">

          {!authenticated ? (

            <form onSubmit={handleLogin} className="flex h-8 items-center gap-2">

              <label htmlFor="cms-toolbar-password" className="sr-only">

                Password

              </label>

              <input

                id="cms-toolbar-password"

                type="password"

                autoComplete="current-password"

                placeholder="Password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

                className="min-w-0 flex-1 border border-white/20 bg-white/10 px-2 py-1 font-sans text-xs text-pearl placeholder:text-pearl/40 focus:border-[#c9a84c] focus:outline-none"

              />

              {loginErr && (

                <p className="hidden shrink-0 font-sans text-[10px] text-red-300/95 sm:block" role="alert">

                  {loginErr}

                </p>

              )}

              <button

                type="submit"

                disabled={loggingIn || !password.trim()}

                className={`${btnCompact} border border-[#c9a84c] bg-[#c9a84c] text-white hover:bg-[#d4b87f]`}

              >

                {loggingIn ? '...' : 'Log in'}

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

                className={`${btnCompact} border border-white/20 text-pearl hover:border-[#c9a84c] hover:text-[#c9a84c] disabled:opacity-45`}

              >

                Edit site

              </button>

            ) : (

              <button

                type="button"

                onClick={() => router.push(adminPublicPath())}

                disabled={isSaving}

                className={`${btnCompact} border border-white/20 text-pearl hover:border-[#c9a84c] hover:text-[#c9a84c] disabled:opacity-45`}

              >

                CMS panel

              </button>

            )}

            <button

              type="button"

              onClick={() => setHistoryOpen((open) => !open)}

              disabled={isSaving}

              className={`${btnCompact} border border-white/20 text-pearl hover:border-[#c9a84c] hover:text-[#c9a84c] disabled:opacity-45`}

              aria-expanded={historyOpen}

            >

              History

            </button>

            <button

              type="button"

              onClick={() => void save()}

              disabled={isSaving || !loaded || !isDirty}

              className={`${btnCompact} border border-[#c9a84c] bg-[#c9a84c] text-white hover:bg-[#d4b87f] disabled:opacity-50`}

            >

              {isSaving ? 'Saving...' : 'Save'}

            </button>

            <button

              type="button"

              onClick={session.logoutCms}

              disabled={isSaving}

              className={`${btnCompact} border border-white/20 text-pearl hover:border-[#c9a84c] hover:text-[#c9a84c] disabled:opacity-45`}

            >

              Log out

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


