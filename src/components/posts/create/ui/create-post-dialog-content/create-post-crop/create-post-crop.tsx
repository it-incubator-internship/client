import { ChangeEvent, useRef, useState } from 'react'

import { deleteImg, setImage, setPage } from '@/components/posts/create/model/create-post-slice'
import { FILE_VALIDATION_CONFIG } from '@/consts/common-variables'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { showErrorToast } from '@/utils/toastConfig'
import { CloseOutline, ImageOutline, PlusCircleOutline } from '@robur_/ui-kit'
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

export const CreatePostCrop = () => {
  const images = useAppSelector(state => state.createPost.images)
  const croppedImages = useAppSelector(state => state.createPost.croppedImages)
  const dispatch = useAppDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const t = useTranslation()

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

  return (
    <div className={styles.container}>
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
  )
}
