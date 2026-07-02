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
        setError('Passwords do not match')
        return
      }
      if (!password.trim()) {
        setError('Password cannot be empty')
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
          setError(typeof data.error === 'string' ? data.error : 'Something went wrong')
          return
        }
        setDone(true)
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    },
    [initialToken, password, confirmPassword],
  )

  const btnBase =
    'min-h-[44px] w-full touch-manipulation px-4 py-2.5 font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 sm:px-5'

  const cardClass =
    'rounded-lg border border-[#c9a84c]/35 bg-[#1a2e1a] px-6 py-10 shadow-lg sm:px-8 sm:py-12'

  if (done) {
    return (
      <div className={cardClass}>
        <h1 className="mb-3 font-sans text-xl font-light tracking-wide text-pearl sm:text-2xl">Password updated</h1>
        <p className="mb-6 font-sans text-sm text-pearl/70">You can now log in with your new password.</p>
        <Link
          href={adminPublicPath()}
          className={`${btnBase} inline-flex w-auto items-center justify-center border border-[#c9a84c] bg-[#c9a84c] text-white hover:bg-[#d4b87f]`}
        >
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className={cardClass}>
      <h1 className="mb-2 font-sans text-xl font-light tracking-wide text-pearl sm:text-2xl">New password</h1>
      <p className="mb-8 font-sans text-sm text-pearl/60">Choose a new password for the CMS account.</p>

      <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-5">
        <div>
          <label htmlFor="admin-cms-reset-password" className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.25em] text-pearl/55">
            Password
          </label>
          <input
            id="admin-cms-reset-password"
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-white/15 bg-pearl/10 px-3 py-2.5 font-sans text-sm text-pearl placeholder:text-pearl/35 focus:border-[#c9a84c] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="admin-cms-reset-confirm" className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.25em] text-pearl/55">
            Confirm password
          </label>
          <input
            id="admin-cms-reset-confirm"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border border-white/15 bg-pearl/10 px-3 py-2.5 font-sans text-sm text-pearl placeholder:text-pearl/35 focus:border-[#c9a84c] focus:outline-none"
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
          className={`${btnBase} border border-[#c9a84c] bg-[#c9a84c] text-white hover:bg-[#d4b87f] disabled:opacity-50`}
        >
          {loading ? 'Saving...' : 'Save new password'}
        </button>
      </form>
    </div>
  )
}
