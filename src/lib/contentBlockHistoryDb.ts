import type { NeonQueryFunction } from '@neondatabase/serverless'
import { ensureCmsTables, makeContentKey, parseContentKey } from '@/lib/cmsDb'

export type ContentBlockHistoryRow = {
  id: number
  content_key: string
  old_value: string
  new_value: string
  changed_at: string | Date
}

export type HistoryPayload = {
  id: number
  pageSlug: string
  blockKey: string
  value: string
  previousValue: string
  savedAt: string
}

export async function ensureContentBlockHistoryTable(sql: NeonQueryFunction<false, false>) {
  await ensureCmsTables(sql)
}

export function historyRowToPayload(row: ContentBlockHistoryRow): HistoryPayload {
  const { pageSlug, blockKey } = parseContentKey(row.content_key)
  const savedAt =
    typeof row.changed_at === 'string' ? row.changed_at : row.changed_at.toISOString()
  return {
    id: row.id,
    pageSlug,
    blockKey,
    value: row.new_value ?? '',
    previousValue: row.old_value ?? '',
    savedAt,
  }
}

export async function readHistory(
  sql: NeonQueryFunction<false, false>,
  pageSlug: string | 'all',
  limit: number,
): Promise<HistoryPayload[]> {
  await ensureContentBlockHistoryTable(sql)
  const rows =
    pageSlug === 'all'
      ? await sql`
          SELECT id, content_key, old_value, new_value, changed_at
          FROM content_history
          WHERE NOT (COALESCE(old_value, '') = '' AND COALESCE(new_value, '') = '')
          ORDER BY changed_at DESC
          LIMIT ${limit}
        `
      : await sql`
          SELECT id, content_key, old_value, new_value, changed_at
          FROM content_history
          WHERE content_key LIKE ${pageSlug + ':%'}
            AND NOT (COALESCE(old_value, '') = '' AND COALESCE(new_value, '') = '')
          ORDER BY changed_at DESC
          LIMIT ${limit}
        `
  return (rows as ContentBlockHistoryRow[]).map(historyRowToPayload)
}

export async function restoreHistoryEntry(
  sql: NeonQueryFunction<false, false>,
  id: number,
): Promise<{ pageSlug: string; blockKey: string; restoredValue: string } | null> {
  const rows = await sql`
    SELECT id, content_key, old_value, new_value, changed_at
    FROM content_history WHERE id = ${id} LIMIT 1
  `
  const history = rows[0] as ContentBlockHistoryRow | undefined
  if (!history) return null

  const { pageSlug, blockKey } = parseContentKey(history.content_key)
  const restoreTo = history.old_value ?? ''
  const contentKey = makeContentKey(pageSlug, blockKey)

  const { readBlockValue, writeContentBlocks } = await import('@/lib/cmsDb')
  const current = await readBlockValue(sql, pageSlug, blockKey)

  await writeContentBlocks(sql, [
    {
      pageSlug,
      blockKey,
      type: blockKey.includes('image') ? 'image' : 'text',
      value: restoreTo,
    },
  ])

  if (restoreTo !== current) {
    await sql`
      INSERT INTO content_history (content_key, old_value, new_value, changed_at)
      VALUES (${contentKey}, ${current}, ${restoreTo}, now())
    `
  }

  return { pageSlug, blockKey, restoredValue: restoreTo }
}
