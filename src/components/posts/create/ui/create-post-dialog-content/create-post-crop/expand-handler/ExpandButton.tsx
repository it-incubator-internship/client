import React, { useState } from 'react'
import { ReactCropperElement } from 'react-cropper'

import { CreatePostCroppOptions } from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop'
import {
  AspectRatio,
  optionsArray,
} from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop/create-post-cropp-options/create-post-cropp-options'
import * as Dialog from '@radix-ui/react-dialog'
import { Button, ExpandOutline, Label } from '@robur_/ui-kit'
import clsx from 'clsx'

import s from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop/create-post-crop.module.scss'

interface ExpandButtonProps {
  cropperRef: React.RefObject<ReactCropperElement>
}

export const ExpandButton = ({ cropperRef }: ExpandButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false) // состояние диалога

  function handleOptionClick(name: string) {
    const cropper = cropperRef.current?.cropper

    if (cropper) {
      switch (true) {
        case name === AspectRatio.original:
          cropper.reset()
          break
        case name === AspectRatio.ar1to1:
          cropper.setAspectRatio(1)
          break
        case name === AspectRatio.ar4to5:
          cropper.setAspectRatio(4 / 5)
          break
        case name === AspectRatio.ar16to9:
          cropper.setAspectRatio(16 / 9)
          break
        default:
          console.warn(`Unknown option clicked: ${name}`)
      }
    }
    setIsDialogOpen(false)
  }

  return (
    <Dialog.Root onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <Dialog.Trigger asChild>
        <Button className={clsx(s.createPostCroppBtn)} variant={'secondary'}>
          <ExpandOutline />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content className={s.dialogContent}>
          <CreatePostCroppOptions>
            {optionsArray.map(option => (
              <div className={s.btnBlock} key={option.id}>
                <Label label={option.name}>
                  {React.cloneElement(option.button, {
                    onClick: () => handleOptionClick(option.name),
                  })}
                </Label>
              </div>
            ))}
          </CreatePostCroppOptions>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// <Dialog.Root onOpenChange={setIsDialogOpen} open={isDialogOpen}>
//   <Dialog.Trigger asChild>
//     <Button className={clsx(s.createPostCroppBtn)} variant={'secondary'}>
//       <ExpandOutline />
//     </Button>
//   </Dialog.Trigger>
//
//   <Dialog.Portal>
//     <Dialog.Overlay className={s.dialogOverlay} />
//     <Dialog.Content className={s.dialogContent}>
//       <CreatePostCroppOptions>
//         {optionsArray.map(option => (
//             <div className={s.btnBlock} key={option.id}>
//               <Label label={option.name}>
//                 {React.cloneElement(option.button, {
//                   onClick: () => handleOptionClick(option.name),
//                 })}
//               </Label>
//             </div>
//         ))}
//       </CreatePostCroppOptions>
//     </Dialog.Content>
//   </Dialog.Portal>
// </Dialog.Root>

