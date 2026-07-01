'use client'

import Link from 'next/link'
import { useCallback, useState, type FormEvent } from 'react'
import { adminPublicPath } from '@/lib/adminPath'

type Props = {
  initialToken: string
}

export default function AdminCmsResetPasswordForm({ initialToken }: Props) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setError(null)

      if (password !== confirmPassword) {
        setError('Lösenorden matchar inte')
        return
      }
      if (!password.trim()) {
        setError('Lösenord får inte vara tomt')
        return
      }

      setLoading(true)
      try {
        const res = await fetch('/api/admin/reset-confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: initialToken, password }),
        })
        const data = (await res.json()) as { error?: string }
        if (!res.ok) {
          setError(typeof data.error === 'string' ? data.error : 'Något gick fel')
          return
        }
        setDone(true)
      } catch {
        setError('Något gick fel. Försök igen.')
      } finally {
        setLoading(false)
      }
    },
    [initialToken, password, confirmPassword],
  )

  const btnBase =
    'min-h-[44px] w-full touch-manipulation px-4 py-2.5 font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 sm:px-5'

  if (done) {
    return (
      <div className="rounded-lg border border-gold/35 bg-navy px-6 py-10 shadow-lg sm:px-8 sm:py-12">
        <h1 className="mb-3 font-sans text-xl font-light tracking-wide text-pearl sm:text-2xl">Lösenord uppdaterat</h1>
        <p className="mb-6 font-sans text-sm text-pearl/70">Du kan nu logga in med ditt nya lösenord.</p>
        <Link
          href={adminPublicPath()}
          className={`${btnBase} inline-flex w-auto items-center justify-center border border-gold bg-gold text-white hover:bg-gold-light`}
        >
          Till inloggning
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-gold/35 bg-navy px-6 py-10 shadow-lg sm:px-8 sm:py-12">
      <h1 className="mb-2 font-sans text-xl font-light tracking-wide text-pearl sm:text-2xl">Nytt lösenord</h1>
      <p className="mb-8 font-sans text-sm text-pearl/60">Välj ett nytt lösenord för CMS-kontot.</p>

      <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-5">
        <div>
          <label htmlFor="admin-cms-reset-password" className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.25em] text-pearl/55">
            Lösenord
          </label>
          <input
            id="admin-cms-reset-password"
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-white/15 bg-pearl/10 px-3 py-2.5 font-sans text-sm text-pearl placeholder:text-pearl/35 focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="admin-cms-reset-confirm" className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.25em] text-pearl/55">
            Bekräfta lösenord
          </label>
          <input
            id="admin-cms-reset-confirm"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border border-white/15 bg-pearl/10 px-3 py-2.5 font-sans text-sm text-pearl placeholder:text-pearl/35 focus:border-gold focus:outline-none"
          />
        </div>

        {error && (
          <p className="font-sans text-sm text-red-300/95" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !password || !confirmPassword}
          className={`${btnBase} border border-gold bg-gold text-white hover:bg-gold-light disabled:opacity-50`}
        >
          {loading ? 'Sparar...' : 'Spara nytt lösenord'}
        </button>
      </form>
    </div>
  )
}
