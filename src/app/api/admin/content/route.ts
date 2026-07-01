import { neon, type NeonQueryFunction } from '@neondatabase/serverless'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import {
  type ContentBlockRow,
  type ContentBlockType,
  type ContentBlockUpsertInput,
} from '@/lib/contentBlockTypes'
import { ADMIN_SESSION_COOKIE_NAME } from '@/lib/adminSession'
import { ensureContentBlockHistoryTable } from '@/lib/contentBlockHistoryDb'
import { verifyAdminSessionFromRequest } from '@/lib/verifyAdminSession'

async function ensureTable(sql: NeonQueryFunction<false, false>) {
  await sql`
    CREATE TABLE IF NOT EXISTS content_block (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      page_slug text NOT NULL,
      block_key text NOT NULL,
      type text NOT NULL,
      value text NOT NULL DEFAULT '',
      updated_at timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT content_block_slug_key UNIQUE (page_slug, block_key),
      CONSTRAINT content_block_type_chk CHECK (type IN ('text', 'image'))
    )
  `
}

type DbRow = {
  id: string
  page_slug: string
  block_key: string
  type: string
  value: string
  updated_at: string | Date
}

function toIso(v: string | Date): string {
  if (typeof v === 'string') return v
  return v.toISOString()
}

function isContentBlockType(v: string): v is ContentBlockType {
  return v === 'text' || v === 'image'
}

function rowToPayload(row: DbRow): ContentBlockRow {
  return {
    id: row.id,
    pageSlug: row.page_slug,
    blockKey: row.block_key,
    type: isContentBlockType(row.type) ? row.type : 'text',
    value: row.value ?? '',
    updatedAt: toIso(row.updated_at),
  }
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function normalizePageSlug(raw: string | null): string | null {
  if (raw == null) return null
  const s = raw.trim().toLowerCase()
  if (!s || s.length > 120 || !slugPattern.test(s)) return null
  return s
}

function normalizeBlockKey(raw: string): string | null {
  const s = raw.trim()
  if (!s || s.length > 200) return null
  if (!/^[a-zA-Z0-9._-]+$/.test(s)) return null
  return s
}

function parseUpsertBlocks(body: unknown): ContentBlockUpsertInput[] | null {
  if (typeof body !== 'object' || body === null) return null
  const rec = body as Record<string, unknown>
  const raw = rec.blocks
  if (raw === undefined) return []
  if (!Array.isArray(raw)) return null
  const out: ContentBlockUpsertInput[] = []
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) return null
    const o = item as Record<string, unknown>
    const pageSlug = normalizePageSlug(typeof o.pageSlug === 'string' ? o.pageSlug : null)
    const blockKey = typeof o.blockKey === 'string' ? normalizeBlockKey(o.blockKey) : null
    const typeRaw = typeof o.type === 'string' ? o.type.trim() : ''
    const value = typeof o.value === 'string' ? o.value : null
    if (pageSlug == null || blockKey == null || value === null) return null
    if (!isContentBlockType(typeRaw)) return null
    out.push({ pageSlug, blockKey, type: typeRaw, value })
  }
  return out
}

function revalidateAfterContentUpsert(blocks: ContentBlockUpsertInput[]) {
  const slugsToRevalidate = new Set<string>()
  slugsToRevalidate.add('/')
  slugsToRevalidate.add('/global')
  for (const b of blocks) {
    slugsToRevalidate.add('/' + b.pageSlug)
  }
  for (const path of slugsToRevalidate) {
    revalidatePath(path)
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const pageSlug = normalizePageSlug(url.searchParams.get('pageSlug'))

  if (!pageSlug) {
    return NextResponse.json({ error: 'Ogiltig eller saknad pageSlug' }, { status: 400 })
  }

  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    return NextResponse.json({ blocks: [] as ContentBlockRow[] })
  }

  try {
    const sql = neon(dbUrl)
    await ensureTable(sql)
    const rows = await sql`
      SELECT id, page_slug, block_key, type, value, updated_at
      FROM content_block
      WHERE page_slug = ${pageSlug}
      ORDER BY block_key ASC
    `
    const blocks = (rows as DbRow[]).map(rowToPayload)
    console.log('[admin/content GET] ok', { pageSlug, blockCount: blocks.length })
    return NextResponse.json({ blocks })
  } catch (err) {
    console.error('[admin/content GET] error', err)
    return NextResponse.json({ error: 'Kunde inte läsa innehåll' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const userId = verifyAdminSessionFromRequest(req)
  if (!userId) {
    const hasCookie = Boolean(req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value?.trim())
    const hasSecret = Boolean(process.env.ADMIN_SESSION_SECRET?.trim())
    console.log('[admin/content POST] session verification failed', {
      hasSessionCookie: hasCookie,
      hasAdminSessionSecret: hasSecret,
    })
    return NextResponse.json({ error: 'Ej inloggad' }, { status: 401 })
  }

  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    return NextResponse.json({ error: 'Databas är inte konfigurerad' }, { status: 500 })
  }

  try {
    const body: unknown = await req.json()

    const blocks = parseUpsertBlocks(body)
    if (blocks === null) {
      return NextResponse.json({ error: 'Ogiltig begäran' }, { status: 400 })
    }

    if (blocks.length === 0) {
      return NextResponse.json({ ok: true, saved: 0 })
    }

    const sql = neon(dbUrl)
    await ensureTable(sql)
    await ensureContentBlockHistoryTable(sql)

    for (const b of blocks) {
      const existing = await sql`
        SELECT value FROM content_block
        WHERE page_slug = ${b.pageSlug} AND block_key = ${b.blockKey}
        LIMIT 1
      `
      const previousValue =
        typeof (existing[0] as { value?: string } | undefined)?.value === 'string'
          ? (existing[0] as { value: string }).value
          : ''

      await sql`
        INSERT INTO content_block (page_slug, block_key, type, value, updated_at)
        VALUES (${b.pageSlug}, ${b.blockKey}, ${b.type}, ${b.value}, now())
        ON CONFLICT (page_slug, block_key) DO UPDATE SET
          type = EXCLUDED.type,
          value = EXCLUDED.value,
          updated_at = now()
      `

      if (b.value !== previousValue) {
        await sql`
          INSERT INTO content_block_history (page_slug, block_key, value, previous_value)
          VALUES (${b.pageSlug}, ${b.blockKey}, ${b.value}, ${previousValue})
        `
      }
    }

    revalidateAfterContentUpsert(blocks)

    console.log('[admin/content POST] success', { userId, saved: blocks.length })
    return NextResponse.json({ ok: true, saved: blocks.length })
  } catch (err) {
    console.error('[admin/content POST] error', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
