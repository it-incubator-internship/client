import { ChangeEvent, useEffect, useReducer, useState } from 'react'

import { useAvatarDialog } from '@/components/ProfilePageContent/avatar-dialog/useAvatarDialog'
import * as Dialog from '@radix-ui/react-dialog'
import { Button, Close, ImageOutline } from '@robur_/ui-kit'
import dynamic from 'next/dynamic'

import s from './avatar-dialog.module.scss'

const Avatar = dynamic(() => import('react-avatar-edit'), { ssr: false })

type AvatarDialogProps = {
  setAvatarPicture: (picture: any) => void
}

export const AvatarDialog = ({ setAvatarPicture }: AvatarDialogProps) => {
  const [shouldClick, setShouldClick] = useState(false)

  const { dispatch, state, validateFile } = useAvatarDialog()
  const { isError, isFileLoad, isPreview } = state

  const handleClose = () => {
    setAvatarPicture(isPreview)
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

  const handleButtonClick = () => {
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
          <div className={s.header}>
            <Dialog.Title className={s.title}>Add a Profile Photo</Dialog.Title>
            <Dialog.Close asChild>
              <button onClick={() => dispatch({ type: 'RESET' })} type={'button'}>
                <Close className={s.closeBtn} />
              </button>
            </Dialog.Close>
            <Dialog.Description className={s.hiddenElement}>Click here and add your Profile Photo.</Dialog.Description>
          </div>
          <div className={s.separator}></div>
          {isError && <div className={s.errorMsg}>{isError}</div>}
          <div className={s.selectAvatarWrapper}>
            {isError ? (
              <div className={s.emptyAvatar}>
                <ImageOutline className={s.emptyAvatarlabel} />
              </div>
            ) : (
              <Avatar
                backgroundColor={'#171717'}
                borderStyle={{
                  border: 'none',
                }}
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
                onBeforeFileLoad={handleBeforeFileLoad}
                onClose={handleClose}
                onCrop={handleCrop}
                onFileLoad={handleFileLoad}
                shadingColor={'#171717'}
                shadingOpacity={0.7}
                src={''}
                width={isFileLoad ? 332 : 222}
              />
            )}
            {!isFileLoad || isError ? (
              <Button className={s.selectBtn} onClick={handleButtonClick}>
                Select from Computer
              </Button>
            ) : (
              <Dialog.Close asChild>
                <Button className={s.saveBtn} onClick={handleClose}>
                  Save
                </Button>
              </Dialog.Close>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
