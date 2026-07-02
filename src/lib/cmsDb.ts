import type { NeonQueryFunction } from '@neondatabase/serverless'
import { isSharedCmsBlockKey, parseStorageBlockKey, storageBlockKey } from '@/lib/cmsLocale'
import {
  type ContentBlockRow,
  type ContentBlockType,
  type ContentBlockUpsertInput,
  isVillaPageSlug,
} from '@/lib/contentBlockTypes'

type VillaRow = {
  slug: string
  name: string
  description: string
  price_idr: number
  bedrooms: number
  bathrooms: number
  size_m2: number
  images: string[] | null
  updated_at: string | Date
}

function toIso(v: string | Date): string {
  return typeof v === 'string' ? v : v.toISOString()
}

function siteContentKey(pageSlug: string, blockKey: string): string {
  return `${pageSlug}.${blockKey}`
}

function parseContentKey(contentKey: string): { pageSlug: string; blockKey: string } {
  const idx = contentKey.indexOf(':')
  if (idx === -1) return { pageSlug: 'global', blockKey: contentKey }
  return {
    pageSlug: contentKey.slice(0, idx),
    blockKey: contentKey.slice(idx + 1),
  }
}

export function makeContentKey(pageSlug: string, blockKey: string): string {
  return `${pageSlug}:${blockKey}`
}

let ensureTablesPromise: Promise<void> | null = null

export async function ensureCmsTables(sql: NeonQueryFunction<false, false>) {
  if (!ensureTablesPromise) {
    ensureTablesPromise = ensureCmsTablesOnce(sql)
  }
  await ensureTablesPromise
}

async function ensureCmsTablesOnce(sql: NeonQueryFunction<false, false>) {
  await sql`
    CREATE TABLE IF NOT EXISTS villas (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      price_idr INTEGER NOT NULL DEFAULT 0,
      bedrooms INTEGER NOT NULL DEFAULT 0,
      bathrooms INTEGER NOT NULL DEFAULT 0,
      size_m2 INTEGER NOT NULL DEFAULT 0,
      images TEXT[] NOT NULL DEFAULT '{}',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      id SERIAL PRIMARY KEY,
      key TEXT NOT NULL UNIQUE,
      value TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS content_history (
      id SERIAL PRIMARY KEY,
      content_key TEXT NOT NULL,
      old_value TEXT NOT NULL DEFAULT '',
      new_value TEXT NOT NULL DEFAULT '',
      changed_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
}

function villaRowToBlocks(row: VillaRow): ContentBlockRow[] {
  const updatedAt = toIso(row.updated_at)
  const images = Array.isArray(row.images) ? row.images : []
  const hero = images[0] ?? ''
  const gallery = images.slice(1).join('\n')
  const base = row.slug
  const mk = (blockKey: string, type: ContentBlockType, value: string): ContentBlockRow => ({
    id: `${base}:${blockKey}`,
    pageSlug: base,
    blockKey,
    type,
    value,
    updatedAt,
  })
  return [
    mk('villa.name', 'text', row.name ?? ''),
    mk('villa.description', 'text', row.description ?? ''),
    mk('villa.price_idr', 'text', String(row.price_idr ?? 0)),
    mk('villa.bedrooms', 'text', String(row.bedrooms ?? 0)),
    mk('villa.bathrooms', 'text', String(row.bathrooms ?? 0)),
    mk('villa.size_m2', 'text', String(row.size_m2 ?? 0)),
    mk('villa.hero_image', 'image', hero),
    mk('villa.hero_image.alt', 'text', row.name ?? ''),
    mk('villa.gallery_urls', 'text', gallery),
  ]
}

export async function readBlocksForPage(
  sql: NeonQueryFunction<false, false>,
  pageSlug: string,
): Promise<ContentBlockRow[]> {
  await ensureCmsTables(sql)

  if (isVillaPageSlug(pageSlug)) {
    const rows = await sql`
      SELECT slug, name, description, price_idr, bedrooms, bathrooms, size_m2, images, updated_at
      FROM villas WHERE slug = ${pageSlug} LIMIT 1
    `
    const row = rows[0] as VillaRow | undefined
    const villaBlocks = row ? villaRowToBlocks(row) : []
    const prefix = `${pageSlug}.`
    const siteRows = await sql`
      SELECT key, value, updated_at FROM site_content
      WHERE key LIKE ${prefix + '%'}
      ORDER BY key ASC
    `
    const villaBlockKeys = new Set(villaBlocks.map((b) => b.blockKey))
    const siteBlocks = (siteRows as { key: string; value: string; updated_at: string | Date }[])
      .map((r) => ({
        id: r.key,
        pageSlug,
        blockKey: r.key.slice(prefix.length),
        type: 'text' as const,
        value: r.value ?? '',
        updatedAt: toIso(r.updated_at),
      }))
      .filter((b) => !villaBlockKeys.has(b.blockKey))
    return [...villaBlocks, ...siteBlocks]
  }

  const prefix = `${pageSlug}.`
  const rows = await sql`
    SELECT key, value, updated_at FROM site_content
    WHERE key LIKE ${prefix + '%'}
    ORDER BY key ASC
  `
  return (rows as { key: string; value: string; updated_at: string | Date }[]).map((r) => ({
    id: r.key,
    pageSlug,
    blockKey: r.key.slice(prefix.length),
    type: 'text' as const,
    value: r.value ?? '',
    updatedAt: toIso(r.updated_at),
  }))
}

async function readVillaSiteContent(
  sql: NeonQueryFunction<false, false>,
  slug: string,
  blockKey: string,
): Promise<string> {
  const rows = await sql`
    SELECT value FROM site_content WHERE key = ${siteContentKey(slug, blockKey)} LIMIT 1
  `
  return String((rows[0] as { value?: string } | undefined)?.value ?? '')
}

async function writeVillaSiteContent(
  sql: NeonQueryFunction<false, false>,
  slug: string,
  blockKey: string,
  value: string,
) {
  const key = siteContentKey(slug, blockKey)
  await sql`
    INSERT INTO site_content (key, value, updated_at)
    VALUES (${key}, ${value}, now())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
  `
}

async function readVillaField(
  sql: NeonQueryFunction<false, false>,
  slug: string,
  blockKey: string,
): Promise<string> {
  const rows = await sql`
    SELECT name, description, price_idr, bedrooms, bathrooms, size_m2, images
    FROM villas WHERE slug = ${slug} LIMIT 1
  `
  const row = rows[0] as VillaRow | undefined
  if (!row) return ''
  const images = Array.isArray(row.images) ? row.images : []
  switch (blockKey) {
    case 'villa.name':
      return row.name ?? ''
    case 'villa.description':
      return row.description ?? ''
    case 'villa.price_idr':
      return String(row.price_idr ?? 0)
    case 'villa.bedrooms':
      return String(row.bedrooms ?? 0)
    case 'villa.bathrooms':
      return String(row.bathrooms ?? 0)
    case 'villa.size_m2':
      return String(row.size_m2 ?? 0)
    case 'villa.hero_image':
      return images[0] ?? ''
    case 'villa.hero_image.alt': {
      const custom = await readVillaSiteContent(sql, slug, blockKey)
      return custom || row.name || ''
    }
    case 'villa.gallery_urls':
      return images.slice(1).join('\n')
    default:
      return readVillaSiteContent(sql, slug, blockKey)
  }
}

async function writeVillaBlock(
  sql: NeonQueryFunction<false, false>,
  slug: string,
  blockKey: string,
  value: string,
) {
  const rows = await sql`
    SELECT name, description, price_idr, bedrooms, bathrooms, size_m2, images
    FROM villas WHERE slug = ${slug} LIMIT 1
  `
  let row = rows[0] as VillaRow | undefined
  if (!row) {
    await sql`
      INSERT INTO villas (slug, name, description, price_idr, bedrooms, bathrooms, size_m2, images)
      VALUES (${slug}, '', '', 0, 0, 0, 0, '{}')
    `
    const again = await sql`
      SELECT name, description, price_idr, bedrooms, bathrooms, size_m2, images
      FROM villas WHERE slug = ${slug} LIMIT 1
    `
    row = again[0] as VillaRow | undefined
  }
  if (!row) return

  const images = Array.isArray(row.images) ? [...row.images] : []
  let name = row.name ?? ''
  let description = row.description ?? ''
  let priceIdr = Number(row.price_idr) || 0
  let bedrooms = Number(row.bedrooms) || 0
  let bathrooms = Number(row.bathrooms) || 0
  let sizeM2 = Number(row.size_m2) || 0

  switch (blockKey) {
    case 'villa.name':
      name = value
      break
    case 'villa.description':
      description = value
      break
    case 'villa.price_idr':
      priceIdr = Number.parseInt(value, 10) || 0
      break
    case 'villa.bedrooms':
      bedrooms = Number.parseInt(value, 10) || 0
      break
    case 'villa.bathrooms':
      bathrooms = Number.parseInt(value, 10) || 0
      break
    case 'villa.size_m2':
      sizeM2 = Number.parseInt(value, 10) || 0
      break
    case 'villa.hero_image':
      if (images.length === 0) images.push(value)
      else images[0] = value
      break
    case 'villa.hero_image.alt':
      await writeVillaSiteContent(sql, slug, blockKey, value)
      break
    case 'villa.gallery_urls': {
      const gallery = value
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
      const hero = images[0] ?? ''
      images.length = 0
      if (hero) images.push(hero)
      images.push(...gallery)
      break
    }
    default:
      await writeVillaSiteContent(sql, slug, blockKey, value)
      return
  }

  await sql`
    UPDATE villas SET
      name = ${name},
      description = ${description},
      price_idr = ${priceIdr},
      bedrooms = ${bedrooms},
      bathrooms = ${bathrooms},
      size_m2 = ${sizeM2},
      images = ${images},
      updated_at = now()
    WHERE slug = ${slug}
  `
}

export async function readBlockValue(
  sql: NeonQueryFunction<false, false>,
  pageSlug: string,
  blockKey: string,
): Promise<string> {
  const { locale, logicalKey } = parseStorageBlockKey(blockKey)

  if (isSharedCmsBlockKey(logicalKey)) {
    if (isVillaPageSlug(pageSlug) && logicalKey.startsWith('villa.')) {
      return readVillaField(sql, pageSlug, logicalKey)
    }
    const rows = await sql`
      SELECT value FROM site_content WHERE key = ${siteContentKey(pageSlug, logicalKey)} LIMIT 1
    `
    return String((rows[0] as { value?: string } | undefined)?.value ?? '')
  }

  if (isVillaPageSlug(pageSlug)) {
    if (locale === 'id') {
      return readVillaSiteContent(sql, pageSlug, blockKey)
    }
    return readVillaField(sql, pageSlug, logicalKey)
  }

  const loc = locale ?? 'en'
  const keysToTry = loc === 'en' ? [blockKey, logicalKey] : [blockKey]
  for (const key of keysToTry) {
    const rows = await sql`
      SELECT value FROM site_content WHERE key = ${siteContentKey(pageSlug, key)} LIMIT 1
    `
    const value = (rows[0] as { value?: string } | undefined)?.value
    if (value !== undefined) return String(value)
  }
  return ''
}

export async function writeContentBlocks(
  sql: NeonQueryFunction<false, false>,
  blocks: ContentBlockUpsertInput[],
) {
  if (blocks.length === 0) return
  await ensureCmsTables(sql)

  type SqlTxn = NeonQueryFunction<false, false> & {
    transaction: (
      queriesOrFn:
        | NeonQueryFunction<false, false>[]
        | ((tx: NeonQueryFunction<false, false>) => NeonQueryFunction<false, false>[]),
    ) => Promise<unknown>
  }

  const sqlTxn = sql as SqlTxn
  const siteBlocks = blocks.filter((b) => !isVillaPageSlug(b.pageSlug))
  const villaBlocksBySlug = new Map<string, ContentBlockUpsertInput[]>()
  for (const block of blocks) {
    if (!isVillaPageSlug(block.pageSlug)) continue
    const list = villaBlocksBySlug.get(block.pageSlug) ?? []
    list.push(block)
    villaBlocksBySlug.set(block.pageSlug, list)
  }

  const historyInserts: { contentKey: string; oldValue: string; newValue: string }[] = []
  const villaWrites: {
    slug: string
    state: VillaWriteState
    siteKeys: string[]
    siteValues: string[]
  }[] = []

  let siteUpsertKeys: string[] = []
  let siteUpsertValues: string[] = []

  if (siteBlocks.length > 0) {
    siteUpsertKeys = siteBlocks.map((b) => siteContentKey(b.pageSlug, b.blockKey))
    siteUpsertValues = siteBlocks.map((b) => b.value)
    const existingRows = await sql`
      SELECT key, value FROM site_content WHERE key = ANY(${siteUpsertKeys})
    `
    const oldSiteValues = new Map<string, string>()
    for (const row of existingRows as { key: string; value: string }[]) {
      oldSiteValues.set(row.key, row.value ?? '')
    }

    for (const block of siteBlocks) {
      const key = siteContentKey(block.pageSlug, block.blockKey)
      const oldValue = oldSiteValues.get(key) ?? ''
      if (shouldRecordHistory(oldValue, block.value)) {
        historyInserts.push({
          contentKey: makeContentKey(block.pageSlug, block.blockKey),
          oldValue,
          newValue: block.value,
        })
      }
    }
  }

  for (const [slug, slugBlocks] of villaBlocksBySlug) {
    const villaBatch = await prepareVillaBlocksBatch(sql, slug, slugBlocks)
    historyInserts.push(...villaBatch.history)
    villaWrites.push({
      slug,
      state: villaBatch.state,
      siteKeys: villaBatch.siteKeys,
      siteValues: villaBatch.siteValues,
    })
  }

  const hasWrites =
    siteUpsertKeys.length > 0 || villaWrites.length > 0 || historyInserts.length > 0
  if (!hasWrites) return

  await sqlTxn.transaction((tx) => {
    const queries = []

    if (siteUpsertKeys.length > 0) {
      queries.push(tx`
        INSERT INTO site_content (key, value, updated_at)
        SELECT k, v, now()
        FROM UNNEST(${siteUpsertKeys}::text[], ${siteUpsertValues}::text[]) AS data(k, v)
        ON CONFLICT (key) DO UPDATE SET
          value = EXCLUDED.value,
          updated_at = now()
      `)
    }

    for (const villa of villaWrites) {
      const { slug, state, siteKeys, siteValues } = villa
      queries.push(tx`
        UPDATE villas SET
          name = ${state.name},
          description = ${state.description},
          price_idr = ${state.priceIdr},
          bedrooms = ${state.bedrooms},
          bathrooms = ${state.bathrooms},
          size_m2 = ${state.sizeM2},
          images = ${state.images},
          updated_at = now()
        WHERE slug = ${slug}
      `)
      if (siteKeys.length > 0) {
        queries.push(tx`
          INSERT INTO site_content (key, value, updated_at)
          SELECT k, v, now()
          FROM UNNEST(${siteKeys}::text[], ${siteValues}::text[]) AS data(k, v)
          ON CONFLICT (key) DO UPDATE SET
            value = EXCLUDED.value,
            updated_at = now()
        `)
      }
    }

    if (historyInserts.length > 0) {
      const contentKeys = historyInserts.map((h) => h.contentKey)
      const oldVals = historyInserts.map((h) => h.oldValue)
      const newVals = historyInserts.map((h) => h.newValue)
      queries.push(tx`
        INSERT INTO content_history (content_key, old_value, new_value, changed_at)
        SELECT k, o, n, now()
        FROM UNNEST(${contentKeys}::text[], ${oldVals}::text[], ${newVals}::text[]) AS data(k, o, n)
      `)
    }

    return queries
  })
}

function shouldRecordHistory(oldValue: string, newValue: string): boolean {
  if (oldValue === newValue) return false
  if (oldValue === '' && newValue === '') return false
  return true
}

type VillaWriteState = {
  name: string
  description: string
  priceIdr: number
  bedrooms: number
  bathrooms: number
  sizeM2: number
  images: string[]
}

function villaStateFromRow(row: VillaRow): VillaWriteState {
  return {
    name: row.name ?? '',
    description: row.description ?? '',
    priceIdr: Number(row.price_idr) || 0,
    bedrooms: Number(row.bedrooms) || 0,
    bathrooms: Number(row.bathrooms) || 0,
    sizeM2: Number(row.size_m2) || 0,
    images: Array.isArray(row.images) ? [...row.images] : [],
  }
}

function villaFieldOldValue(
  state: VillaWriteState,
  siteValues: Map<string, string>,
  slug: string,
  blockKey: string,
): string {
  switch (blockKey) {
    case 'villa.name':
      return state.name
    case 'villa.description':
      return state.description
    case 'villa.price_idr':
      return String(state.priceIdr)
    case 'villa.bedrooms':
      return String(state.bedrooms)
    case 'villa.bathrooms':
      return String(state.bathrooms)
    case 'villa.size_m2':
      return String(state.sizeM2)
    case 'villa.hero_image':
      return state.images[0] ?? ''
    case 'villa.hero_image.alt': {
      const custom = siteValues.get(siteContentKey(slug, blockKey)) ?? ''
      return custom || state.name || ''
    }
    case 'villa.gallery_urls':
      return state.images.slice(1).join('\n')
    default:
      return siteValues.get(siteContentKey(slug, blockKey)) ?? ''
  }
}

function applyVillaBlockChange(
  state: VillaWriteState,
  blockKey: string,
  value: string,
): { siteKey?: string; siteValue?: string } {
  switch (blockKey) {
    case 'villa.name':
      state.name = value
      return {}
    case 'villa.description':
      state.description = value
      return {}
    case 'villa.price_idr':
      state.priceIdr = Number.parseInt(value, 10) || 0
      return {}
    case 'villa.bedrooms':
      state.bedrooms = Number.parseInt(value, 10) || 0
      return {}
    case 'villa.bathrooms':
      state.bathrooms = Number.parseInt(value, 10) || 0
      return {}
    case 'villa.size_m2':
      state.sizeM2 = Number.parseInt(value, 10) || 0
      return {}
    case 'villa.hero_image':
      if (state.images.length === 0) state.images.push(value)
      else state.images[0] = value
      return {}
    case 'villa.gallery_urls': {
      const gallery = value
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
      const hero = state.images[0] ?? ''
      state.images.length = 0
      if (hero) state.images.push(hero)
      state.images.push(...gallery)
      return {}
    }
    default:
      return { siteKey: blockKey, siteValue: value }
  }
}

async function prepareVillaBlocksBatch(
  sql: NeonQueryFunction<false, false>,
  slug: string,
  blocks: ContentBlockUpsertInput[],
): Promise<{
  history: { contentKey: string; oldValue: string; newValue: string }[]
  state: VillaWriteState
  siteKeys: string[]
  siteValues: string[]
}> {
  if (blocks.length === 0) {
    return {
      history: [],
      state: {
        name: '',
        description: '',
        priceIdr: 0,
        bedrooms: 0,
        bathrooms: 0,
        sizeM2: 0,
        images: [],
      },
      siteKeys: [],
      siteValues: [],
    }
  }

  let rows = await sql`
    SELECT name, description, price_idr, bedrooms, bathrooms, size_m2, images
    FROM villas WHERE slug = ${slug} LIMIT 1
  `
  let row = rows[0] as VillaRow | undefined
  if (!row) {
    await sql`
      INSERT INTO villas (slug, name, description, price_idr, bedrooms, bathrooms, size_m2, images)
      VALUES (${slug}, '', '', 0, 0, 0, 0, '{}')
    `
    rows = await sql`
      SELECT name, description, price_idr, bedrooms, bathrooms, size_m2, images
      FROM villas WHERE slug = ${slug} LIMIT 1
    `
    row = rows[0] as VillaRow | undefined
  }
  if (!row) {
    return {
      history: [],
      state: villaStateFromRow({
        slug,
        name: '',
        description: '',
        price_idr: 0,
        bedrooms: 0,
        bathrooms: 0,
        size_m2: 0,
        images: [],
        updated_at: new Date(),
      }),
      siteKeys: [],
      siteValues: [],
    }
  }

  const prefix = `${slug}.`
  const siteRows = await sql`
    SELECT key, value FROM site_content WHERE key LIKE ${prefix + '%'}
  `
  const siteValueMap = new Map<string, string>()
  for (const siteRow of siteRows as { key: string; value: string }[]) {
    siteValueMap.set(siteRow.key, siteRow.value ?? '')
  }

  const state = villaStateFromRow(row)
  const history: { contentKey: string; oldValue: string; newValue: string }[] = []
  const siteUpserts: { key: string; value: string }[] = []

  for (const block of blocks) {
    const { locale, logicalKey } = parseStorageBlockKey(block.blockKey)

    if (isSharedCmsBlockKey(logicalKey)) {
      const oldValue = logicalKey.startsWith('villa.')
        ? villaFieldOldValue(state, siteValueMap, slug, logicalKey)
        : (siteValueMap.get(siteContentKey(slug, logicalKey)) ?? '')
      if (shouldRecordHistory(oldValue, block.value)) {
        history.push({
          contentKey: makeContentKey(slug, logicalKey),
          oldValue,
          newValue: block.value,
        })
      }
      if (logicalKey.startsWith('villa.')) {
        const siteWrite = applyVillaBlockChange(state, logicalKey, block.value)
        if (siteWrite.siteKey) {
          const key = siteContentKey(slug, storageBlockKey('en', siteWrite.siteKey))
          siteUpserts.push({ key, value: siteWrite.siteValue ?? '' })
          siteValueMap.set(key, siteWrite.siteValue ?? '')
        }
      } else {
        const key = siteContentKey(slug, logicalKey)
        siteUpserts.push({ key, value: block.value })
        siteValueMap.set(key, block.value)
      }
      continue
    }

    if (locale === 'id') {
      const key = siteContentKey(slug, block.blockKey)
      const oldValue = siteValueMap.get(key) ?? ''
      if (shouldRecordHistory(oldValue, block.value)) {
        history.push({
          contentKey: makeContentKey(slug, block.blockKey),
          oldValue,
          newValue: block.value,
        })
      }
      siteUpserts.push({ key, value: block.value })
      siteValueMap.set(key, block.value)
      continue
    }

    const oldValue = villaFieldOldValue(state, siteValueMap, slug, logicalKey)
    if (shouldRecordHistory(oldValue, block.value)) {
      history.push({
        contentKey: makeContentKey(slug, block.blockKey),
        oldValue,
        newValue: block.value,
      })
    }

    const siteWrite = applyVillaBlockChange(state, logicalKey, block.value)
    if (siteWrite.siteKey) {
      const storageKey = storageBlockKey('en', siteWrite.siteKey)
      const key = siteContentKey(slug, storageKey)
      siteUpserts.push({ key, value: siteWrite.siteValue ?? '' })
      siteValueMap.set(key, siteWrite.siteValue ?? '')
    }
  }

  const siteKeys = siteUpserts.map((u) => u.key)
  const siteValues = siteUpserts.map((u) => u.value)

  return { history, state, siteKeys, siteValues }
}

export { parseContentKey }
