import { getSql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { readHistory } from '@/lib/contentBlockHistoryDb'
import { verifyAdminSessionFromRequest } from '@/lib/verifyAdminSession'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function normalizePageSlug(raw: string | null): string | 'all' | null {
  if (raw == null) return null
  const s = raw.trim().toLowerCase()
  if (s === 'all') return 'all'
  if (!s || s.length > 120 || !slugPattern.test(s)) return null
  return s
}

export async function GET(req: NextRequest) {
  const userId = verifyAdminSessionFromRequest(req)
  if (!userId) {
    return NextResponse.json({ error: 'Ej inloggad' }, { status: 401 })
  }

  const url = new URL(req.url)
  const pageSlug = normalizePageSlug(url.searchParams.get('pageSlug'))
  if (!pageSlug) {
    return NextResponse.json({ error: 'Ogiltig eller saknad pageSlug' }, { status: 400 })
  }

  const sql = getSql()
  if (!sql) {
    return NextResponse.json({ changes: [] })
  }

  try {
    const limit = pageSlug === 'all' ? 20 : 50
    const changes = await readHistory(sql, pageSlug, limit)
    return NextResponse.json({ changes })
  } catch (err) {
    console.error('[admin/history GET] error', err)
    return NextResponse.json({ error: 'Kunde inte läsa historik' }, { status: 500 })
  }
}
