import React, { useEffect, useState } from 'react'
import { ReactCropperElement } from 'react-cropper'

import { setCroppedImage } from '@/components/posts/create/model/create-post-slice'
import { CreatePostCroppOptions } from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop'
import {
  AspectRatio,
  optionsArray,
} from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop/create-post-cropp-options/create-post-cropp-options'
import { useAppDispatch, useAppSelector } from '@/services/store'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Button, ExpandOutline, Label } from '@robur_/ui-kit'
import clsx from 'clsx'

import s from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop/create-post-crop.module.scss'

interface ExpandButtonProps {
  cropperRef: React.RefObject<ReactCropperElement>
  id: number
  isCropped: boolean
  setIsCropped: (isCropped: boolean) => void
}

type ScaleType = 0 | 1

export const ExpandButton = ({ cropperRef, id, isCropped, setIsCropped }: ExpandButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false) // состояние диалога
  const [scale, setScale] = useState<ScaleType>(0)
  const images = useAppSelector(state => state.createPost.images)
  const croppedImages = useAppSelector(state => state.createPost.croppedImages)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const cropper = cropperRef.current?.cropper

    if (cropper && isCropped) {
      setIsCropped(false)
      cropper.reset()
      console.log(' original: ')
      optionsArray[0].name = AspectRatio.original
      setScale(1)
    }
  }, [croppedImages])

  console.log(' scale: ', scale)

  function handleOptionClick(name: string) {
    const cropper = cropperRef.current?.cropper

    if (cropper) {
      switch (true) {
        case name === AspectRatio.original || name === AspectRatio.ar100percent:
          {
            setScale(prevState => ((prevState + 1) % 2) as ScaleType)

            switch (true) {
              case scale === 1:
                {
                  console.log(' 1: ', 1)
                  cropper.reset()

                  dispatch(setCroppedImage({ id: id, img: images[id].img }))

                  optionsArray[0].name = AspectRatio.ar100percent
                }
                break
              case scale === 0:
                {
                  console.log(' 0: ', 0)
                  cropper.zoomTo(1)

                  optionsArray[0].name = AspectRatio.original
                }
                break
              default:
                console.warn(`Unknown scale: ${scale}`)
            }
          }
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

      <Dialog.Portal container={document.querySelector(`[class*="createPostCropBtnsBlock"]`)}>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content className={s.dialogContent}>
          <VisuallyHidden>
            <DialogTitle></DialogTitle>
          </VisuallyHidden>
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