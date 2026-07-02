import { getSql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE_NAME,
  adminSessionCookieOptions,
} from '@/lib/adminSession'
import { deleteAdminSession } from '@/lib/adminUserDb'

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value?.trim()
  const sql = getSql()

  if (token && sql) {
    try {
      await deleteAdminSession(sql, token)
    } catch {
      /* ignore */
    }
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_SESSION_COOKIE_NAME, '', {
    ...adminSessionCookieOptions(),
    maxAge: 0,
  })
  return res
}
