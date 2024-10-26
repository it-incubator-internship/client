import React, { useEffect, useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'

import { useAppSelector } from '@/services/store'
import * as Dialog from '@radix-ui/react-dialog'
import { Button, ExpandOutline, ImageOutline, Label, MaximizeOutline } from '@robur_/ui-kit'
import clsx from 'clsx'
import { FaCropSimple } from 'react-icons/fa6'

import s from './create-post-crop.module.scss'

import {
  AspectRatio,
  CreatePostCroppOptions,
  optionsArray,
} from './create-post-cropp-options/create-post-cropp-options'

export const CreatePostCrop = () => {
  const images = useAppSelector(state => state.createPost.images)

  const [croppedImage, setCroppedImage] = useState<null | string>(null)
  const cropperRef = useRef<ReactCropperElement>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false) // состояние диалога

  console.log(' croppedImage: ', croppedImage)
  const cropImage = () => {
    const cropper = cropperRef.current?.cropper

    if (cropper) {
      const cropped = cropper.getCroppedCanvas().toDataURL()

      setCroppedImage(cropped) // Сохраняем обрезанное изображение
    }
  }

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
    <div className={s.createPostCroppWrapper}>
      {images.length && (
        <Cropper
          className={s.createPostCroppImage}
          draggable={false}
          guides={false}
          initialAspectRatio={1}
          ref={cropperRef}
          src={images[0].img}
          style={{ height: '504px', width: '491px' }}
        />
      )}
      <div className={s.createPostCroppActionButtons}>
        <div className={s.createPostCropBtnsBlock}>
          <Dialog.Root onOpenChange={setIsDialogOpen} open={isDialogOpen}>
            <Dialog.Trigger asChild>
              <Button
                className={clsx(s.createPostCroppBtn, s['create-post-cropp-btn-fullscreen'])}
                variant={'secondary'}
              >
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

          <Button className={clsx(s.createPostCroppBtn)} onClick={cropImage} variant={'secondary'}>
            <FaCropSimple />
          </Button>
          <Button className={clsx(s.createPostCroppBtn)} onClick={() => {}} variant={'secondary'}>
            <MaximizeOutline />
          </Button>
        </div>
        <Button
          className={clsx(s.createPostCroppBtn, s['create-post-cropp-btn-add-change-photo'])}
          variant={'secondary'}
        >
          <ImageOutline />
        </Button>
      </div>
    </div>
  )
}
