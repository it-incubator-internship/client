import { useEffect, useState } from 'react'

import { ErrorMessage } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/ui/error-message'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppSelector } from '@/services/store'
import { Button } from '@robur_/ui-kit'

import s from './create-post-add-photo.module.scss'

export const CreatePostAddPhoto = () => {
  const t = useTranslation()
  const photoUploadError = useAppSelector(state => state.createPost.photoUploadError)
  const [shouldClick, setShouldClick] = useState(false)

  const handleSelectClick = () => {
    setShouldClick(true)
  }

  useEffect(() => {
    if (shouldClick) {
      const fileInput = document.querySelector(
        'input[type="file"][id^="avatar_loader-"]'
      ) as HTMLInputElement

      if (fileInput) {
        fileInput.click()
      }
      setShouldClick(false)
    }
  }, [shouldClick])

  return (
    <div className={s.header}>
      {photoUploadError && <ErrorMessage message={photoUploadError} />}
      <div className={s.selectWrapper}>
        <Button className={s.selectBtn} onClick={handleSelectClick}>
          {t.createPost.selectFromComputer}
        </Button>
        <Button className={s.openDraftBtn} variant={'outlined'}>
          {t.createPost.openDraft}
        </Button>
      </div>
    </div>
  )
}
