import { getSql } from '@/lib/db'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { adminPublicPath } from '@/lib/adminPath'
import { signAdminResetToken } from '@/lib/adminResetToken'
import { ensureAdminTables } from '@/lib/adminUserDb'

function originFromRequest(req: NextRequest): string {
  const proto = req.headers.get('x-forwarded-proto') ?? 'http'
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? 'localhost:3000'
  return `${proto}://${host}`
}

type AdminIdRow = { id: string }

export async function POST(req: NextRequest) {
  const sql = getSql()
  if (!sql) {
    return NextResponse.json({ error: 'Databas är inte konfigurerad' }, { status: 500 })
  }

  if (!process.env.ADMIN_SESSION_SECRET?.trim()) {
    return NextResponse.json({ error: 'Admin är inte konfigurerad' }, { status: 500 })
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

  const emailRaw = typeof rec.email === 'string' ? rec.email : ''
  const email = emailRaw.trim().toLowerCase()
  if (!email) {
    return NextResponse.json({ error: 'Ogiltig begäran' }, { status: 400 })
  }

  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  if (!configuredEmail) {
    return NextResponse.json({ error: 'Admin är inte konfigurerad' }, { status: 500 })
  }

  if (email !== configuredEmail) {
    return NextResponse.json({ ok: true })
  }

  try {
    await ensureAdminTables(sql)

    const users = await sql`
      SELECT id
      FROM admin_user
      WHERE email = ${configuredEmail}
      LIMIT 1
    `
    const user = users[0] as AdminIdRow | undefined
    if (!user) {
      return NextResponse.json({ ok: true })
    }

    const signedToken = signAdminResetToken(user.id)
    if (!signedToken) {
      return NextResponse.json({ error: 'Admin är inte konfigurerad' }, { status: 500 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'E-post är inte konfigurerad' }, { status: 500 })
    }

    const origin = originFromRequest(req)
    const link = `${origin}${adminPublicPath('/aterstall')}?token=${encodeURIComponent(signedToken)}`
    const from =
      process.env.RESEND_FROM?.trim() ?? 'Sun Shoot Villas <noreply@sunshootvillasseminyak.com>'

    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to: configuredEmail,
      subject: 'Återställ lösenord',
      html: [
        '<p>Hej,</p>',
        '<p>Du har begärt att återställa lösenordet för Sun Shoot Villas CMS.</p>',
        `<p><a href="${link}">Klicka här för att välja nytt lösenord</a> (gäller i en timme).</p>`,
        '<p>Om du inte har begärt detta kan du ignorera mailet.</p>',
      ].join(''),
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('admin reset-request POST error', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
