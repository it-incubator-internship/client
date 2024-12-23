import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Spinner from '@/components/Spinner/Spinner'
import { modalName } from '@/components/posts/post-dialog/ui/post-dialog/post-dialog'
import { commonVariables } from '@/consts/common-variables'
import { useTranslation } from '@/hooks/useTranslation'
import { editPostFormValues, editPostSchema } from '@/schemas/editPostSchema'
import { useUpdatePostMutation } from '@/services/posts/posts-api'
import { Post } from '@/services/posts/posts-types'
import { EditProfileResponse } from '@/services/profile/profile-types'
import { customErrorHandler } from '@/utils/customErrorHandler'
import { showErrorToast, showSuccessToast } from '@/utils/toastConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { Button, Close, FormTextarea, Modal } from '@robur_/ui-kit'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from '@/components/posts/post-dialog/ui/post-dialog/post-dialog.module.scss'

type ZodKeys = keyof editPostFormValues
type ModalState = (typeof modalName)[keyof typeof modalName] | null
type Props = {
  post: Post | undefined
  postDescription: string | undefined
  profileData?: EditProfileResponse | undefined
  setCurrentModal: (modal: ModalState) => void
  setMenulOpen: (open: boolean) => void
  setPostDescription: (postDescription: string | undefined) => void
}
export const ModalEditPost = ({
  post,
  postDescription,
  profileData,
  setCurrentModal,
  setMenulOpen,
  setPostDescription,
}: Props) => {
  const [isModalConfirmCloseEditPost, setModalConfirmCloseEditPost] = useState(false)
  const t = useTranslation()
  const [updatePost, { isLoading: isLoadingUpdatePost }] = useUpdatePostMutation()
  const router = useRouter()
  const { control, handleSubmit, setError, watch } = useForm<editPostFormValues>({
    defaultValues: {
      titleFormEditPost: postDescription,
    },
    mode: 'onSubmit',
    resolver: zodResolver(editPostSchema(t)),
  })
  const postEditionValue = watch('titleFormEditPost')
  const initialTitleValue = post?.description

  const hasValueChanged = postEditionValue === initialTitleValue

  const handleOpenCurrentPost = () => {
    setCurrentModal(modalName.MODAL_VIEW_POST as ModalState)
  }
  const handleClickCloseModalPost = () => {
    setModalConfirmCloseEditPost(false)
    handleOpenCurrentPost()
  }
  const handleClickOverlayPostEdit = async () => {
    if (hasValueChanged) {
      handleOpenCurrentPost()

      return
    }
    setModalConfirmCloseEditPost(true)
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
    const postId = router.query.postId as string
    const descriptionNewPost = dataForm?.titleFormEditPost as string

    try {
      await updatePost({
        description: descriptionNewPost,
        id: postId,
      }).unwrap()
      setPostDescription(dataForm?.titleFormEditPost)
      setMenulOpen(false)
      handleOpenCurrentPost()
      showSuccessToast(t.postEdition.publicationSuccessfullyEdited)
    } catch (error: unknown) {
      showErrorToast(t.errors.default)
      customErrorHandler<ZodKeys>({
        error,
        setError,
        specificField: 'titleFormEditPost',
        translations: t,
      })
    }
  }

  if (isLoadingUpdatePost) {
    return <Spinner />
  }

  return (
    <Dialog.Root onOpenChange={handleClickOverlayPostEdit} open>
      <Dialog.Portal>
        <Dialog.Overlay className={s.DialogOverlay} />
        <Dialog.Content className={s.DialogContent}>
          {isModalConfirmCloseEditPost && <Modal {...getModalArgs()} />}
          <div className={s.header}>
            <Dialog.Title>{t.postEdition.titleHeaderModalEditPost}</Dialog.Title>
            <Dialog.Close asChild>
              <button onClick={handleClickOverlayPostEdit} type={'button'}>
                <Close className={s.closeBtn} />
              </button>
            </Dialog.Close>
          </div>
          <div className={s.container}>
            <div className={s.swiperContainer}>
              <div className={s.imageEditPost}></div>
              <Swiper
                modules={[Pagination, Navigation]}
                navigation
                pagination={{
                  bulletActiveClass: clsx('swiper-pagination-bullet-active', s.bulletActiveClass),
                  bulletClass: clsx('swiper-pagination-bullet', s.bulletClass),
                  clickable: true,
                  el: '.swiper-pagination--custom',
                }}
                slidesPerView={1}
                spaceBetween={5}
              >
                {post &&
                  post.images.map(image => {
                    return (
                      <SwiperSlide className={s.slide} key={image.id}>
                        <Image
                          alt={`image-${image.id}`}
                          className={`${s.image}`}
                          height={562}
                          src={image.originalImageUrl}
                          width={490}
                        />
                      </SwiperSlide>
                    )
                  })}
                <div className={'swiper-pagination swiper-pagination--custom'}></div>
              </Swiper>
            </div>
            <div className={s.mainEditPostModal}>
              <div className={s.userEditProfile}>
                {profileData && profileData.smallAvatarUrl && (
                  <Image
                    alt={'User Avatar'}
                    className={s.avatarImage}
                    height={36}
                    layout={'intrinsic'}
                    src={profileData?.smallAvatarUrl}
                    width={36}
                  />
                )}
                {profileData && (
                  <span className={s.title}>
                    {profileData.firstName} {profileData.lastName}
                  </span>
                )}
              </div>
              <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
                <FormTextarea
                  className={s.textAreaClass}
                  control={control}
                  name={'titleFormEditPost'}
                  titleLabel={t.postEdition.titleFormEditPost}
                />
                <div className={s.limit}>
                  {postEditionValue?.length}/{commonVariables.POST_DESCRIPTION_LIMIT}
                </div>
                <Button className={s.buttonSave} type={'submit'}>
                  {t.myProfileSettings.saveChanges}
                </Button>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
