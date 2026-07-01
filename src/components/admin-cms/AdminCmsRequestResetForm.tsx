'use client'

import Link from 'next/link'
import { useCallback, useState, type FormEvent } from 'react'
import { adminPublicPath } from '@/lib/adminPath'

export default function AdminCmsRequestResetForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setError(null)
      setLoading(true)
      try {
        const res = await fetch('/api/admin/reset-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() }),
        })
        const data = (await res.json()) as { error?: string }
        if (!res.ok) {
          setError(typeof data.error === 'string' ? data.error : 'Något gick fel')
          return
        }
        setSent(true)
      } catch {
        setError('Något gick fel. Försök igen.')
      } finally {
        setLoading(false)
      }
    },
    [email],
  )

  const btnBase =
    'min-h-[44px] w-full touch-manipulation px-4 py-2.5 font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 sm:px-5'

  const cardClass = 'rounded-lg border border-gold/35 bg-navy px-6 py-10 shadow-lg sm:px-8 sm:py-12'

  if (sent) {
    return (
      <div className={cardClass}>
        <h1 className="mb-3 font-sans text-xl font-light tracking-wide text-pearl sm:text-2xl">Kolla din e-post</h1>
        <p className="mb-6 font-sans text-sm text-pearl/70">
          Om adressen matchar admin-kontot har vi skickat en länk för att välja nytt lösenord. Länken gäller i en timme.
        </p>
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
    <div className={cardClass}>
      <h1 className="mb-2 font-sans text-xl font-light tracking-wide text-pearl sm:text-2xl">Glömt lösenord</h1>
      <p className="mb-8 font-sans text-sm text-pearl/60">
        Ange e-postadressen för CMS-kontot. Vi skickar en länk för att välja nytt lösenord.
      </p>

      <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="admin-cms-reset-email"
            className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.25em] text-pearl/55"
          >
            E-post
          </label>
          <input
            id="admin-cms-reset-email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          disabled={loading || !email.trim()}
          className={`${btnBase} border border-gold bg-gold text-white hover:bg-gold-light disabled:opacity-50`}
        >
          {loading ? 'Skickar...' : 'Skicka återställningslänk'}
        </button>
      </form>

      <p className="mt-6 text-center font-sans text-sm">
        <Link
          href={adminPublicPath()}
          className="text-gold underline decoration-gold/40 underline-offset-4 hover:text-gold-light"
        >
          Tillbaka till inloggning
        </Link>
      </p>
    </div>
  )
}
