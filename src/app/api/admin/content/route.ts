import { getSql } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import {
  type ContentBlockRow,
  type ContentBlockType,
  type ContentBlockUpsertInput,
  isVillaPageSlug,
} from '@/lib/contentBlockTypes'
import { readBlocksForPage, writeContentBlocks } from '@/lib/cmsDb'
import { ADMIN_SESSION_COOKIE_NAME } from '@/lib/adminSession'
import { verifyAdminSessionFromRequest } from '@/lib/verifyAdminSession'

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

function isContentBlockType(v: string): v is ContentBlockType {
  return v === 'text' || v === 'image'
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
  const paths = new Set<string>(['/', '/about', '/villas', '/contact'])
  for (const b of blocks) {
    if (isVillaPageSlug(b.pageSlug)) {
      paths.add(`/villas/${b.pageSlug}`)
    } else if (b.pageSlug === 'home') {
      paths.add('/')
    } else {
      paths.add(`/${b.pageSlug}`)
    }
  }
  for (const path of paths) revalidatePath(path)
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const pageSlug = normalizePageSlug(url.searchParams.get('pageSlug'))

  if (!pageSlug) {
    return NextResponse.json({ error: 'Ogiltig eller saknad pageSlug' }, { status: 400 })
  }

  const sql = getSql()
  if (!sql) {
    return NextResponse.json({ blocks: [] as ContentBlockRow[] })
  }

  try {
    const blocks = await readBlocksForPage(sql, pageSlug)
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

  const sql = getSql()
  if (!sql) {
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

    await writeContentBlocks(sql, blocks)
    revalidateAfterContentUpsert(blocks)

    console.log('[admin/content POST] success', { userId, saved: blocks.length })
    return NextResponse.json({ ok: true, saved: blocks.length })
  } catch (err) {
    console.error('[admin/content POST] error', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
