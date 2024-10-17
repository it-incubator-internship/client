import { Component } from 'react'

import CreatePostAddPhoto from '@/components/posts/create/ui/create-post-dialog-content/create-post-add-photo/create-post-add-photo'
import CreatePostCrop from '@/components/posts/create/ui/create-post-dialog-content/create-post-crop/create-post-crop'
import CreatePostFilter from '@/components/posts/create/ui/create-post-dialog-content/create-post-filter/create-post-filter'
import CreatePostPublish from '@/components/posts/create/ui/create-post-dialog-content/create-post-publish/create-post-publish'
import { CreatePostDialogAddPhotoHeader } from '@/components/posts/create/ui/create-post-dialog-header/create-post-dialog-add-photo-header/create-post-dialog-add-photo-header'
import { CreatePostDialogCropHeader } from '@/components/posts/create/ui/create-post-dialog-header/create-post-dialog-crop-header/create-post-dialog-crop-header'
import { CreatePostDialogFilterHeader } from '@/components/posts/create/ui/create-post-dialog-header/create-post-dialog-filter-header/create-post-dialog-filter-header'
import { CreatePostDialogPublishHeader } from '@/components/posts/create/ui/create-post-dialog-header/create-post-dialog-publish-header/create-post-dialog-publish-header'
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
