const DEFAULT_ADMIN_PATH = 'admin-sunshoot'

function normalizeBase(raw: string | undefined): string {
  const base = raw?.trim() || `/${DEFAULT_ADMIN_PATH}`
  return base.startsWith('/') ? base : `/${base}`
}

export function adminPublicPath(subpath = ''): string {
  const base =
    typeof window !== 'undefined'
      ? normalizeBase(process.env.NEXT_PUBLIC_ADMIN_PATH)
      : normalizeBase(process.env.ADMIN_PATH)
  if (!subpath) return base
  const suffix = subpath.startsWith('/') ? subpath : `/${subpath}`
  return `${base}${suffix}`
}

export function adminPathSegment(): string {
  const base =
    typeof window !== 'undefined'
      ? normalizeBase(process.env.NEXT_PUBLIC_ADMIN_PATH)
      : normalizeBase(process.env.ADMIN_PATH)
  return base.replace(/^\//, '') || DEFAULT_ADMIN_PATH
}

export function siteName(): string {
  return process.env.SITE_NAME?.trim() || 'Sun Shoot Villas'
}
