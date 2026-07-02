/** Keys stored once for all languages (images, prices, contact values, social URLs, etc.). */
export function isSharedCmsBlockKey(logicalKey: string): boolean {
  if (logicalKey.endsWith('.alt')) return false

  if (logicalKey.endsWith('.pos') || logicalKey.endsWith('.zoom')) return true

  if (logicalKey.endsWith('.image')) return true
  if (logicalKey.endsWith('.hero_image')) return true
  if (logicalKey.endsWith('.gallery_urls')) return true
  if (/\.gallery\.\d+$/.test(logicalKey)) return true
  if (logicalKey === 'partner.logo') return true

  if (logicalKey.endsWith('.video_url') || logicalKey.endsWith('.video')) return true
  if (logicalKey.endsWith('.imageUrl') || logicalKey.endsWith('.image_url')) return true

  if (logicalKey === 'villa.price_idr') return true
  if (/^cards\.[^.]+\.price$/.test(logicalKey)) return true

  if (logicalKey === 'map.embed_url' || logicalKey === 'map.address') return true

  if (
    logicalKey === 'footer.phone' ||
    logicalKey === 'footer.email' ||
    logicalKey === 'footer.address'
  ) {
    return true
  }
  if (
    logicalKey === 'contact.phone' ||
    logicalKey === 'contact.email' ||
    logicalKey === 'contact.address'
  ) {
    return true
  }

  if (/^footer\.social\./.test(logicalKey) && logicalKey.endsWith('.url')) return true

  return false
}
