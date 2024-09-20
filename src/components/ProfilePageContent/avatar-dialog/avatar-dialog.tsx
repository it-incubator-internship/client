import * as Dialog from '@radix-ui/react-dialog'
import { Button, Close, ImageOutline } from '@robur_/ui-kit'

import s from './avatar-dialog.module.scss'

export const AvatarDialog = () => {
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
          <div className={s.errorMsg}>Error! Photo size must be less than 10 MB!</div>
          <div className={s.errorMsg}>Error! The format of the uploaded photo must be PNG and JPEG</div>
          <div className={s.selectAvatarWrapper}>
            <div className={s.emptyAvatar}>
              <ImageOutline />
            </div>
            <Button className={s.selectBtn} fullWidth>
              Select from Computer
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
