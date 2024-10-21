import { ChangeEvent, useEffect, useState } from 'react'

import { useAvatarDialog } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/hook/use-avatar-dialog'
import { ActionButtons } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/ui/action-buttons'
import { AvatarHeader } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/ui/avatar-header'
import { AvatarSelector } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/ui/avatar-selector'
import { ErrorMessage } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/ui/error-message'
import { useTranslation } from '@/hooks/useTranslation'
import { useSendAvatarToServerMutation } from '@/services/profile/profile-api'
import { base64ImgToFormData } from '@/utils/base64ImgToFormData'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@robur_/ui-kit'

import s from './avatar-dialog.module.scss'

type AvatarDialogProps = {
  setAvatarProgress: (picture: any) => void
}

export const AvatarDialog = ({ setAvatarProgress }: AvatarDialogProps) => {
  const [shouldClick, setShouldClick] = useState(false)

  const { dispatch, state, validateFile } = useAvatarDialog()
  const { isError, isFileLoad, isPreview } = state

  const [sendAvatarToServer] = useSendAvatarToServerMutation()

  const handleSaveAndClose = async () => {
    if (isPreview) {
      setAvatarProgress('loading')
      const convertedAvatarImg = base64ImgToFormData(isPreview)

      await sendAvatarToServer(convertedAvatarImg).unwrap()
    }
    dispatch({ type: 'RESET' })
  }

  const handleCloseWithoutSave = () => {
    dispatch({ type: 'RESET' })
  }

  const handleCrop = (view: string) => {
    dispatch({ payload: view, type: 'SET_PREVIEW' })
  }

  const handleBeforeFileLoad = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file && validateFile(file)) {
      dispatch({ type: 'FILE_LOADED' })
    }
  }

  const handleFileLoad = () => {
    dispatch({ type: 'FILE_LOADED' })
  }

  const handleSelectClick = () => {
    setShouldClick(true)
    dispatch({ type: 'RESET' })
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
  const t = useTranslation()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button fullWidth type={'button'} variant={'outlined'}>
          {t.myProfileSettings.addProfilePhoto}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.DialogOverlay} />
        <Dialog.Content className={s.DialogContent}>
          <AvatarHeader onClose={handleCloseWithoutSave} />
          <div className={s.separator}></div>
          {isError && <ErrorMessage message={isError} />}
          <div className={s.selectAvatarWrapper}>
            <AvatarSelector
              isError={isError}
              isFileLoad={isFileLoad}
              onBeforeFileLoad={handleBeforeFileLoad}
              onClose={handleSaveAndClose}
              onCrop={handleCrop}
              onFileLoad={handleFileLoad}
            />
            <ActionButtons
              isError={isError}
              isFileLoad={isFileLoad}
              onSaveClick={handleSaveAndClose}
              onSelectClick={handleSelectClick}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
