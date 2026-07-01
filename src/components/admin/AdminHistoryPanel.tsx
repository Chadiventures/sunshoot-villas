'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminBlockLabel } from '@/lib/adminPanelConfig'
import { formatTimeAgoSv, truncatePreview } from '@/lib/formatTimeAgoSv'
import type { PageSlug } from '@/lib/contentBlockTypes'
import { AdminCoreContext } from '@/hooks/useAdminContent'

export type HistoryChange = {
  id: number
  pageSlug: string
  blockKey: string
  value: string
  previousValue: string
  savedAt: string
}

type Props = {
  open: boolean
  onClose: () => void
}

export default function AdminHistoryPanel({ open, onClose }: Props) {
  const core = useContext(AdminCoreContext)
  const router = useRouter()
  const [changes, setChanges] = useState<HistoryChange[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [restoringId, setRestoringId] = useState<number | null>(null)
  const [confirmMessage, setConfirmMessage] = useState<string | null>(null)

  const loadHistory = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/history?pageSlug=all', {
        credentials: 'include',
        cache: 'no-store',
      })
      const data = (await res.json().catch(() => ({}))) as {
        changes?: HistoryChange[]
        error?: string
      }
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Kunde inte läsa historik')
        setChanges([])
        return
      }
      setChanges(Array.isArray(data.changes) ? data.changes : [])
    } catch {
      setError('Kunde inte läsa historik')
      setChanges([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    void loadHistory()
  }, [open, loadHistory])

  const handleRestore = async (item: HistoryChange) => {
    const restoredValue = item.previousValue
    const restorePageSlug = item.pageSlug as PageSlug
    setRestoringId(item.id)
    setError(null)
    setConfirmMessage(null)
    try {
      const res = await fetch('/api/admin/history/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: item.id }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Kunde inte återställa')
        return
      }
      core?.updateText(restorePageSlug, item.blockKey, restoredValue)
      router.refresh()
      setConfirmMessage('Återställt!')
      window.setTimeout(() => setConfirmMessage(null), 2500)
      await loadHistory()
    } catch {
      setError('Kunde inte återställa')
    } finally {
      setRestoringId(null)
    }
  }

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Stäng historikpanel"
          className="fixed inset-0 z-[9997] bg-navy/40"
          onClick={onClose}
        />
      )}
      <aside
        className="fixed right-0 top-0 z-[9998] flex h-full w-[320px] flex-col bg-[#0f1f44] shadow-2xl transition-transform duration-300 ease-out"
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
        aria-label="Revisionshistorik"
        aria-hidden={!open}
      >
        <div className="shrink-0 border-b border-white/10 px-4 py-4">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-serif text-lg font-light text-pearl">Historik</h2>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 font-sans text-xs uppercase tracking-wider text-pearl/60 transition-colors hover:text-gold"
            >
              Stäng
            </button>
          </div>
          <p className="mt-1 font-sans text-[10px] text-pearl/50">Senaste 20 ändringar på hela webbplatsen</p>
          {confirmMessage && (
            <p className="mt-2 font-sans text-xs font-medium text-emerald-300" role="status">
              {confirmMessage}
            </p>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          {loading && <p className="font-sans text-xs text-pearl/50">Laddar historik...</p>}
          {error && (
            <p className="font-sans text-xs text-red-300" role="alert">
              {error}
            </p>
          )}
          {!loading && !error && changes.length === 0 && (
            <p className="font-sans text-xs text-pearl/50">Ingen sparad historik ännu.</p>
          )}
          <ul className="space-y-2">
            {changes.map((item) => (
              <li
                key={item.id}
                className="rounded border border-white/10 bg-white/5 px-3 py-2.5"
              >
                <p className="font-sans text-[10px] uppercase tracking-wider text-pearl/45">
                  {item.pageSlug}
                </p>
                <p className="font-sans text-[11px] font-medium text-gold">
                  {adminBlockLabel(item.blockKey)}
                </p>
                <p className="mt-1 font-sans text-xs leading-relaxed text-pearl/80">
                  {truncatePreview(item.previousValue)}
                </p>
                <p className="mt-1 font-sans text-[10px] text-pearl/45">{formatTimeAgoSv(item.savedAt)}</p>
                <button
                  type="button"
                  disabled={restoringId !== null}
                  onClick={() => void handleRestore(item)}
                  className="mt-2 rounded border border-pearl/25 px-2 py-1 font-sans text-[10px] uppercase tracking-wider text-pearl transition-colors hover:border-gold hover:text-gold disabled:opacity-45"
                >
                  {restoringId === item.id ? 'Återställer...' : 'Återställ'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}
