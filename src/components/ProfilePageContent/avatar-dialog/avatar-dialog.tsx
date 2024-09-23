import { ChangeEvent, useEffect, useState } from 'react'

import { ErrorMessage } from '@/components/ProfilePageContent/avatar-dialog/ErrorMessage'
import { useAvatarDialog } from '@/components/ProfilePageContent/avatar-dialog/useAvatarDialog'
import * as Dialog from '@radix-ui/react-dialog'
import { Button, Close, ImageOutline } from '@robur_/ui-kit'
import dynamic from 'next/dynamic'

import s from './avatar-dialog.module.scss'

const Avatar = dynamic(() => import('react-avatar-edit'), { ssr: false })

type AvatarSelectorProps = {
  isError: string
  isFileLoad: boolean
  onBeforeFileLoad: (event: ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
  onCrop: (view: string) => void
  onFileLoad: () => void
}

const AvatarSelector = (props: AvatarSelectorProps) => {
  const { isError, isFileLoad, onBeforeFileLoad, onClose, onCrop, onFileLoad } = props

  return (
    <>
      {isError ? (
        <div className={s.emptyAvatar}>
          <ImageOutline className={s.emptyAvatarlabel} />
        </div>
      ) : (
        <Avatar
          backgroundColor={'var(--color-dark-500)'}
          borderStyle={{ border: 'none' }}
          closeIconColor={'transparent'}
          height={isFileLoad ? 340 : 228}
          imageWidth={332}
          label={<ImageOutline className={s.emptyAvatarlabel} />}
          labelStyle={{
            alignItems: 'center',
            background: 'var(--color-dark-500)',
            cursor: 'pointer',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
          onBeforeFileLoad={onBeforeFileLoad}
          onClose={onClose}
          onCrop={onCrop}
          onFileLoad={onFileLoad}
          shadingColor={'var(--color-dark-500)'}
          shadingOpacity={0.7}
          src={''}
          width={isFileLoad ? 332 : 222}
        />
      )}
    </>
  )
}

type ActionButtonsProps = {
  isError: string
  isFileLoad: boolean
  onSaveClick: () => void
  onSelectClick: () => void
}

const ActionButtons = ({ isError, isFileLoad, onSaveClick, onSelectClick }: ActionButtonsProps) => {
  return (
    <>
      {!isFileLoad || isError ? (
        <Button className={s.selectBtn} onClick={onSelectClick}>
          Select from Computer
        </Button>
      ) : (
        <Dialog.Close asChild>
          <Button className={s.saveBtn} onClick={onSaveClick}>
            Save
          </Button>
        </Dialog.Close>
      )}
    </>
  )
}

type AvatarHeaderProps = {
  onClose: () => void
}

const AvatarHeader = ({ onClose }: AvatarHeaderProps) => (
  <div className={s.header}>
    <Dialog.Title className={s.title}>Add a Profile Photo</Dialog.Title>
    <Dialog.Close asChild>
      <button onClick={onClose} type={'button'}>
        <Close className={s.closeBtn} />
      </button>
    </Dialog.Close>
    <Dialog.Description className={s.hiddenElement}>Click here and add your Profile Photo.</Dialog.Description>
  </div>
)

type AvatarDialogProps = {
  setAvatarPicture: (picture: any) => void
}

export const AvatarDialog = ({ setAvatarPicture }: AvatarDialogProps) => {
  const [shouldClick, setShouldClick] = useState(false)

  const { dispatch, state, validateFile } = useAvatarDialog()
  const { isError, isFileLoad, isPreview } = state

  const handleSaveAndClose = () => {
    setAvatarPicture(isPreview)
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
