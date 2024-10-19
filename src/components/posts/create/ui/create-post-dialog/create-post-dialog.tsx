import React from 'react'

import {
  CreatePostAddPhoto,
  CreatePostCrop,
  CreatePostFilter,
  CreatePostPublish,
} from '@/components/posts/create/ui/create-post-dialog-content'
import {
  CreatePostDialogAddPhotoHeader,
  CreatePostDialogCropHeader,
  CreatePostDialogFilterHeader,
  CreatePostDialogPublishHeader,
} from '@/components/posts/create/ui/create-post-dialog-header'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppSelector } from '@/services/store'
import * as Dialog from '@radix-ui/react-dialog'
import { PlusSquareOutline } from '@robur_/ui-kit'
import clsx from 'clsx'

import s from './create-post-dialog.module.scss'

export const CreatePostDialog = () => {
  const t = useTranslation()
  const currentPage = useAppSelector(state => state.createPost.page)
  const pages = [
    { content: <CreatePostAddPhoto />, header: <CreatePostDialogAddPhotoHeader /> },
    { content: <CreatePostCrop />, header: <CreatePostDialogCropHeader /> },
    { content: <CreatePostFilter />, header: <CreatePostDialogFilterHeader /> },
    { content: <CreatePostPublish />, header: <CreatePostDialogPublishHeader /> },
  ]

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={clsx(s.Tag)} type={'button'}>
          <PlusSquareOutline aria-hidden={'true'} className={s.Svg} />
          <span className={s.A}>{t.nav.create}</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.DialogOverlay} />
        <Dialog.Content className={s.DialogContent}>
          {pages[currentPage].header}
          <div className={s.separator}></div>
          {pages[currentPage].content}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
