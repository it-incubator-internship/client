import React, { useEffect, useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'

import { ImageType, setCroppedImage } from '@/components/posts/create/model/create-post-slice'
import { ZoomButton } from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop/zoom-handler/ZoomButton'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { Button, ImageOutline } from '@robur_/ui-kit'
import clsx from 'clsx'
import * as cropperjs from 'cropperjs'
import { FaCropSimple } from 'react-icons/fa6'

import s from './create-post-crop.module.scss'

import { ExpandButton } from './expand-handler/ExpandButton'

export const CreatePostCrop = () => {
  const images = useAppSelector(state => state.createPost.images)
  const croppedImages = useAppSelector(state => state.createPost.croppedImages)

  const cropperRef = useRef<ReactCropperElement>(null)

  const [currentImage, setCurrentImage] = useState<ImageType>({ id: 0, img: '' } as ImageType)
  const [isCropped, setIsCropped] = useState<boolean>(false)

  useEffect(() => {
    //todo пока нет выбора между картинками используем этот способ
    croppedImages.length && setCurrentImage(croppedImages[croppedImages.length - 1])
  }, [croppedImages])

  // useEffect(() => {
  //   setTimeout(() => {
  //     const canvasData = cropperRef.current?.cropper.getCanvasData()
  //
  //     if (canvasData) {
  //       const zoomRatio = canvasData.width / canvasData.naturalWidth
  //
  //       console.log(' zoomRatio: ', zoomRatio)
  //     }
  //   }, 100)
  // }, [])

  const dispatch = useAppDispatch()

  const cropImage = () => {
    const cropper = cropperRef.current?.cropper

    if (cropper) {
      setIsCropped(true)
      cropper.getCroppedCanvas().toBlob(blob => {
        const url = URL.createObjectURL(blob as Blob)

        console.log(' blobUrl: ', url)
        dispatch(setCroppedImage({ id: currentImage.id, img: url }))
      })
    }
  }

  return (
    <div className={s.createPostCroppWrapper}>
      {images.length && (
        <Cropper
          className={s.createPostCroppImage}
          movable={true}
          guides={false}
          initialAspectRatio={1}
          ref={cropperRef}
          src={currentImage.img}
          style={{ height: '504px', width: '491px' }}
        />
      )}
      <div className={s.createPostCroppActionButtons}>
        <div className={s.createPostCropBtnsBlock}>
          <ExpandButton
            cropperRef={cropperRef}
            id={currentImage.id}
            isCropped={isCropped}
            setIsCropped={setIsCropped}
          />

          <Button className={clsx(s.createPostCroppBtn)} onClick={cropImage} variant={'secondary'}>
            <FaCropSimple />
          </Button>

          <ZoomButton cropperRef={cropperRef} />
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
