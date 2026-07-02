import { hashSync } from 'bcryptjs'
import type { NeonQueryFunction } from '@neondatabase/serverless'

export async function ensureAdminTables(sql: NeonQueryFunction<false, false>) {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_user (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      id SERIAL PRIMARY KEY,
      token TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      expires_at TIMESTAMPTZ NOT NULL
    )
  `

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) return

  const existing = await sql`
    SELECT id FROM admin_user WHERE email = ${email} LIMIT 1
  `
  if (existing.length === 0) {
    const passwordHash = hashSync(password, 10)
    await sql`
      INSERT INTO admin_user (email, password_hash)
      VALUES (${email}, ${passwordHash})
    `
  }
}

export async function storeAdminSession(
  sql: NeonQueryFunction<false, false>,
  token: string,
  expiresAt: Date,
) {
  await sql`
    INSERT INTO admin_sessions (token, expires_at)
    VALUES (${token}, ${expiresAt.toISOString()})
    ON CONFLICT (token) DO UPDATE SET expires_at = EXCLUDED.expires_at
  `
}

export async function deleteAdminSession(
  sql: NeonQueryFunction<false, false>,
  token: string,
) {
  await sql`DELETE FROM admin_sessions WHERE token = ${token}`
}

export async function isAdminSessionActive(
  sql: NeonQueryFunction<false, false>,
  token: string,
): Promise<boolean> {
  const rows = await sql`
    SELECT id FROM admin_sessions
    WHERE token = ${token} AND expires_at > now()
    LIMIT 1
  `
  return rows.length > 0
}
