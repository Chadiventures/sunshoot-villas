const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp'])

export function isValidImageUploadFile(file: File | undefined): file is File {
  if (!file || file.size === 0) return false
  if (file.size > 10 * 1024 * 1024) return false
  const type = file.type.trim().toLowerCase()
  return ALLOWED.has(type) || type === ''
}
