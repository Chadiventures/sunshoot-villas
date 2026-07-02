'use client'

import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent,
} from 'react'
import { AdminBlockPage } from '@/components/admin/AdminProvider'
import { AdminCoreContext, useAdminContent } from '@/hooks/useAdminContent'
import { useAdminImageEditor } from '@/lib/adminImageEditorContext'
import {
  adjustZoom,
  buildImageInlineStyle,
  DEFAULT_IMAGE_OBJECT_POSITION,
  DEFAULT_IMAGE_ZOOM,
  formatObjectPosition,
  imagePosKey,
  imageZoomKey,
  parseObjectPosition,
  parseZoomPercent,
  ZOOM_STEP,
} from '@/lib/imageBlockMeta'
import { isValidImageUploadFile } from '@/lib/isValidImageUploadFile'
import { IMAGE_UPLOAD_PLACEHOLDER } from '@/lib/resolveImageDisplayUrl'

const CROP_FRAME_MAX_WIDTH = 420

type ModalView = 'menu' | 'crop'

function stopNativeEvent(e: Event) {
  e.stopPropagation()
  e.stopImmediatePropagation()
  e.preventDefault()
}

function AdminImageEditorModalInner() {
  const { state, closeImageEditor } = useAdminImageEditor()
  const { getImageSrc, getText, updateText, updateImage, imageError, clearImageError } =
    useAdminContent()

  const open = state.open
  const imageBlockKey = state.imageBlockKey!
  const posKey = imagePosKey(imageBlockKey)
  const zoomKey = imageZoomKey(imageBlockKey)

  const [view, setView] = useState<ModalView>('menu')
  const [localError, setLocalError] = useState<string | null>(null)
  const [cropPos, setCropPos] = useState({ x: 50, y: 50 })
  const [cropZoom, setCropZoom] = useState(100)

  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const uploadBtnRef = useRef<HTMLButtonElement>(null)
  const adjustBtnRef = useRef<HTMLButtonElement>(null)
  const cancelBtnRef = useRef<HTMLButtonElement>(null)
  const zoomOutBtnRef = useRef<HTMLButtonElement>(null)
  const zoomInBtnRef = useRef<HTMLButtonElement>(null)
  const saveCropBtnRef = useRef<HTMLButtonElement>(null)
  const cancelCropBtnRef = useRef<HTMLButtonElement>(null)
  const cropDragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(
    null,
  )

  const liveSrc = getImageSrc(imageBlockKey) || IMAGE_UPLOAD_PLACEHOLDER
  const displayError = localError ?? imageError

  const resetCropDraft = useCallback(() => {
    const { x, y } = parseObjectPosition(getText(posKey) || DEFAULT_IMAGE_OBJECT_POSITION)
    setCropPos({ x, y })
    setCropZoom(parseZoomPercent(getText(zoomKey) || DEFAULT_IMAGE_ZOOM))
  }, [getText, posKey, zoomKey])

  const handleClose = useCallback(() => {
    setView('menu')
    setLocalError(null)
    closeImageEditor()
  }, [closeImageEditor])

  const openCropView = useCallback(() => {
    resetCropDraft()
    setView('crop')
  }, [resetCropDraft])

  useEffect(() => {
    const el = modalRef.current
    if (!el || !open) return
    const stopClick = (e: Event) => {
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
    el.addEventListener('click', stopClick, true)
    el.addEventListener('click', stopClick, false)
    return () => {
      el.removeEventListener('click', stopClick, true)
      el.removeEventListener('click', stopClick, false)
    }
  }, [open, view])

  useEffect(() => {
    const el = backdropRef.current
    if (!el || !open) return
    const onBackdropMouseDown = (e: Event) => {
      stopNativeEvent(e)
      handleClose()
    }
    el.addEventListener('mousedown', onBackdropMouseDown)
    return () => {
      el.removeEventListener('mousedown', onBackdropMouseDown)
    }
  }, [open, view, handleClose])

  useEffect(() => {
    if (!open || view !== 'menu') return

    const upload = uploadBtnRef.current
    const adjust = adjustBtnRef.current
    const cancel = cancelBtnRef.current
    if (!upload || !adjust || !cancel) return

    const onUpload = (e: Event) => {
      stopNativeEvent(e)
      fileRef.current?.click()
    }
    const onAdjust = (e: Event) => {
      stopNativeEvent(e)
      openCropView()
    }
    const onCancel = (e: Event) => {
      stopNativeEvent(e)
      handleClose()
    }

    upload.addEventListener('mousedown', onUpload)
    adjust.addEventListener('mousedown', onAdjust)
    cancel.addEventListener('mousedown', onCancel)

    return () => {
      upload.removeEventListener('mousedown', onUpload)
      adjust.removeEventListener('mousedown', onAdjust)
      cancel.removeEventListener('mousedown', onCancel)
    }
  }, [open, view, openCropView, handleClose])

  const saveCrop = useCallback(() => {
    updateText(posKey, formatObjectPosition(cropPos.x, cropPos.y))
    updateText(zoomKey, String(cropZoom))
    handleClose()
  }, [cropPos.x, cropPos.y, cropZoom, handleClose, posKey, updateText, zoomKey])

  useEffect(() => {
    if (!open || view !== 'crop') return

    const zoomOut = zoomOutBtnRef.current
    const zoomIn = zoomInBtnRef.current
    const saveBtn = saveCropBtnRef.current
    const cancelCrop = cancelCropBtnRef.current
    if (!zoomOut || !zoomIn || !saveBtn || !cancelCrop) return

    const onZoomOut = (e: Event) => {
      stopNativeEvent(e)
      setCropZoom((z) => adjustZoom(z, -ZOOM_STEP))
    }
    const onZoomIn = (e: Event) => {
      stopNativeEvent(e)
      setCropZoom((z) => adjustZoom(z, ZOOM_STEP))
    }
    const onSave = (e: Event) => {
      stopNativeEvent(e)
      saveCrop()
    }
    const onCancel = (e: Event) => {
      stopNativeEvent(e)
      handleClose()
    }

    zoomOut.addEventListener('mousedown', onZoomOut)
    zoomIn.addEventListener('mousedown', onZoomIn)
    saveBtn.addEventListener('mousedown', onSave)
    cancelCrop.addEventListener('mousedown', onCancel)

    return () => {
      zoomOut.removeEventListener('mousedown', onZoomOut)
      zoomIn.removeEventListener('mousedown', onZoomIn)
      saveBtn.removeEventListener('mousedown', onSave)
      cancelCrop.removeEventListener('mousedown', onCancel)
    }
  }, [open, view, saveCrop, handleClose])

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file || !isValidImageUploadFile(file)) return

      setLocalError(null)
      clearImageError()
      const ok = await updateImage(imageBlockKey, file)
      if (!ok) {
        setLocalError('Could not select image')
        return
      }
      handleClose()
    },
    [clearImageError, handleClose, imageBlockKey, updateImage],
  )

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const file = input.files?.[0]
    if (!isValidImageUploadFile(file)) return
    await handleFile(file)
    input.value = ''
  }

  const onCropPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      e.currentTarget.setPointerCapture(e.pointerId)
      cropDragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        posX: cropPos.x,
        posY: cropPos.y,
      }
    },
    [cropPos.x, cropPos.y],
  )

  const onCropPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!cropDragRef.current) return
    const frame = e.currentTarget
    const w = frame.offsetWidth || 1
    const h = frame.offsetHeight || 1
    const dx = e.clientX - cropDragRef.current.startX
    const dy = e.clientY - cropDragRef.current.startY
    const sensitivity = 0.35
    const nextX = cropDragRef.current.posX - (dx / w) * 100 * sensitivity
    const nextY = cropDragRef.current.posY - (dy / h) * 100 * sensitivity
    setCropPos({
      x: Math.min(100, Math.max(0, nextX)),
      y: Math.min(100, Math.max(0, nextY)),
    })
  }, [])

  const onCropPointerUp = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (cropDragRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        /* already released */
      }
    }
    cropDragRef.current = null
  }, [])

  const cropPreviewStyle = buildImageInlineStyle(
    formatObjectPosition(cropPos.x, cropPos.y),
    String(cropZoom),
  )

  const cropFrameWidth = CROP_FRAME_MAX_WIDTH
  const cropFrameHeight = Math.round(cropFrameWidth / state.cropAspectRatio)

  if (view === 'crop') {
    return (
      <div className="fixed inset-0 z-[110]">
        <div
          ref={backdropRef}
          className="absolute inset-0 z-[1] cursor-default bg-navy/80"
          aria-hidden
        />
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-5 overflow-y-auto px-4 py-8 pointer-events-none">
          <div
            ref={modalRef}
            className="pointer-events-auto w-full max-w-lg rounded-lg border border-gold/40 bg-pearl p-5 shadow-xl"
          >
            <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.3em] text-navy">
              Adjust image
            </p>
            <p className="mb-4 font-sans text-sm text-charcoal/65">
              Drag the image in the frame to choose a crop. Zoom in or out as needed.
            </p>
            <div className="relative mx-auto flex justify-center overflow-hidden py-6">
              <div
                className="relative cursor-grab overflow-hidden bg-charcoal/20 active:cursor-grabbing"
                style={{
                  width: cropFrameWidth,
                  height: cropFrameHeight,
                  boxShadow: '0 0 0 9999px rgba(15, 32, 68, 0.55)',
                }}
                onPointerDown={onCropPointerDown}
                onPointerMove={onCropPointerMove}
                onPointerUp={onCropPointerUp}
                onPointerCancel={onCropPointerUp}
              >
                <img
                  src={liveSrc}
                  alt=""
                  className="pointer-events-none h-full w-full select-none"
                  style={cropPreviewStyle}
                  draggable={false}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                ref={zoomOutBtnRef}
                type="button"
                className="min-h-[44px] border border-silver px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-navy transition-colors hover:border-gold"
              >
                Zoom out
              </button>
              <span className="flex min-h-[44px] items-center px-2 font-sans text-sm text-charcoal/70">
                {cropZoom}%
              </span>
              <button
                ref={zoomInBtnRef}
                type="button"
                className="min-h-[44px] border border-silver px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-navy transition-colors hover:border-gold"
              >
                Zoom in
              </button>
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                ref={saveCropBtnRef}
                type="button"
                className="min-h-[44px] flex-1 border border-gold bg-gold px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-white transition-colors hover:bg-navy"
              >
                Save
              </button>
              <button
                ref={cancelCropBtnRef}
                type="button"
                className="min-h-[44px] flex-1 border border-silver px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-navy transition-colors hover:border-gold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        ref={backdropRef}
        className="absolute inset-0 z-[1] cursor-default bg-transparent"
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
        <div
          ref={modalRef}
          className="pointer-events-auto relative z-[2] w-full max-w-xs rounded-lg border border-gold/40 bg-pearl p-4 shadow-xl"
          role="menu"
          aria-label="Image options"
        >
          <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.3em] text-navy">Image</p>
          {displayError && (
            <p className="mb-3 font-sans text-sm text-red-700" role="alert">
              {displayError}
            </p>
          )}
          <div className="flex flex-col gap-2">
            <button
              ref={uploadBtnRef}
              type="button"
              className="min-h-[44px] w-full border border-gold bg-gold px-4 py-2 text-left font-sans text-[10px] uppercase tracking-widest text-white transition-colors hover:bg-navy"
            >
              Upload new image
            </button>
            <p className="admin-upload-hint-touch hidden font-sans text-xs text-charcoal/75">
              Choose an image from your phone
            </p>
            <button
              ref={adjustBtnRef}
              type="button"
              className="min-h-[44px] w-full border border-silver px-4 py-2 text-left font-sans text-[10px] uppercase tracking-widest text-navy transition-colors hover:border-gold"
            >
              Adjust image
            </button>
            <button
              ref={cancelBtnRef}
              type="button"
              className="min-h-[44px] w-full border border-silver/60 px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-charcoal/70 transition-colors hover:border-gold"
            >
              Avbryt
            </button>
          </div>
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        aria-hidden
        onChange={onFileChange}
      />
    </div>
  )
}

export default function AdminImageEditorModal() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const core = useContext(AdminCoreContext)
  const { state } = useAdminImageEditor()
  const editable = Boolean(core?.adminMode && core?.authenticated)

  if (!mounted || !editable || !state.open || !state.pageSlug || !state.imageBlockKey || !state.altBlockKey) {
    return null
  }

  return (
    <AdminBlockPage pageSlug={state.pageSlug}>
      <AdminImageEditorModalInner key={state.imageBlockKey} />
    </AdminBlockPage>
  )
}
