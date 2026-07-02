import type { CSSProperties } from 'react'

export const DEFAULT_IMAGE_OBJECT_POSITION = '50% 50%'
export const DEFAULT_IMAGE_ZOOM = '100'
export const ZOOM_STEP = 5

export function imagePosKey(imageBlockKey: string): string {
  return `${imageBlockKey}.pos`
}

export function imageZoomKey(imageBlockKey: string): string {
  return `${imageBlockKey}.zoom`
}

export function parseObjectPosition(value: string): { x: number; y: number } {
  const parts = value.trim().split(/\s+/)
  const x = Number.parseFloat(parts[0]?.replace('%', '') ?? '50')
  const y = Number.parseFloat(parts[1]?.replace('%', '') ?? parts[0]?.replace('%', '') ?? '50')
  return {
    x: Number.isFinite(x) ? x : 50,
    y: Number.isFinite(y) ? y : 50,
  }
}

export function formatObjectPosition(x: number, y: number): string {
  return `${Math.round(x)}% ${Math.round(y)}%`
}

export function parseZoomPercent(value: string): number {
  const n = Number.parseFloat(value.replace('%', '').trim())
  return Number.isFinite(n) && n > 0 ? n : 100
}

export function adjustZoom(current: number, delta: number): number {
  return Math.min(200, Math.max(50, current + delta))
}

export function buildImageInlineStyle(
  objectPosition: string,
  zoomRaw: string,
): CSSProperties {
  const zoom = parseZoomPercent(zoomRaw)
  const scale = zoom / 100
  return {
    objectPosition: objectPosition || DEFAULT_IMAGE_OBJECT_POSITION,
    transform: scale !== 1 ? `scale(${scale})` : undefined,
  }
}
