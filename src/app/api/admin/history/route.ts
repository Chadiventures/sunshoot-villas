import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'
import {
  ensureContentBlockHistoryTable,
  historyRowToPayload,
  type ContentBlockHistoryRow,
} from '@/lib/contentBlockHistoryDb'
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

  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    return NextResponse.json({ changes: [] })
  }

  try {
    const sql = neon(dbUrl)
    await ensureContentBlockHistoryTable(sql)
    const limit = pageSlug === 'all' ? 20 : 50
    const rows =
      pageSlug === 'all'
        ? await sql`
            SELECT id, page_slug, block_key, value, previous_value, saved_at
            FROM content_block_history
            ORDER BY saved_at DESC
            LIMIT ${limit}
          `
        : await sql`
            SELECT id, page_slug, block_key, value, previous_value, saved_at
            FROM content_block_history
            WHERE page_slug = ${pageSlug}
            ORDER BY saved_at DESC
            LIMIT ${limit}
          `
    const changes = (rows as ContentBlockHistoryRow[]).map(historyRowToPayload)
    return NextResponse.json({ changes })
  } catch (err) {
    console.error('[admin/history GET] error', err)
    return NextResponse.json({ error: 'Kunde inte läsa historik' }, { status: 500 })
  }
}
