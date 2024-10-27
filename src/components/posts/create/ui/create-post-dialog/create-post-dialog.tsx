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
import { Modal, PlusSquareOutline } from '@robur_/ui-kit'
import clsx from 'clsx'

import s from './create-post-dialog.module.scss'

import { useSaveDraftCreatePost } from '../../draft/useSaveDraftCreatePost'

//import { addData, openDatabase } from '../../draft/draftIndexed'
type Props = {
  children: ReactNode
}

export const CreatePostDialog = ({ children }: Props) => {
  const t = useTranslation()
  const { getModalArgs, handleClickOverlay, isDialogOpen, isModalDraftsavedOpen } =
    useSaveDraftCreatePost()
  const currentPage = useAppSelector(state => state.createPost.page)
  const pages = [
    { content: <CreatePostAddPhoto />, header: <CreatePostDialogAddPhotoHeader /> },
    { content: <CreatePostCrop />, header: <CreatePostDialogCropHeader /> },
    { content: <CreatePostFilter />, header: <CreatePostDialogFilterHeader /> },
    { content: <CreatePostPublish />, header: <CreatePostDialogPublishHeader /> },
  ]

  return (
    <Dialog.Root onOpenChange={handleClickOverlay} open={isDialogOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.DialogOverlay} />
        <Dialog.Content className={s.DialogContent}>
          {isModalDraftsavedOpen && <Modal {...getModalArgs()} />}
          {pages[currentPage].header}
          <div className={s.separator}></div>
          {pages[currentPage].content}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
