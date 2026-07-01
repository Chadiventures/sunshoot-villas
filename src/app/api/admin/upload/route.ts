/**
 * CMS image upload — local filesystem (public/uploads).
 */
import { randomUUID } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { verifyAdminSessionFromRequest } from '@/lib/verifyAdminSession'

const MAX_BYTES = 10 * 1024 * 1024

type ImageExt = 'jpg' | 'png' | 'webp'

function mimeMatchesMagic(mime: string, ext: ImageExt): boolean {
  if (mime === '' || mime === 'application/octet-stream') return true
  if (ext === 'jpg') return mime === 'image/jpeg'
  if (ext === 'png') return mime === 'image/png'
  if (ext === 'webp') return mime === 'image/webp'
  return false
}

function detectImageFormat(buf: Buffer): ImageExt | null {
  if (buf.length < 12) return null
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg'
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return 'png'
  }
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  ) {
    return 'webp'
  }
  return null
}

async function uploadToLocal(raw: Buffer, ext: ImageExt): Promise<string> {
  const dir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(dir, { recursive: true })
  const name = `${randomUUID()}.${ext}`
  await writeFile(path.join(dir, name), raw)
  const url = `/api/uploads/${name}`
  console.log('[admin/upload] local', { url, bytes: raw.length })
  return url
}

export async function POST(req: NextRequest) {
  if (!verifyAdminSessionFromRequest(req)) {
    return NextResponse.json({ error: 'Ej inloggad' }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Ogiltig begäran' }, { status: 400 })
  }

  const fileEntry = formData.get('file')
  if (!(fileEntry instanceof File)) {
    return NextResponse.json({ error: 'Saknad fil' }, { status: 400 })
  }

  if (fileEntry.size === 0 || fileEntry.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Filen är för stor eller tom' }, { status: 400 })
  }

  const raw = Buffer.from(await fileEntry.arrayBuffer())
  const ext = detectImageFormat(raw)
  if (ext === null) {
    return NextResponse.json({ error: 'Endast JPG, PNG eller WEBP tillåts' }, { status: 400 })
  }

  const mime = typeof fileEntry.type === 'string' ? fileEntry.type.trim() : ''
  if (!mimeMatchesMagic(mime, ext)) {
    return NextResponse.json({ error: 'Filtyp stämmer inte med innehållet' }, { status: 400 })
  }

  try {
    const url = await uploadToLocal(raw, ext)
    return NextResponse.json({ url })
  } catch (err) {
    console.error('[admin/upload] failed', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
