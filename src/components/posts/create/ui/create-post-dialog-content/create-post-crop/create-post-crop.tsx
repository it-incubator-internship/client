import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/services/store'
import { ChangeEvent, useRef } from 'react'
import {
  setImage,
  deleteImg,
  setPage,
  FILE_VALIDATION_CONFIG,
} from '@/components/posts/create/model/create-post-slice'
import { ImageOutline, PlusCircleOutline, CloseOutline } from '@robur_/ui-kit'
import styles from './create-post-crop.module.scss'
import { showErrorToast } from '@/utils/toastConfig'
import { useTranslation } from '@/hooks/useTranslation'

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
      {images.length > 0 && (
        <div className={styles.imageContainer}>
          <img
            src={croppedImages[0].img}
            alt="Uploaded"
            style={{ width: '100%', height: '504px', objectFit: 'cover' }}
          />
          <div className={styles.iconContainer} onClick={toggleModal}>
            <ImageOutline className={styles.imageIcon} />
          </div>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      {isModalOpen && (
        <div className={styles.customModal}>
          <div className={styles.modalContent}>
            <div className={styles.modalImageList}>
              {croppedImages.map((image, index) => (
                <div key={image.id} className={styles.imageWrapper}>
                  <img
                    src={image.img}
                    alt={`Uploaded image ${index}`}
                    className={styles.previewImage}
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
