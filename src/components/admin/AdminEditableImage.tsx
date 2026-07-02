'use client'

import {
  forwardRef,
  useCallback,
  useContext,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { AdminCoreContext, useAdminContent } from '@/hooks/useAdminContent'
import {
  buildImageInlineStyle,
  DEFAULT_IMAGE_OBJECT_POSITION,
  DEFAULT_IMAGE_ZOOM,
  imagePosKey,
  imageZoomKey,
} from '@/lib/imageBlockMeta'
import { IMAGE_UPLOAD_PLACEHOLDER, resolveImageDisplayUrl } from '@/lib/resolveImageDisplayUrl'

export type StaticImageProps = {
  src: string
  alt: string
  className: string
  style?: CSSProperties
}

type AdminEditableImageProps = {
  imageBlockKey: string
  altBlockKey: string
  className: string
  /** Used when CMS image URL is missing or empty. */
  fallbackSrc?: string
  renderStaticImage?: (props: StaticImageProps) => ReactNode
}

export type AdminEditableImageHandle = {
  openEditor: () => void
}

export const AdminEditableImage = forwardRef<AdminEditableImageHandle, AdminEditableImageProps>(
  function AdminEditableImage(
    { imageBlockKey, altBlockKey, className, fallbackSrc, renderStaticImage },
    _ref,
  ) {
    const core = useContext(AdminCoreContext)
    const { pageSlug, getText, getImageSrc } = useAdminContent()
    void core?.contentRevision
    const alt = getText(altBlockKey)
    const draftSrc = getImageSrc(imageBlockKey)
    const liveSrc = draftSrc.trim()
      ? resolveImageDisplayUrl(draftSrc)
      : fallbackSrc?.trim() || IMAGE_UPLOAD_PLACEHOLDER
    const objectPosition = getText(imagePosKey(imageBlockKey)) || DEFAULT_IMAGE_OBJECT_POSITION
    const zoomRaw = getText(imageZoomKey(imageBlockKey)) || DEFAULT_IMAGE_ZOOM
    const imageStyle = buildImageInlineStyle(objectPosition, zoomRaw)
    const isFocused =
      Boolean(core?.adminMode) &&
      core?.focusedField?.pageSlug === pageSlug &&
      (core?.focusedField?.blockKey === imageBlockKey ||
        core?.focusedField?.blockKey === altBlockKey)
    const focusOutline: CSSProperties | undefined = isFocused
      ? { outline: '2px solid #c9a84c', outlineOffset: '2px' }
      : undefined

    const handleDoubleClick = useCallback(
      (e: MouseEvent<HTMLElement>) => {
        if (!core?.adminMode || !core.authenticated) return
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        core.focusPanelField(pageSlug, imageBlockKey)
      },
      [core, imageBlockKey, pageSlug],
    )

    const props: StaticImageProps = {
      src: liveSrc,
      alt,
      className,
      style: imageStyle,
    }

    const imgNode = renderStaticImage ? (
      renderStaticImage(props)
    ) : (
      <img src={liveSrc} alt={alt} className={className} style={imageStyle} draggable={false} />
    )

    return (
      <div
        className="relative h-full w-full"
        data-page-slug={pageSlug}
        data-block-key={imageBlockKey}
        data-alt-block-key={altBlockKey}
        onDoubleClick={handleDoubleClick}
        style={focusOutline}
      >
        {imgNode}
      </div>
    )
  },
)
