import { ReactNode, useState } from 'react'
import Avatar from 'react-avatar-edit'

import * as Dialog from '@radix-ui/react-dialog'
import { Button, Close, ImageOutline } from '@robur_/ui-kit'

import s from './avatar-dialog.module.scss'

type AvatarDialogProps = {
  setAvatarPicture: (picture: any) => void
}

export const AvatarDialog = ({ setAvatarPicture }: AvatarDialogProps) => {
  const [avatar, setAvatar] = useState<any>('')
  const [preview, setPreview] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  //Error! Photo size must be less than 10 MB!
  //Error! The format of the uploaded photo must be PNG and JPEG

  const onClose = () => {
    // setAvatar(preview)
    setAvatarPicture(preview)
  }

  const onCrop = (view: any) => {
    setPreview(view)
  }

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
              <button type={'button'}>
                <Close className={s.closeBtn} />
              </button>
            </Dialog.Close>
            <Dialog.Description className={s.hiddenElement}>Click here and add your Profile Photo.</Dialog.Description>
          </div>
          <div className={s.separator}></div>
          {errorMsg && <div className={s.errorMsg}>{errorMsg}</div>}
          <div className={s.selectAvatarWrapper}>
            {avatar && (
              <div className={s.avatarPlate}>
                <button className={s.removeAvatarBtn} onClick={() => setAvatar(null)} type={'button'}>
                  <Close />
                </button>
                {/*<img alt={''} src={avatar} style={{ height: '340px', objectFit: 'cover', width: 'auto' }} />*/}
              </div>
            )}
            {/*{!showEditor && !preview && (*/}
            {/*  <div className={s.emptyAvatar}>*/}
            {/*    <ImageOutline />*/}
            {/*  </div>*/}
            {/*)}*/}

            {!avatar && (
              <Avatar
                backgroundColor={'#171717'}
                borderStyle={{
                  border: 'none',
                }}
                closeIconColor={'transparent'}
                height={340}
                label={<ImageOutline className={s.emptyAvatarlabel} />}
                labelStyle={{
                  alignItems: 'center',
                  background: 'var(--color-dark-500)',
                  display: 'flex',
                  height: '100%',
                  justifyContent: 'center',
                }}
                onClose={onClose}
                onCrop={onCrop}
                shadingColor={'#171717'}
                src={avatar}
                width={332}
              />
            )}
            {/*<Button className={s.selectBtn} fullWidth>*/}
            {/*  Select from Computer*/}
            {/*</Button>*/}
            <Dialog.Close asChild>
              <Button className={s.selectBtn} onClick={onClose}>
                Save
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
