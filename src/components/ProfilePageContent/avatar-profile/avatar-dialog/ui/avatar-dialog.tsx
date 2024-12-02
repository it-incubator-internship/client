import { ChangeEvent, useEffect, useState } from 'react'

import { useAvatarDialog } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/hook/use-avatar-dialog'
import { ActionButtons } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/ui/action-buttons'
import { AvatarHeader } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/ui/avatar-header'
import { AvatarSelector } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/ui/avatar-selector'
import { ErrorMessage } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/ui/error-message'
import { useTranslation } from '@/hooks/useTranslation'
import { useMeQuery } from '@/services/auth/authApi'
import { useGetProfileQuery, useSendAvatarToServerMutation } from '@/services/profile/profile-api'
import { base64ImgToFormData } from '@/utils/base64ImgToFormData'
import { showErrorToast } from '@/utils/toastConfig'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@robur_/ui-kit'

import s from './avatar-dialog.module.scss'

type AvatarDialogProps = {
  setAvatar: (avatar: any) => void
  setAvatarProgress: (picture: any) => void
}

export const AvatarDialog = ({ setAvatar, setAvatarProgress }: AvatarDialogProps) => {
  const t = useTranslation()
  const { data } = useMeQuery()
  const currentUserId = data?.userId
  const { error: profileError } = useGetProfileQuery({ id: currentUserId as string })

  const [shouldClick, setShouldClick] = useState(false)

  const { dispatch, state, validateFile } = useAvatarDialog()
  const { isError, isFileLoad, isPreview } = state

  const [sendAvatarToServer, { isError: sendAvatarError }] = useSendAvatarToServerMutation()

  useEffect(() => {
    if (sendAvatarError) {
      setAvatarProgress('none')
      resetAvatar()
      showErrorToast(t.myProfileAvatar.saveAvatarServerError)
    }
  }, [sendAvatarError])

  const resetAvatar = () => {
    dispatch({ type: 'RESET' })
  }

  const handleSaveAndClose = async () => {
    if (isPreview) {
      setAvatar(isPreview)
      setAvatarProgress('loading')
      const convertedAvatarImg = base64ImgToFormData(isPreview)

      await sendAvatarToServer(convertedAvatarImg).unwrap()
    }
    resetAvatar()
  }

  const handleFileLoad = () => {
    dispatch({ type: 'FILE_LOADED' })
  }

  const handleCrop = (view: string) => {
    dispatch({ payload: view, type: 'SET_PREVIEW' })
  }

  const handleBeforeFileLoad = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file && validateFile(file)) {
      handleFileLoad()
    }
  }

  const handleSelectClick = () => {
    setShouldClick(true)
    resetAvatar()
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

  const setOpenModalButtonText = (profileError: any) => {
    if (!profileError) {
      return t.myProfileSettings.addProfilePhoto
    } else {
      return t.myProfileSettings.addProfilePhotoBlocked
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          className={s.openModalButton}
          disabled={!!profileError}
          fullWidth
          type={'button'}
          variant={'outlined'}
        >
          {setOpenModalButtonText(profileError)}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.DialogOverlay} />
        <Dialog.Content className={s.DialogContent}>
          <AvatarHeader onClose={resetAvatar} />
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
