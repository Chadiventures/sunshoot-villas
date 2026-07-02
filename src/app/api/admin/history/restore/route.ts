import { getSql } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { isVillaPageSlug } from '@/lib/contentBlockTypes'
import { readHistory, restoreHistoryEntry } from '@/lib/contentBlockHistoryDb'
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

export async function POST(req: NextRequest) {
  const userId = verifyAdminSessionFromRequest(req)
  if (!userId) {
    return NextResponse.json({ error: 'Ej inloggad' }, { status: 401 })
  }

  const sql = getSql()
  if (!sql) {
    return NextResponse.json({ error: 'Databas är inte konfigurerad' }, { status: 500 })
  }

  try {
    const body = (await req.json()) as { id?: unknown }
    const id = typeof body.id === 'number' ? body.id : Number(body.id)
    if (!Number.isInteger(id) || id < 1) {
      return NextResponse.json({ error: 'Ogiltigt id' }, { status: 400 })
    }

    const result = await restoreHistoryEntry(sql, id)
    if (!result) {
      return NextResponse.json({ error: 'Historikpost hittades inte' }, { status: 404 })
    }

    revalidatePath('/')
    if (isVillaPageSlug(result.pageSlug)) {
      revalidatePath(`/villas/${result.pageSlug}`)
    } else if (result.pageSlug === 'home') {
      revalidatePath('/')
    } else {
      revalidatePath(`/${result.pageSlug}`)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[admin/history restore] error', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
