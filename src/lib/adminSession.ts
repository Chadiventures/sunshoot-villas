import { createHmac, randomBytes, timingSafeEqual } from 'crypto'

export const ADMIN_SESSION_COOKIE_NAME = 'sunshoot_admin_session'
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000

function secret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET?.trim()
  return s || null
}

function signPayload(payload: string): string | null {
  const s = secret()
  if (!s) return null
  return createHmac('sha256', s).update(payload).digest('base64url')
}

export function signAdminSessionToken(userId: string): string | null {
  const exp = Date.now() + SESSION_TTL_MS
  const payload = `${userId}.${exp}`
  const sig = signPayload(payload)
  if (!sig) return null
  return `${payload}.${sig}`
}

export function verifyAdminSessionToken(token: string): { userId: string } | null {
  const s = secret()
  if (!s) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [userId, expStr, sig] = parts
  const exp = Number(expStr)
  if (!userId || !Number.isFinite(exp) || !sig) return null
  if (Date.now() > exp) return null
  const payload = `${userId}.${expStr}`
  const expected = signPayload(payload)
  if (!expected) return null
  try {
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  } catch {
    return null
  }
  return { userId }
}

export function adminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  }
}

export function sessionExpiresAt(): Date {
  return new Date(Date.now() + SESSION_TTL_MS)
}
