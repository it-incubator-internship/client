import * as Dialog from '@radix-ui/react-dialog'
import { Close } from '@robur_/ui-kit'

import s from './avatar-header.module.scss'

type AvatarHeaderProps = {
  onClose: () => void
}

export const AvatarHeader = ({ onClose }: AvatarHeaderProps) => (
  <div className={s.header}>
    <Dialog.Title className={s.title}>Add a Profile Photo</Dialog.Title>
    <Dialog.Close asChild>
      <button onClick={onClose} type={'button'}>
        <Close className={s.closeBtn} />
      </button>
    </Dialog.Close>
    <Dialog.Description className={s.hiddenElement}>
      Click here and add your Profile Photo.
    </Dialog.Description>
  </div>
)
