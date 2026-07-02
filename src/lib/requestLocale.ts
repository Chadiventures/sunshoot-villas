import { cookies } from 'next/headers'
import { parseCmsLocale, type CmsLocale } from '@/lib/cmsLocale'
import { LANGUAGE_STORAGE_KEY } from '@/lib/translations'

export async function getRequestLocale(): Promise<CmsLocale> {
  const cookieStore = await cookies()
  const fromCookie = cookieStore.get(LANGUAGE_STORAGE_KEY)?.value
  return parseCmsLocale(fromCookie)
}
