import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSessionFromRequest } from '@/lib/verifyAdminSession'

export async function GET(req: NextRequest) {
  const userId = verifyAdminSessionFromRequest(req)
  if (!userId) {
    return NextResponse.json({ error: 'Ej inloggad' }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}
