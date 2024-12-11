import { useState } from 'react'

import { ModalEditPost } from '@/components/posts/post-dialog/ui/post-dialog/modals/ModalEditPost'
import { ModalViewPost } from '@/components/posts/post-dialog/ui/post-dialog/modals/ModalViewPost'
import { ModalState } from '@/components/posts/post-dialog/ui/post-dialog/types/types'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useDeletePostMutation } from '@/services/posts/posts-api'
import { Owner, Post } from '@/services/posts/posts-types'
import { EditProfileResponse } from '@/services/profile/profile-types'
import { showErrorToast, showSuccessToast } from '@/utils/toastConfig'
import { Modal } from '@robur_/ui-kit'
import { useRouter } from 'next/router'

export const modalName = {
  MODAL_EDIT_POST: 'modalEditPost',
  MODAL_VIEW_POST: 'modalViewPost',
} as const

type Props = {
  isOpen: boolean
  isPostSpecificPage: boolean
  owner?: Owner
  post: Post | undefined
  profileData?: EditProfileResponse | undefined
  setOpen?: (flag: boolean) => void
  userId: string
}
export const PostDialog = ({
  isOpen,
  isPostSpecificPage,
  owner,
  post,
  profileData,
  setOpen,
  userId,
}: Props) => {
  const router = useRouter()
  const [isModalDeletionConfirmationOpen, setModalDeletionConfirmationOpen] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [postDescription, setPostDescription] = useState<string | undefined>(post?.description)
  const [currentModal, setCurrentModal] = useState<ModalState>(modalName.MODAL_VIEW_POST)
  const [deletePost] = useDeletePostMutation()
  const handleOpenEditingPost = () => {
    setCurrentModal(modalName.MODAL_EDIT_POST as ModalState)
  }
  const t = useTranslation()

  const handleClickOverlayViewPost = () => {
    if (isPostSpecificPage) {
      router.push(`${PATH.PROFILE}/${userId}`)
    } else {
      setOpen && setOpen(false)
    }
  }
  const handleDeletePost = () => {
    setModalDeletionConfirmationOpen(true)
    setMenuOpen(false)
  }

  const handleCloseModalDeletionConfirmation = () => {
    setModalDeletionConfirmationOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (post?.postId) {
      try {
        await deletePost({ postId: post.postId }).unwrap()
        setModalDeletionConfirmationOpen(false)
        showSuccessToast(t.createPost.postDeleted)
        handleClickOverlayViewPost()
      } catch (error) {
        showErrorToast(t.createPost.postNotDeleted)
        console.error('Failed to delete post:', error)
      }
    }
  }

  return (
    <>
      {currentModal === modalName.MODAL_VIEW_POST && (
        <ModalViewPost
          handleClickOverlayViewPost={handleClickOverlayViewPost}
          handleDeletePost={handleDeletePost}
          handleOpenEditingPost={handleOpenEditingPost}
          isMenuOpen={isMenuOpen}
          isOpen={isOpen}
          owner={owner}
          post={post}
          postDescription={postDescription}
          profileData={profileData}
          setMenulOpen={setMenuOpen}
        />
      )}
      {isModalDeletionConfirmationOpen && (
        <Modal
          buttonRejectionTitle={t.post.no}
          buttonTitle={t.post.yes}
          onClose={handleCloseModalDeletionConfirmation}
          onCloseWithApproval={handleConfirmDelete}
          open={isModalDeletionConfirmationOpen}
          title={t.post.deletePost}
          withConfirmation
        >
          <p>{t.post.sureWantDeletePost}</p>
        </Modal>
      )}
      {currentModal === modalName.MODAL_EDIT_POST && (
        <ModalEditPost
          post={post}
          postDescription={postDescription}
          setCurrentModal={setCurrentModal}
          setMenulOpen={setMenuOpen}
          setPostDescription={setPostDescription}
        />
      )}
    </>
  )
}
