import { useEffect, useRef, useState } from 'react'
// import Avatar from 'react-avatar-edit'

const Avatar = dynamic(() => import('react-avatar-edit'), { ssr: false })

import * as Dialog from '@radix-ui/react-dialog'
import { Button, Close, ImageOutline } from '@robur_/ui-kit'
import dynamic from 'next/dynamic'

import s from './avatar-dialog.module.scss'

type AvatarDialogProps = {
  avatarPicture: string | undefined
  setAvatarPicture: (picture: any) => void
}

export const AvatarDialog = ({ avatarPicture, setAvatarPicture }: AvatarDialogProps) => {
  const [isFileLoaded, setIsFileLoaded] = useState(false)
  const [preview, setPreview] = useState(null)
  const [isError, setIsError] = useState('')
  const [shouldClick, setShouldClick] = useState(false)

  const onClose = () => {
    setAvatarPicture(preview)
    setIsFileLoaded(false)
    setIsError('')
  }

  const onCrop = (view: any) => {
    setPreview(view)
  }

  const onBeforeFileLoad = (event: any) => {
    const file = event.target.files[0]
    const maxFileSize = 4 * 1024 * 1024
    const fileSize = file.size
    const fileType = file.type

    if (fileSize > maxFileSize) {
      setIsError('Error! Photo size must be less than 4 MB')

      return
    }

    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      setIsError('Error! The format of the uploaded photo must be PNG and JPEG')

      return
    }
    setIsError('')
  }
  const onFileLoad = () => {
    setIsFileLoaded(true)
  }

  // const handleButtonClick = () => {
  //   setIsError('')
  //   const fileInput = document.querySelector('input[type="file"][id^="avatar_loader-"]') as HTMLInputElement
  //
  //   if (fileInput) {
  //     fileInput.click()
  //   }
  // }

  const handleButtonClick = () => {
    setIsError('')
    setShouldClick(true)
    setIsFileLoaded(false)
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
              <button
                onClick={() => {
                  setIsError('')
                  setIsFileLoaded(false)
                }}
                type={'button'}
              >
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
                height={isFileLoaded ? 340 : 228}
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
                shadingColor={'#171717'}
                shadingOpacity={0.7}
                src={''}
                width={isFileLoaded ? 332 : 222}
              />
            )}
            {!isFileLoaded || isError ? (
              <Button className={s.selectBtn} onClick={handleButtonClick}>
                Select from Computer
              </Button>
            ) : (
              <Dialog.Close asChild>
                <Button className={s.saveBtn} onClick={onClose}>
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
