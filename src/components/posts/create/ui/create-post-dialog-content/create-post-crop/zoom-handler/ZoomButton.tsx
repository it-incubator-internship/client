import React, { useState } from 'react'
import { ReactCropperElement } from 'react-cropper'

import RangeSlider from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop/range-slider/range-slider'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Button, MaximizeOutline } from '@robur_/ui-kit'
import clsx from 'clsx'

import s2 from '../create-post-crop.module.scss'
import s from './create-post-cropp-zoom-button.module.scss'

interface ExpandButtonProps {
  cropperRef: React.RefObject<ReactCropperElement>
}

export const ZoomButton = ({ cropperRef }: ExpandButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false) // состояние диалога

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
            <DialogTitle></DialogTitle>
          </VisuallyHidden>
          <RangeSlider
            getValue={(value: number) => {
              const canvasData = cropperRef.current?.cropper.getCanvasData()

              const zoomRatio = canvasData && canvasData.width / canvasData.naturalWidth

              console.log(' zoomRatio: ', zoomRatio)

              const ratio = value / 100

              console.log(' ratio: ', ratio)
              cropperRef.current?.cropper.zoomTo(ratio + (zoomRatio as number))
            }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
