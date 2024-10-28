import { prevPage } from '@/components/posts/create/model/create-post-slice'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { createFormData } from '@/utils/createFormData'
import { getBinaryImageData } from '@/utils/getBinaryImageData'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowIosBackOutline, Button } from '@robur_/ui-kit'

import s from './create-post-dialog-publish-header.module.scss'

export const CreatePostDialogPublishHeader = () => {
  const t = useTranslation()
  const croppedImages = useAppSelector(state => state.createPost.croppedImages)
  const dispatch = useAppDispatch()
  const onPrevPage = () => dispatch(prevPage())

  const publishHandler = async () => {
    const binaryImages = await getBinaryImageData(croppedImages)
    const formattedToFormData = createFormData(binaryImages)

    console.log(formattedToFormData)
  }

  return (
    <div className={s.header}>
      <button onClick={onPrevPage} type={'button'}>
        <ArrowIosBackOutline />
      </button>
      <Dialog.Title className={s.title}>{t.createPost.publishTitle}</Dialog.Title>
      <Button onClick={publishHandler} variant={'ghost'}>
        Publish
      </Button>
      <Dialog.Description className={s.hiddenElement}>
        {t.createPost.publishDescription}
      </Dialog.Description>
    </div>
  )
}
