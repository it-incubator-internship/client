import { nextPage, prevPage } from '@/components/posts/create/model/create-post-slice'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppDispatch } from '@/services/store'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowIosBackOutline, Button } from '@robur_/ui-kit'

import s from '../create-post-dialog-header.module.scss'

export const CreatePostDialogFilterHeader = () => {
  const t = useTranslation()
  const dispatch = useAppDispatch()
  const onPrevPage = () => dispatch(prevPage())
  const onNextPage = () => dispatch(nextPage())

  return (
    <div className={s.header}>
      <button onClick={onPrevPage} type={'button'}>
        <ArrowIosBackOutline />
      </button>
      <Dialog.Title className={s.title}>{t.createPost.filterTitle}</Dialog.Title>
      <Button onClick={onNextPage} variant={'ghost'}>
        Next
      </Button>
      <Dialog.Description className={s.hiddenElement}>
        {t.createPost.filterDescription}
      </Dialog.Description>
    </div>
  )
}
