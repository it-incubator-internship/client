import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'

import {
  ImageType,
  deleteImg,
  setCroppedImage,
  setImage,
  setPage,
} from '@/components/posts/create/model/create-post-slice'
import { ZoomButton } from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop/zoom-handler/ZoomButton'
import { FILE_VALIDATION_CONFIG } from '@/consts/common-variables'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { showErrorToast } from '@/utils/toastConfig'
import { Button, CloseOutline, ImageOutline, PlusCircleOutline } from '@robur_/ui-kit'
import clsx from 'clsx'
import { FaCropSimple } from 'react-icons/fa6'
import { Swiper as SwiperInstance } from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// eslint-disable-next-line import/extensions
import 'swiper/scss'
// eslint-disable-next-line import/extensions
import 'swiper/scss/navigation'
// eslint-disable-next-line import/extensions
import 'swiper/scss/pagination'

import s from './create-post-crop.module.scss'

import { ExpandButton } from './expand-handler/ExpandButton'

export const CreatePostCrop = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const t = useTranslation()

  //region moy cod
  const images = useAppSelector(state => state.createPost.images)
  const croppedImages = useAppSelector(state => state.createPost.croppedImages)

  const cropperRefs = useRef<Array<ReactCropperElement | null>>([])
  const swiperRef = useRef<SwiperInstance | null>(null)

  const [currentImage, setCurrentImage] = useState<ImageType>({ id: 0, img: '' } as ImageType)
  const [isCropped, setIsCropped] = useState<boolean>(false)

  useEffect(() => {
    croppedImages.length &&
      setCurrentImage(croppedImages.length === 1 ? croppedImages[0] : currentImage)
  }, [croppedImages])

  useEffect(() => {
    if (!currentImage.img) {
      setCurrentImage(croppedImages[0])
    }
  }, [cropperRefs.current])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    // Удаляем слушатель при размонтировании
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentImage])

  const dispatch = useAppDispatch()
  //endregion moy cod

  function handleKeyDown(event: KeyboardEvent) {
    const cropper = cropperRefs.current[currentImage.id]?.cropper

    if (cropper) {
      switch (event.key) {
        case 'ArrowUp':
          cropper.move(0, 10)
          break
        case 'ArrowDown':
          cropper.move(0, -10)
          break
        case 'ArrowLeft':
          // Переместить изображение влево
          cropper.move(-10, 0)
          break
        case 'ArrowRight':
          // Переместить изображение вправо
          cropper.move(10, 0)
          break
        default:
          break
      }
    }
  }

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

        dispatch(setImage({ img: fileURL, type: file.type }))
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

  //region moy cod

  const cropImage = () => {
    const cropper = cropperRefs.current[currentImage.id]?.cropper

    if (cropper) {
      setIsCropped(true)
      cropper.getCroppedCanvas().toBlob(blob => {
        const url = URL.createObjectURL(blob as Blob)

        dispatch(setCroppedImage({ id: currentImage.id, img: url }))
      })
    }
  }

  function handleSlideChange(swiper: SwiperInstance) {
    setCurrentImage(croppedImages[swiperRef.current?.activeIndex as number])
  }

  function handleCroppRef(el: ReactCropperElement | null, index: number) {
    cropperRefs.current[index] = el
  }

  //endregion moy cod

  return (
    <div className={s.container}>
      <Swiper
        allowTouchMove={false}
        modules={[Pagination, Navigation]}
        navigation
        onSlideChange={handleSlideChange}
        onSwiper={(swiper: SwiperInstance) => {
          swiperRef.current = swiper
        }}
        pagination={{
          bulletActiveClass: clsx('swiper-pagination-bullet-active', s.bulletActiveClass),
          bulletClass: clsx('swiper-pagination-bullet', s.bulletClass),
          clickable: true,
          el: '.swiper-pagination--custom',
        }}
        slidesPerView={1}
        spaceBetween={5}
      >
        {croppedImages.map((croppedImage, index) => {
          return (
            <SwiperSlide className={s.slide} key={croppedImage.id}>
              {images.length && (
                <Cropper
                  alt={croppedImage.id.toString()}
                  background={false}
                  className={s.createPostCroppImage}
                  dragMode={'none'}
                  guides={false}
                  initialAspectRatio={1}
                  ref={(el: ReactCropperElement) => {
                    handleCroppRef(el, index)
                  }}
                  src={croppedImage.img}
                  style={{ height: '504px', width: '491px' }}
                  zoomOnWheel={false}
                />
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>

      <div className={s.iconContainer} onClick={toggleModal}>
        <ImageOutline className={s.imageIcon} />
      </div>
      <input
        accept={'image/*'}
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type={'file'}
      />
      <div className={s.createPostCroppActionButtons}>
        <div className={s.createPostCropBtnsBlock}>
          <ExpandButton
            cropper={cropperRefs.current[currentImage.id]?.cropper}
            id={currentImage.id}
            isCropped={isCropped}
            setIsCropped={setIsCropped}
          />

          <Button className={clsx(s.createPostCroppBtn)} onClick={cropImage} variant={'secondary'}>
            <FaCropSimple />
          </Button>

          <ZoomButton
            cropper={cropperRefs.current[currentImage.id]?.cropper}
            isCropped={isCropped}
          />
        </div>
        <Button
          className={clsx(s.createPostCroppBtn, s['create-post-cropp-btn-add-change-photo'])}
          variant={'secondary'}
        >
          <ImageOutline />
        </Button>
      </div>

      <div
        className={clsx(
          'swiper-pagination swiper-pagination--custom',
          s.createPostCroppSwiperPagination
        )}
      ></div>
      {isModalOpen && (
        <div className={s.customModal}>
          <div className={s.modalContent}>
            <div className={s.modalImageList}>
              {croppedImages.map((image, index) => (
                <div className={s.imageWrapper} key={image.id}>
                  <img alt={`Uploaded image ${index}`} className={s.previewImage} src={image.img} />
                  <div className={s.closeButtonContainer}>
                    <CloseOutline
                      className={s.closeButton}
                      onClick={() => handleDeleteImage(image.id)}
                    ></CloseOutline>
                  </div>
                </div>
              ))}
              <PlusCircleOutline className={s.plusIconContainer} onClick={openFileUploader} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
