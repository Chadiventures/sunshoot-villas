'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'
import type { PageSlug } from '@/lib/contentBlockTypes'
import AdminImageEditorModal from '@/components/admin/AdminImageEditorModal'
import {
  readPersistedAdminSession,
  readPersistedPanelOpen,
  subscribePersistedAdminSession,
  writePersistedAdminSession,
  writePersistedPanelOpen,
} from '@/lib/adminSessionPersist'
import {
  AdminBlockPageContext,
  AdminCoreContext,
  pathnameToPageSlug,
  useBuildAdminContentValue,
} from '@/hooks/useAdminContent'
import { AdminImageEditorProvider } from '@/lib/adminImageEditorContext'

export type AdminLoginResult =
  | { ok: true }
  | { ok: false; status: number; error?: string }

export type AdminSessionContextValue = {
  login: (password: string) => Promise<AdminLoginResult>
  /** Pass only from the logout button's onClick (trusted click). */
  logoutCms: (event: MouseEvent<HTMLButtonElement>) => void
}

export const AdminSessionContext = createContext<AdminSessionContextValue | null>(null)

export const PageServerContentContext = createContext<
  ((content: Record<string, string>) => void) | null
>(null)

type AdminProviderProps = {
  children: ReactNode
  /** Global blocks from root layout (header, footer, …). */
  layoutServerContent?: Record<string, string>
}

export function useAdminSession(): AdminSessionContextValue {
  const ctx = useContext(AdminSessionContext)
  if (!ctx) {
    throw new Error('useAdminSession must be used inside AdminProvider')
  }
  return ctx
}

export function AdminBlockPage({ pageSlug, children }: { pageSlug: PageSlug; children: ReactNode }) {
  return <AdminBlockPageContext.Provider value={pageSlug}>{children}</AdminBlockPageContext.Provider>
}

const INACTIVITY_LOGOUT_MS = 600_000

const INACTIVITY_ACTIVITY_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'scroll',
] as const

export default function AdminProvider({
  children,
  layoutServerContent = {},
}: AdminProviderProps) {
  const pathname = usePathname()
  const routePageSlug = useMemo(() => pathnameToPageSlug(pathname), [pathname])
  const [pageServerContent, setPageServerContent] = useState<Record<string, string>>({})

  const mergedServerContent = useMemo(
    () => ({ ...layoutServerContent, ...pageServerContent }),
    [layoutServerContent, pageServerContent],
  )

  /** Instant client snapshot from sessionStorage (false on server). */
  const cachedAuthenticated = useSyncExternalStore(
    subscribePersistedAdminSession,
    readPersistedAdminSession,
    () => false,
  )

  const [authenticated, setAuthenticated] = useState(false)
  const [adminMode, setAdminModeState] = useState(false)
  const [panelOpen, setPanelOpenState] = useState(() => readPersistedPanelOpen())

  useLayoutEffect(() => {
    if (readPersistedAdminSession()) {
      setAuthenticated(true)
      setAdminModeState(true)
    }
  }, [pathname])

  const effectiveAuthenticated = authenticated || cachedAuthenticated
  const effectiveAdminMode = adminMode || cachedAuthenticated

  const setPanelOpen = useCallback((open: boolean) => {
    setPanelOpenState(open)
    writePersistedPanelOpen(open)
  }, [])

  const clearClientSession = useCallback(() => {
    writePersistedAdminSession(false)
    setAuthenticated(false)
    setAdminModeState(false)
  }, [])

  const applySessionOk = useCallback(() => {
    writePersistedAdminSession(true)
    setAuthenticated(true)
    setAdminModeState(true)
  }, [])

  const applySessionOkRef = useRef(applySessionOk)
  const clearClientSessionRef = useRef(clearClientSession)
  applySessionOkRef.current = applySessionOk
  clearClientSessionRef.current = clearClientSession

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const res = await fetch('/api/admin/auth/session', {
          credentials: 'include',
          cache: 'no-store',
        })
        if (cancelled) return
        if (res.ok) {
          applySessionOkRef.current()
          return
        }
        if (res.status === 401) {
          clearClientSessionRef.current()
        }
      } catch (err) {
        console.error('[AdminProvider] session check failed', err)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [pathname])

  const setAdminMode = useCallback((value: boolean) => {
    setAdminModeState(value)
    if (value) {
      writePersistedAdminSession(true)
      setAuthenticated(true)
    } else {
      writePersistedAdminSession(false)
    }
  }, [])

  const login = useCallback(async (password: string): Promise<AdminLoginResult> => {
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        const failure: AdminLoginResult = {
          ok: false,
          status: res.status,
          error: typeof data.error === 'string' ? data.error : undefined,
        }
        return failure
      }
      applySessionOk()
      return { ok: true }
    } catch {
      return { ok: false, status: 0 }
    }
  }, [applySessionOk])

  const performLogoutRef = useRef<() => Promise<void>>(async () => {})

  performLogoutRef.current = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST', credentials: 'include' })
    } catch {
      /* ignore */
    }
    clearClientSession()
  }

  const logoutCms = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    if (event.type !== 'click' || !event.isTrusted) return
    event.preventDefault()
    event.stopPropagation()
    void performLogoutRef.current()
  }, [])

  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current !== null) {
      clearTimeout(inactivityTimerRef.current)
    }
    inactivityTimerRef.current = setTimeout(() => {
      inactivityTimerRef.current = null
      void performLogoutRef.current()
    }, INACTIVITY_LOGOUT_MS)
  }, [])

  useEffect(() => {
    if (!effectiveAuthenticated) {
      if (inactivityTimerRef.current !== null) {
        clearTimeout(inactivityTimerRef.current)
        inactivityTimerRef.current = null
      }
      return
    }

    const onActivity = () => {
      resetInactivityTimer()
    }

    resetInactivityTimer()

    for (const eventName of INACTIVITY_ACTIVITY_EVENTS) {
      window.addEventListener(eventName, onActivity, { passive: true })
    }

    return () => {
      if (inactivityTimerRef.current !== null) {
        clearTimeout(inactivityTimerRef.current)
        inactivityTimerRef.current = null
      }
      for (const eventName of INACTIVITY_ACTIVITY_EVENTS) {
        window.removeEventListener(eventName, onActivity)
      }
    }
  }, [effectiveAuthenticated, resetInactivityTimer])

  const coreValue = useBuildAdminContentValue({
    routePageSlug,
    adminMode: effectiveAdminMode,
    authenticated: effectiveAuthenticated,
    setAuthenticated,
    setAdminMode,
    serverContent: mergedServerContent,
    panelOpen,
    setPanelOpen,
  })

  const sessionValue = useMemo<AdminSessionContextValue>(
    () => ({
      login,
      logoutCms,
    }),
    [login, logoutCms],
  )

  return (
    <AdminCoreContext.Provider value={coreValue}>
      <AdminImageEditorProvider>
        <AdminSessionContext.Provider value={sessionValue}>
          <PageServerContentContext.Provider value={setPageServerContent}>
            <AdminBlockPageContext.Provider value={null}>
              {children}
              <AdminImageEditorModal />
            </AdminBlockPageContext.Provider>
          </PageServerContentContext.Provider>
        </AdminSessionContext.Provider>
      </AdminImageEditorProvider>
    </AdminCoreContext.Provider>
  )
}
