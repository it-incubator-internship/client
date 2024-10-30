import { ChangeEvent, useState } from 'react'

import { ErrorMessage } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/ui/error-message'
import {
  FILE_VALIDATION_CONFIG,
  nextPage,
  setImage,
  setPhotoUploadError,
} from '@/components/posts/create/model/create-post-slice'
import { FileUploader } from '@/components/posts/create/ui/fileUploader'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { Button, ImageOutline } from '@robur_/ui-kit'

import s from './create-post-add-photo.module.scss'

export const CreatePostAddPhoto = () => {
  const t = useTranslation()
  const photoUploadError = useAppSelector(state => state.createPost.photoUploadError)
  const dispatch = useAppDispatch()

  const validateFile = (file: File) => {
    if (file.size > FILE_VALIDATION_CONFIG.maxFileSize) {
      dispatch(setPhotoUploadError({ uploadError: 'Error! Photo size must be less than 4 MB' }))

      return false
    }
    if (!FILE_VALIDATION_CONFIG.allowedFileTypes.includes(file.type)) {
      dispatch(
        setPhotoUploadError({
          uploadError: 'Error! The format of the uploaded photo must be PNG or JPEG',
        })
      )

      return false
    }
    dispatch(setPhotoUploadError({ uploadError: '' }))

    return true
  }

  const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]

      if (file && validateFile(file)) {
        const fileURL = await URL.createObjectURL(file)

        if (fileURL) {
          dispatch(setImage({ img: fileURL }))
          dispatch(nextPage())
        }
      }

      // Сброс значения input, чтобы можно было выбрать тот же файл снова
      e.target.value = ''
    }
  }

  return (
    <div className={s.container}>
      <div className={s.selectWrapper}>
        {photoUploadError && <ErrorMessage className={s.errorMessage} message={photoUploadError} />}
        <FileUploader
          accept={'image/*'}
          btnClassName={s.selectBtn}
          btnText={t.createPost.selectFromComputer}
          className={s.fileUploader}
          name={'image'}
          onChange={uploadHandler}
        >
          <ImageOutline />
        </FileUploader>
        <Button className={s.openDraftBtn} variant={'outlined'}>
          {t.createPost.openDraft}
        </Button>
      </div>
    </div>
  )
}
