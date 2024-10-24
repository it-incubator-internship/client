import React, { useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'

import { useAppSelector } from '@/services/store'
import { Button, ExpandOutline, ImageOutline, Label, MaximizeOutline } from '@robur_/ui-kit'
import clsx from 'clsx'

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
  const [isCroppingOptionsShowed, setIsCroppingOptionsShowed] = useState(false)

  console.log(' croppedImage: ', croppedImage)
  const cropImage = () => {
    const cropper = cropperRef.current?.cropper

    if (cropper) {
      const cropped = cropper.getCroppedCanvas().toDataURL()

      setCroppedImage(cropped) // Сохраняем обрезанное изображение
    }
  }

  function showCroppingOptions() {
    setIsCroppingOptionsShowed(!isCroppingOptionsShowed)
  }

  function handleOptionClick(name: string) {
    const cropper = cropperRef.current?.cropper

    if (cropper) {
      switch (true) {
        case name === AspectRatio.original:
          cropper.reset()
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
  }

  return (
    // <></>
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
          // zoomTo={1}
        />
      )}
      <div className={s.createPostCroppActionButtons}>
        <div className={s.createPostCropBtnsBlock}>
          {isCroppingOptionsShowed && (
            <CreatePostCroppOptions>
              {optionsArray.map(option => (
                <div className={s.btnBlock} key={option.id}>
                  <Label label={option.name}>
                    {React.cloneElement(option.button, {
                      onClick: () => {
                        handleOptionClick(option.name)
                      },
                    })}
                  </Label>
                </div>
              ))}
            </CreatePostCroppOptions>
          )}

          <Button
            className={clsx(s.createPostCroppBtn, s['create-post-cropp-btn-fullscreen'])}
            onClick={showCroppingOptions}
            variant={'secondary'}
          >
            <ExpandOutline />
          </Button>
          <Button
            className={clsx(s.createPostCroppBtn, s['create-post-cropp-btn-zoom'])}
            onClick={() => {}}
            variant={'secondary'}
          >
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
