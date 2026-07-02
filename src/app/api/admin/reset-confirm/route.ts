import { hashSync } from 'bcryptjs'
import { getSql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminResetToken } from '@/lib/adminResetToken'
import { ensureAdminTables } from '@/lib/adminUserDb'

type UpdateRow = { id: string }

export async function POST(req: NextRequest) {
  const sql = getSql()
  if (!sql) {
    return NextResponse.json({ error: 'Databas är inte konfigurerad' }, { status: 500 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig begäran' }, { status: 400 })
  }

  const rec = typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : null
  if (!rec) {
    return NextResponse.json({ error: 'Ogiltig begäran' }, { status: 400 })
  }

  const tokenRaw = typeof rec.token === 'string' ? rec.token : ''
  const passwordRaw = typeof rec.password === 'string' ? rec.password : ''
  const token = tokenRaw.trim()
  const password = passwordRaw

  if (!token || !password) {
    return NextResponse.json({ error: 'Ogiltig begäran' }, { status: 400 })
  }

  const verified = verifyAdminResetToken(token)
  if (!verified) {
    return NextResponse.json({ error: 'Ogiltig eller utgången länk' }, { status: 401 })
  }

  try {
    await ensureAdminTables(sql)

    const passwordHash = hashSync(password, 10)
    const out = await sql`
      UPDATE admin_user
      SET password_hash = ${passwordHash},
          updated_at = now()
      WHERE id = ${verified.userId}
      RETURNING id
    `

    const row = out[0] as UpdateRow | undefined
    if (!row) {
      return NextResponse.json({ error: 'Ogiltig eller utgången länk' }, { status: 401 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('admin reset-confirm POST error', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
