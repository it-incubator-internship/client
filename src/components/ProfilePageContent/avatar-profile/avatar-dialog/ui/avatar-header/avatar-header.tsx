import { useTranslation } from '@/hooks/useTranslation'
import * as Dialog from '@radix-ui/react-dialog'
import { Close } from '@robur_/ui-kit'

import s from './avatar-header.module.scss'

type AvatarHeaderProps = {
  onClose: () => void
}

export const AvatarHeader = ({ onClose }: AvatarHeaderProps) => {
  const t = useTranslation()

  return (
    <div className={s.header}>
      <Dialog.Title className={s.title}>{t.myProfileSettings.addProfilePhoto}</Dialog.Title>{' '}
      <Dialog.Close asChild>
        <button onClick={onClose} type={'button'}>
          <Close className={s.closeBtn} />
        </button>
      </Dialog.Close>
      <Dialog.Description className={s.hiddenElement}>
        {t.myProfileSettings.clickHereAddProfilePhoto}
      </Dialog.Description>
    </div>
  )
}
