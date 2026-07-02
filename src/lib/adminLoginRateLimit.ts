import type { NextRequest } from 'next/server'
import { siteName } from '@/lib/adminPath'

type AttemptEntry = {
  count: number
  firstAt: number
  alertSent: boolean
}

const attempts = new Map<string, AttemptEntry>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 3

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}

export function siteNameFromRequest(_req: NextRequest): string {
  return siteName()
}

export function swedishDateTimeString(): string {
  return new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })
}

export function isLoginRateLimited(ip: string): boolean {
  const entry = attempts.get(ip)
  if (!entry) return false
  if (Date.now() - entry.firstAt > WINDOW_MS) {
    attempts.delete(ip)
    return false
  }
  return entry.count >= MAX_ATTEMPTS
}

export function recordFailedLogin(ip: string): { shouldAlert: boolean; limited: boolean } {
  const now = Date.now()
  let entry = attempts.get(ip)
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    entry = { count: 0, firstAt: now, alertSent: false }
  }
  entry.count += 1
  attempts.set(ip, entry)
  const shouldAlert = entry.count === MAX_ATTEMPTS && !entry.alertSent
  if (shouldAlert) entry.alertSent = true
  return { shouldAlert, limited: entry.count >= MAX_ATTEMPTS }
}

export function resetLoginAttempts(ip: string) {
  attempts.delete(ip)
}
