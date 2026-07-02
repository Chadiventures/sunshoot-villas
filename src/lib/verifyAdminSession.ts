import type { NextRequest } from 'next/server'
import { ADMIN_SESSION_COOKIE_NAME, verifyAdminSessionToken } from '@/lib/adminSession'

export function verifyAdminSessionFromRequest(req: NextRequest): string | null {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value?.trim()
  if (!token) return null
  const verified = verifyAdminSessionToken(token)
  return verified?.userId ?? null
}
