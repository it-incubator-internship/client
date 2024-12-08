import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { editPostFormValues, editPostSchema } from '@/schemas/editPostSchema'
import { useUpdatePostMutation } from '@/services/posts/posts-api'
import { Post } from '@/services/posts/posts-types'
import { customErrorHandler } from '@/utils/customErrorHandler'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMeQuery } from "@/services/auth/authApi";
const modalName = {
  MODAL_CURRENT_POST: 'modalCurrentPost',
  MODAL_EDIT_POST: 'modalEditPost',
} as const

type ZodKeys = keyof editPostFormValues
type ModalState = (typeof modalName)[keyof typeof modalName] | null
type Props = {
  post: Post | undefined
  userId: string
}
export const useEditPost = ({ post, userId }: Props) => {
  const { data: meData, isLoading: startIsLoading } = useMeQuery()
  const [currentModal, setCurrentModal] = useState<ModalState>(modalName.MODAL_CURRENT_POST)
  const [postDescription, setPostDescription] = useState(post?.description)
  const [isModalConfirmCloseEditPost, setModalConfirmCloseEditPost] = useState(false)
  const t = useTranslation()
  const [updatePost, { isLoading: isLoadingUpdatePost }] = useUpdatePostMutation()
  const router = useRouter()
  const { control, handleSubmit, setError, watch } = useForm<editPostFormValues>({
    defaultValues: {
      titleFormEditPost: post?.description,
    },
    mode: 'onSubmit',
    resolver: zodResolver(editPostSchema(t)),
  })
  const postEditionValue = watch('titleFormEditPost')
  const initialTitleValue = post?.description

  const hasValueChanged = postEditionValue === initialTitleValue

  const handleOpenEditingPost = () => {
    setCurrentModal(modalName.MODAL_EDIT_POST as ModalState)
  }

  const handleOpenCurrentPost = () => {
    setCurrentModal(modalName.MODAL_CURRENT_POST as ModalState)
  }
  const handleClickCloseModalPost = () => {
    setModalConfirmCloseEditPost(false)
    handleOpenCurrentPost()
  }
  const handleClickOverlayPost = () => {
    router.push(`${PATH.PROFILE}/${userId}`)
  }
  const handleClickOverlayPostEdit = async () => {
    if (hasValueChanged) {
      handleOpenCurrentPost()

      return
    }
    setModalConfirmCloseEditPost(true)
  }
  const handleClickEditingPost = () => {
    meData && handleOpenEditingPost()
  }
  const childrenModal = () => {
    return <div>{t.postEdition.modalConfirmCloseEditionPost.text}</div>
  }

  const getModalArgs = () => {
    return {
      buttonRejectionTitle: t.postEdition.modalConfirmCloseEditionPost.buttonRejectionTitle,
      buttonTitle: t.postEdition.modalConfirmCloseEditionPost.buttonTitle,
      children: childrenModal(),
      onClose: () => setModalConfirmCloseEditPost(false),
      onCloseWithApproval: handleClickCloseModalPost,
      onCloseWithoutApproval: () => setModalConfirmCloseEditPost(false),
      open: isModalConfirmCloseEditPost,
      title: t.postEdition.modalConfirmCloseEditionPost.titleModalWithConfirm,
      withConfirmation: true,
    }
  }
  const handleFormSubmit = async (dataForm: editPostFormValues) => {
    if (hasValueChanged) {
      return
    }
    if (!router.query.postId) {
      console.error('Post ID is missing')

      return
    }

    try {
      await updatePost({
        description: dataForm?.titleFormEditPost as string,
        id: router.query.postId as string,
      }).unwrap()
      setPostDescription(dataForm?.titleFormEditPost)
      handleOpenCurrentPost()
    } catch (error: unknown) {
      customErrorHandler<ZodKeys>({
        error,
        setError,
        specificField: 'titleFormEditPost',
        translations: t,
      })
    }
  }

  return {
    control,
    currentModal,
    getModalArgs,
    handleClickCloseModalPost,
    handleClickEditingPost,
    handleClickOverlayPost,
    handleClickOverlayPostEdit,
    handleFormSubmit,
    handleSubmit,
    isLoadingUpdatePost,
    isModalConfirmCloseEditPost,
    modalName,
    postDescription,
    postEditionValue,
    t,
  }
}
