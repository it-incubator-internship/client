import { ChangeEvent, useEffect, useState } from 'react'

import { useAvatarDialog } from '@/components/ProfilePageContent/avatar-dialog/hook/use-avatar-dialog'
import { ActionButtons } from '@/components/ProfilePageContent/avatar-dialog/ui/action-buttons/action-buttons'
import { AvatarHeader } from '@/components/ProfilePageContent/avatar-dialog/ui/avatar-header/avatar-header'
import { AvatarSelector } from '@/components/ProfilePageContent/avatar-dialog/ui/avatar-selector/avatar-selector'
import { ErrorMessage } from '@/components/ProfilePageContent/avatar-dialog/ui/error-message/error-message'
import { useSendAvatarToServerMutation } from '@/services/profile/profile-api'
import { base64ImgToFormData } from '@/utils/base64ImgToFormData'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@robur_/ui-kit'

import s from './avatar-dialog.module.scss'

type AvatarDialogProps = {
  setAvatar: (picture: any) => void
}

export const AvatarDialog = ({ setAvatar }: AvatarDialogProps) => {
  const [shouldClick, setShouldClick] = useState(false)

  const { dispatch, state, validateFile } = useAvatarDialog()
  const { isError, isFileLoad, isPreview } = state

  const [sendAvatarToServer] = useSendAvatarToServerMutation()

  const handleSaveAndClose = async () => {
    if (isPreview) {
      const convertedAvatarImg = base64ImgToFormData(isPreview)

      await sendAvatarToServer(convertedAvatarImg).unwrap()
      setAvatar('pending')
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
      const fileInput = document.querySelector('input[type="file"][id^="avatar_loader-"]') as HTMLInputElement

      if (fileInput) {
        fileInput.click()
      }
      setShouldClick(false)
    }
  }, [shouldClick])

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button fullWidth type={'button'} variant={'outlined'}>
          Add a Profile Photo
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
