import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

let sqlClient: NeonQueryFunction<false, false> | null = null

/** Normalize Neon connection string for the HTTP `neon()` driver. */
export function getDatabaseUrl(): string | null {
  const raw = process.env.DATABASE_URL?.trim()
  if (!raw) return null

  try {
    const url = new URL(raw)
    // channel_binding is not supported by the serverless HTTP driver.
    url.searchParams.delete('channel_binding')
    return url.toString()
  } catch {
    return raw.replace(/[?&]channel_binding=[^&]*/g, '').replace(/[?&]$/, '')
  }
}

export function getSql(): NeonQueryFunction<false, false> | null {
  const url = getDatabaseUrl()
  if (!url) return null
  if (!sqlClient) {
    sqlClient = neon(url)
  }
  return sqlClient
}

/** Log whether DATABASE_URL is set (password masked). */
export function logDatabaseUrl(context: string): void {
  const raw = process.env.DATABASE_URL?.trim()
  const masked = raw ? raw.replace(/:([^:@/]+)@/, ':***@') : '(not set)'
  console.log(`[db] ${context} DATABASE_URL present=${Boolean(raw)} value=${masked}`)
}
