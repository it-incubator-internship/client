import { useEffect, useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'

import { useAppSelector } from '@/services/store'
import { Button, ExpandOutline, ImageOutline, MaximizeOutline } from '@robur_/ui-kit'
import clsx from 'clsx'
import Image from 'next/image'

import 'cropperjs/dist/cropper.css'

import s from './create-post-crop.module.scss'

export const CreatePostCrop = () => {
  const images = useAppSelector(state => state.createPost.images)

  const [croppedImage, setCroppedImage] = useState<null | string>(null)
  const cropperRef = useRef<ReactCropperElement>(null)

  useEffect(() => {}, [])

  console.log(' croppedImage: ', croppedImage)
  const cropImage = () => {
    const cropper = cropperRef.current?.cropper

    if (cropper) {
      const cropped = cropper.getCroppedCanvas().toDataURL()

      setCroppedImage(cropped) // Сохраняем обрезанное изображение
    }
  }

  return (
    <div className={s['create-post-cropp-wrapper']}>
      {images.length && (
        <Cropper
          autoCrop={false}
          className={s['create-post-cropp-image']}
          draggable={false}
          guides={false}
          initialAspectRatio={1}
          ref={cropperRef}
          src={images[0].img}
          style={{ height: '504px', width: '491px' }}
          zoomTo={1}
        />
      )}
      <div className={s['create-post-cropp-action-buttons']}>
        <div className={s['create-post-cropp-btns-block']}>
          <Button
            className={clsx(s['create-post-cropp-btn'], s['create-post-cropp-btn-fullscreen'])}
            onClick={cropImage}
            variant={'secondary'}
          >
            <ExpandOutline />
          </Button>
          <Button
            className={clsx(s['create-post-cropp-btn'], s['create-post-cropp-btn-zoom'])}
            onClick={() => {}}
            variant={'secondary'}
          >
            <MaximizeOutline />
          </Button>
        </div>
        <Button
          className={clsx(s['create-post-cropp-btn'], s['create-post-cropp-btn-add-change-photo'])}
          variant={'secondary'}
        >
          <ImageOutline />
        </Button>
      </div>
    </div>
  )
}
