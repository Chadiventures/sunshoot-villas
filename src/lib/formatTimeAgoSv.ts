export function formatTimeAgoSv(iso: string): string {
  const then = new Date(iso).getTime()
  const diff = Date.now() - then
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

export function truncatePreview(value: string, max = 80): string {
  const t = value.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t || '(empty)'
  return `${t.slice(0, max)}…`
}
