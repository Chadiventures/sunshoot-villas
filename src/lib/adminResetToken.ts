import { createHmac, timingSafeEqual } from 'crypto'

const RESET_TTL_MS = 60 * 60 * 1000

function secret(): string | null {
  return process.env.ADMIN_SESSION_SECRET?.trim() || null
}

export function signAdminResetToken(userId: string): string | null {
  const s = secret()
  if (!s) return null
  const exp = Date.now() + RESET_TTL_MS
  const payload = `reset.${userId}.${exp}`
  const sig = createHmac('sha256', s).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function verifyAdminResetToken(token: string): { userId: string } | null {
  const s = secret()
  if (!s) return null
  const parts = token.split('.')
  if (parts.length !== 4 || parts[0] !== 'reset') return null
  const userId = parts[1]
  const exp = Number(parts[2])
  const sig = parts[3]
  if (!userId || !Number.isFinite(exp) || !sig) return null
  if (Date.now() > exp) return null
  const payload = `reset.${userId}.${exp}`
  const expected = createHmac('sha256', s).update(payload).digest('base64url')
  try {
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  } catch {
    return null
  }
  return { userId }
}
