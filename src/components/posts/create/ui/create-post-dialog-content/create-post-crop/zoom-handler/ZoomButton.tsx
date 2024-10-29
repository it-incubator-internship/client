import React, { useState } from 'react'
import { ReactCropperElement } from 'react-cropper'

import RangeSlider from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop/range-slider/range-slider'
import * as Dialog from '@radix-ui/react-dialog'
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
          <RangeSlider />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
