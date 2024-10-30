import { ChangeEvent } from 'react'

import {
    FILE_VALIDATION_CONFIG,
    deleteImg,
    setImage,
    setPage,
} from '@/components/posts/create/model/create-post-slice'
import { useTranslation } from '@/hooks/useTranslation'
import { showErrorToast } from '@/utils/toastConfig'
import { CloseOutline, PlusCircleOutline } from '@robur_/ui-kit'
import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// eslint-disable-next-line import/extensions
import 'swiper/scss'
// eslint-disable-next-line import/extensions
import 'swiper/scss/navigation'
// eslint-disable-next-line import/extensions
import 'swiper/scss/pagination'

import styles from './create-post-crop.module.scss'

//todo moe!!!!!!!!!!!!!!!!
import React, { useEffect, useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'

import { ImageType, setCroppedImage } from '@/components/posts/create/model/create-post-slice'
import { ZoomButton } from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop/zoom-handler/ZoomButton'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { Button, ImageOutline } from '@robur_/ui-kit'
import clsx from 'clsx'
import { FaCropSimple } from 'react-icons/fa6'

import s from './create-post-crop.module.scss'

import { ExpandButton } from './expand-handler/ExpandButton'

export const CreatePostCrop = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isModalOpen, setModalOpen] = useState(false)
    const t = useTranslation()

    //todo moe!!!!!!!!!!!!!!!!
  const images = useAppSelector(state => state.createPost.images)
  const croppedImages = useAppSelector(state => state.createPost.croppedImages)

  const cropperRef = useRef<ReactCropperElement>(null)

  const [currentImage, setCurrentImage] = useState<ImageType>({ id: 0, img: '' } as ImageType)
  const [isCropped, setIsCropped] = useState<boolean>(false)
  const [isCropperReady, setIsCropperReady] = useState<boolean>(false) // Состояние для отслеживания готовности cropper

  useEffect(() => {
    //todo пока нет выбора между картинками используем этот способ
    croppedImages.length && setCurrentImage(croppedImages[croppedImages.length - 1])
  }, [croppedImages])

  useEffect(() => {
    if (isCropperReady) {
    }
  }, [isCropperReady])

  const dispatch = useAppDispatch()
    //todo moe!!!!!!!!!!!!!!!!

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (croppedImages.length >= 5) {
                showErrorToast(t.createPost.errorMaxPhotos)

                return
            }

            const file = e.target.files[0]

            if (file.size > FILE_VALIDATION_CONFIG.maxFileSize) {
                showErrorToast(t.createPost.errorFileSize)

                return
            }

            if (!FILE_VALIDATION_CONFIG.allowedFileTypes.includes(file.type)) {
                showErrorToast(t.createPost.errorFileType)

                return
            }

            if (file) {
                const fileURL = URL.createObjectURL(file)

                dispatch(setImage({ img: fileURL }))
            }
        }
    }

    const openFileUploader = () => {
        fileInputRef.current?.click()
    }

    const toggleModal = () => {
        setModalOpen(!isModalOpen)
    }

    const handleDeleteImage = (id: number) => {
        dispatch(deleteImg({ id }))
        if (croppedImages.length === 1) {
            dispatch(setPage({ page: 0 }))
        }
    }

    //todo moe!!!!!!!!!!!!!!!!

  const cropImage = () => {
    const cropper = cropperRef.current?.cropper

    if (cropper) {
      setIsCropped(true)
      cropper.getCroppedCanvas().toBlob(blob => {
        const url = URL.createObjectURL(blob as Blob)

        dispatch(setCroppedImage({ id: currentImage.id, img: url }))
      })
    }
  }

  // Обработчик инициализации cropper
  const handleCropperInitialized = () => {
    setIsCropperReady(true) // Устанавливаем состояние готовности в true
  }
    //todo moe!!!!!!!!!!!!!!!!

  return (
      /*
      * <div className={styles.container}>
      <Swiper
        modules={[Pagination]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={swiper => console.log(swiper)}
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={5}
      >
        {images.map(image => {
          return (
            <SwiperSlide className={styles.slide} key={image.id}>
              <Image
                alt={image.id.toString()}
                className={styles.image}
                height={504}
                src={image.img}
                width={490}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div className={styles.iconContainer} onClick={toggleModal}>
        <ImageOutline className={styles.imageIcon} />
      </div>
      <input
        accept={'image/*'}
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type={'file'}
      />

      {isModalOpen && (
        <div className={styles.customModal}>
          <div className={styles.modalContent}>
            <div className={styles.modalImageList}>
              {croppedImages.map((image, index) => (
                <div className={styles.imageWrapper} key={image.id}>
                  <img
                    alt={`Uploaded image ${index}`}
                    className={styles.previewImage}
                    src={image.img}
                  />
                  <div className={styles.closeButtonContainer}>
                    <CloseOutline
                      className={styles.closeButton}
                      onClick={() => handleDeleteImage(image.id)}
                    ></CloseOutline>
                  </div>
                </div>
              ))}
              <PlusCircleOutline className={styles.plusIconContainer} onClick={openFileUploader} />
            </div>
          </div>
        </div>
      )}
    </div>
      * */
    <div className={s.createPostCroppWrapper}>
      {images.length && (
        <Cropper
          className={s.createPostCroppImage}
          dragMode={'none'}
          guides={false}
          initialAspectRatio={1}
          onInitialized={handleCropperInitialized} // Обработчик инициализации
          ref={cropperRef}
          src={currentImage.img}
          style={{ height: '504px', width: '491px' }}
          zoomOnWheel={false}
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
