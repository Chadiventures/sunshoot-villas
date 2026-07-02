export const IMAGE_UPLOAD_PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225"%3E%3Crect fill="%23e8e8e8" width="400" height="225"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="14"%3ENo image%3C/text%3E%3C/svg%3E'

export function resolveImageDisplayUrl(value: string): string {
  const v = value.trim()
  if (!v) return IMAGE_UPLOAD_PLACEHOLDER
  if (v.startsWith('/api/uploads/')) return v
  if (v.startsWith('http://') || v.startsWith('https://') || v.startsWith('data:')) return v
  return v
}
