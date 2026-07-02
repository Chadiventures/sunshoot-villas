const SESSION_KEY = 'sunshoot_admin_authenticated'
const PANEL_KEY = 'sunshoot_admin_panel_open'

export function readPersistedAdminSession(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function writePersistedAdminSession(value: boolean) {
  if (typeof window === 'undefined') return
  try {
    if (value) sessionStorage.setItem(SESSION_KEY, '1')
    else sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

export function subscribePersistedAdminSession(_onStoreChange: () => void) {
  return () => {}
}

export function readPersistedPanelOpen(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return sessionStorage.getItem(PANEL_KEY) === '1'
  } catch {
    return false
  }
}

export function writePersistedPanelOpen(open: boolean) {
  if (typeof window === 'undefined') return
  try {
    if (open) sessionStorage.setItem(PANEL_KEY, '1')
    else sessionStorage.removeItem(PANEL_KEY)
  } catch {
    /* ignore */
  }
}
