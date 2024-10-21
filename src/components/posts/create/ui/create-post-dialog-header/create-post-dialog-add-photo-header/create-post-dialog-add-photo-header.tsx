import { useTranslation } from '@/hooks/useTranslation'
import * as Dialog from '@radix-ui/react-dialog'
import { Close } from '@robur_/ui-kit'

import s from '../create-post-dialog-header.module.scss'

export const CreatePostDialogAddPhotoHeader = () => {
  const t = useTranslation()
  const onClose = () => {
    console.log('closed')
  }

  return (
    <div className={s.header}>
      <Dialog.Title className={s.title}>{t.createPost.addPhotoTitle}</Dialog.Title>
      <Dialog.Close asChild>
        <button onClick={onClose} type={'button'}>
          <Close className={s.closeBtn} />
        </button>
      </Dialog.Close>
      <Dialog.Description className={s.hiddenElement}>
        {t.createPost.addPhotoDescription}
      </Dialog.Description>
    </div>
  )
}
