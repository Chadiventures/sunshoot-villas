import { neon } from '@neondatabase/serverless'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import type { ContentBlockType } from '@/lib/contentBlockTypes'
import {
  ensureContentBlockHistoryTable,
  type ContentBlockHistoryRow,
} from '@/lib/contentBlockHistoryDb'
import { verifyAdminSessionFromRequest } from '@/lib/verifyAdminSession'

function isContentBlockType(v: string): v is ContentBlockType {
  return v === 'text' || v === 'image'
}

export async function POST(req: NextRequest) {
  const userId = verifyAdminSessionFromRequest(req)
  if (!userId) {
    return NextResponse.json({ error: 'Ej inloggad' }, { status: 401 })
  }

  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    return NextResponse.json({ error: 'Databas är inte konfigurerad' }, { status: 500 })
  }

  try {
    const body = (await req.json()) as { id?: unknown }
    const id = typeof body.id === 'number' ? body.id : Number(body.id)
    if (!Number.isInteger(id) || id < 1) {
      return NextResponse.json({ error: 'Ogiltigt id' }, { status: 400 })
    }

    const sql = neon(dbUrl)
    await ensureContentBlockHistoryTable(sql)

    const historyRows = await sql`
      SELECT id, page_slug, block_key, value, previous_value, saved_at
      FROM content_block_history
      WHERE id = ${id}
      LIMIT 1
    `
    const history = historyRows[0] as ContentBlockHistoryRow | undefined
    if (!history) {
      return NextResponse.json({ error: 'Historikpost hittades inte' }, { status: 404 })
    }

    const existing = await sql`
      SELECT type, value FROM content_block
      WHERE page_slug = ${history.page_slug} AND block_key = ${history.block_key}
      LIMIT 1
    `
    const typeRaw = (existing[0] as { type?: string } | undefined)?.type ?? 'text'
    const type: ContentBlockType = isContentBlockType(typeRaw) ? typeRaw : 'text'
    const currentPrevious =
      typeof (existing[0] as { value?: string } | undefined)?.value === 'string'
        ? (existing[0] as { value: string }).value
        : ''

    const restoreTo = history.previous_value ?? ''

    await sql`
      INSERT INTO content_block (page_slug, block_key, type, value, updated_at)
      VALUES (${history.page_slug}, ${history.block_key}, ${type}, ${restoreTo}, now())
      ON CONFLICT (page_slug, block_key) DO UPDATE SET
        type = EXCLUDED.type,
        value = EXCLUDED.value,
        updated_at = now()
    `

    if (restoreTo !== currentPrevious) {
      await sql`
        INSERT INTO content_block_history (page_slug, block_key, value, previous_value)
        VALUES (${history.page_slug}, ${history.block_key}, ${restoreTo}, ${currentPrevious})
      `
    }

    revalidatePath('/')
    revalidatePath(`/${history.page_slug}`)

    console.log('[admin/history restore] ok', { userId, id, pageSlug: history.page_slug })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[admin/history restore] error', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
