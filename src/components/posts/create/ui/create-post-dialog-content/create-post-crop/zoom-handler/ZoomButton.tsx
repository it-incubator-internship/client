import React, { useEffect, useState } from 'react'
import Cropper from 'react-cropper'

import RangeSlider from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop/range-slider/range-slider'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Button, MaximizeOutline } from '@robur_/ui-kit'
import clsx from 'clsx'

import s2 from '../create-post-crop.module.scss'
import s from './create-post-cropp-zoom-button.module.scss'

interface ExpandButtonProps {
  cropper: Cropper | undefined
  isCropped: boolean
}

export const ZoomButton = ({ cropper, isCropped }: ExpandButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false) // состояние диалога
  const [zoomRatio, setZoomRatio] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (cropper) {
        clearInterval(interval)
        const canvasData = cropper.getCanvasData()

        const zoomRatio = canvasData && canvasData.width / canvasData.naturalWidth

        setZoomRatio(zoomRatio as number)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [cropper, isCropped])

  return (
    <Dialog.Root onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <Dialog.Trigger asChild>
        <Button className={clsx(s2.createPostCroppBtn)} onClick={() => {}} variant={'secondary'}>
          <MaximizeOutline />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal container={document.querySelector(`[class*="createPostCropBtnsBlock"]`)}>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content className={s.dialogContent}>
          <VisuallyHidden>
            <DialogTitle>Zoom button</DialogTitle>
          </VisuallyHidden>
          <RangeSlider
            getValue={(value: number) => {
              let ratio = value / 100

              if (Math.abs(ratio) === 0) {
                ratio = 0
              }

              cropper?.zoomTo((zoomRatio as number) + ratio)
            }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
