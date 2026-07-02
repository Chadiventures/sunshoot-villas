import { compareSync } from 'bcryptjs'
import { Resend } from 'resend'
import { getSql, logDatabaseUrl } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import {
  getClientIp,
  isLoginRateLimited,
  recordFailedLogin,
  resetLoginAttempts,
  siteNameFromRequest,
  swedishDateTimeString,
} from '@/lib/adminLoginRateLimit'
import {
  ensureAdminTables,
  storeAdminSession,
} from '@/lib/adminUserDb'
import {
  ADMIN_SESSION_COOKIE_NAME,
  adminSessionCookieOptions,
  sessionExpiresAt,
  signAdminSessionToken,
} from '@/lib/adminSession'

const RATE_LIMIT_MESSAGE = 'För många inloggningsförsök. Kolla din mejl.'

type AdminUserRow = {
  id: string
  password_hash: string
}

async function sendLoginSecurityAlert(req: NextRequest, ip: string): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim()
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!adminEmail || !apiKey) {
    console.error('[admin/login] security alert skipped: missing ADMIN_EMAIL or RESEND_API_KEY')
    return
  }

  const brand = siteNameFromRequest(req)
  const from =
    process.env.RESEND_FROM?.trim() ?? 'Sun Shoot Villas <noreply@sunshootvillasseminyak.com>'
  const body = [
    'Någon har försökt logga in på din admin-panel 3 gånger utan att lyckas.',
    '',
    `Tidpunkt: ${swedishDateTimeString()}`,
    `IP-adress: ${ip}`,
    '',
    'Om det är du som försökte logga in, vänta 15 minuter och försök igen,',
    'eller använd Glömt lösenord.',
    '',
    'Om det INTE är du, kontakta oss omgående.',
  ].join('\n')

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to: adminEmail,
    subject: `Varning: Misslyckade inloggningsförsök på ${brand}`,
    text: body,
  })

  if (error) {
    console.error('[admin/login] security alert email failed', error)
  }
}

function rateLimitResponse(): NextResponse {
  return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 })
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  if (isLoginRateLimited(ip)) {
    return rateLimitResponse()
  }

  logDatabaseUrl('admin/auth/login')
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

  const password = typeof rec.password === 'string' ? rec.password : ''
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  if (!adminEmail) {
    return NextResponse.json({ error: 'Admin är inte konfigurerad' }, { status: 500 })
  }

  if (!password) {
    return NextResponse.json({ error: 'Ogiltig begäran' }, { status: 400 })
  }

  try {
    await ensureAdminTables(sql)

    const rows = await sql`
      SELECT id, password_hash
      FROM admin_user
      WHERE email = ${adminEmail}
      LIMIT 1
    `
    const row = rows[0] as AdminUserRow | undefined
    if (!row || !compareSync(password, row.password_hash)) {
      const { shouldAlert, limited } = recordFailedLogin(ip)
      if (shouldAlert) {
        await sendLoginSecurityAlert(req, ip)
      }
      if (limited) {
        return rateLimitResponse()
      }
      return NextResponse.json({ error: 'Ogiltiga inloggningsuppgifter' }, { status: 401 })
    }

    resetLoginAttempts(ip)

    const token = signAdminSessionToken(row.id)
    if (!token) {
      return NextResponse.json({ error: 'Admin är inte konfigurerad' }, { status: 500 })
    }

    await storeAdminSession(sql, token, sessionExpiresAt())

    const res = NextResponse.json({ ok: true })
    res.cookies.set(ADMIN_SESSION_COOKIE_NAME, token, adminSessionCookieOptions())
    return res
  } catch (err) {
    console.error('admin auth login POST error', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
