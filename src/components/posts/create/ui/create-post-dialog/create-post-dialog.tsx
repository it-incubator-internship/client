import { ReactNode, useEffect, useState } from 'react'

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
import { Modal } from '@robur_/ui-kit'

import s from './create-post-dialog.module.scss'

import { useSaveDraftCreatePost } from '../../draft/hooks/useSaveDraftCreatePost'

type Props = {
  children: ReactNode
}

export const CreatePostDialog = ({ children }: Props) => {
  const { closeAllModals, getModalArgs, handleClickOverlay, isDialogOpen, isModalDraftSavedOpen } =
    useSaveDraftCreatePost()
  const currentPage = useAppSelector(state => state.createPost.page)
  const { checkSpecificDraftExists } = useSaveDraftCreatePost()
  const [ifTheDraftIsSaved, setIfTheDraftIsSaved] = useState(false)

  useEffect(() => {
    const fetchDraftStatus = async () => {
      const exists = await checkSpecificDraftExists()

      setIfTheDraftIsSaved(exists)
    }

    void fetchDraftStatus()
  }, [checkSpecificDraftExists])
  const pages = [
    { content: <CreatePostAddPhoto />, header: <CreatePostDialogAddPhotoHeader /> },
    { content: <CreatePostCrop />, header: <CreatePostDialogCropHeader /> },
    { content: <CreatePostFilter />, header: <CreatePostDialogFilterHeader /> },
    {
      content: <CreatePostPublish />,
      header: <CreatePostDialogPublishHeader closeHandler={closeAllModals} />,
    },
  ]

  return (
    <Dialog.Root onOpenChange={handleClickOverlay} open={isDialogOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.DialogOverlay} />
        <Dialog.Content className={s.DialogContent}>
          {isModalDraftSavedOpen && <Modal {...getModalArgs()} />}
          {pages[currentPage].header}
          <div className={s.separator}></div>
          {pages[currentPage].content}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
