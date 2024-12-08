import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { commonVariables } from '@/consts/common-variables'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { editPostFormValues, editPostSchema } from '@/schemas/editPostSchema'
import {
  getUserPosts,
  useGetUserPostQuery,
  useGetUserPostsQuery,
  useUpdatePostMutation
} from "@/services/posts/posts-api";
import { Post } from '@/services/posts/posts-types'
import { EditProfileResponse } from '@/services/profile/profile-types'
import { customErrorHandler } from '@/utils/customErrorHandler'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import {
  BookmarkOutline,
  Button,
  Close,
  FormTextarea,
  HeartOutline,
  Input,
  Modal,
  PaperPlaneOutline,
  ScrollAreaComponent,
} from '@robur_/ui-kit'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './post-dialog.module.scss'

type Props = {
  post: Post | undefined
  profileData: EditProfileResponse | undefined
  userId: string
}
const modalName = {
  MODAL_CURRENT_POST: 'modalCurrentPost',
  MODAL_EDIT_POST: 'modalEditPost',
} as const

type ZodKeys = keyof editPostFormValues
type ModalState = (typeof modalName)[keyof typeof modalName] | null
export const PostDialog = ({ post, profileData, userId }: Props) => {
  const router = useRouter()
  const t = useTranslation()
  const [currentModal, setCurrentModal] = useState<ModalState>(modalName.MODAL_CURRENT_POST)
  const [postDescription, setPostDescription] = useState(post?.description)
  const [isModalConfirmCloseEditPost, setModalConfirmCloseEditPost] = useState(false)
  // const { refetch } = useGetUserPostsQuery(
  //   { userId: router.query.userId as string },
  //   { skip: !router.query.userId }
  // )
  const [updatePost] = useUpdatePostMutation()
  const { control, handleSubmit, reset, setError, setValue, watch } = useForm<editPostFormValues>({
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
    handleOpenEditingPost()
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
    console.log('dataForm post', dataForm)
    console.log('router post', router.query)
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
        id: 'router.query.postId as string',
      }).unwrap()
      setPostDescription(dataForm?.titleFormEditPost)
      handleOpenCurrentPost()
    } catch (error: unknown) {
      console.log('ошибка ', error)
      customErrorHandler<ZodKeys>({
        error,
        setError,
        //specificField: 'titleFormEditPost',
        translations: t,
      })
    }
  }

  return (
    <>
      {currentModal === modalName.MODAL_CURRENT_POST && (
        <Dialog.Root onOpenChange={handleClickOverlayPost} open>
          <Dialog.Portal>
            <Dialog.Overlay className={s.DialogOverlay} />
            <Dialog.Content className={s.DialogContent}>
              <Dialog.Title hidden>{t.myProfile.postModalTitle}</Dialog.Title>
              <div className={s.container}>
                <div className={s.swiperContainer}>
                  <Swiper
                    modules={[Pagination, Navigation]}
                    navigation
                    pagination={{
                      bulletActiveClass: clsx(
                        'swiper-pagination-bullet-active',
                        s.bulletActiveClass
                      ),
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
                <div className={s.main}>
                  <div className={s.user}>
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
                    <Button onClick={handleClickEditingPost}>Change</Button>
                  </div>
                  <ScrollAreaComponent>
                    <div className={s.comments}>
                      <div>{`${profileData?.firstName} ${profileData?.lastName}: ${postDescription}`}</div>
                      <div>Answer 1</div>
                      <div>Answer 2</div>
                      <div>Answer 3</div>
                      <div>Answer 4</div>
                      <div>Answer 5</div>
                      <div>Answer 6</div>
                    </div>
                  </ScrollAreaComponent>
                  <div className={s.bottom}>
                    <div className={s.feed}>
                      <div className={s.options}>
                        <div className={s.optionsBlock}>
                          <button className={s.iconBtn} type={'button'}>
                            <HeartOutline className={s.optionsIcon} />
                          </button>
                          <button className={s.iconBtn} type={'button'}>
                            <PaperPlaneOutline className={s.optionsIcon} />
                          </button>
                        </div>
                        <button className={s.iconBtn} type={'button'}>
                          <BookmarkOutline className={s.optionsIcon} />
                        </button>
                      </div>
                      <div className={s.likes}>2 243 Like</div>
                      <div className={s.date}>July 3, 2021</div>
                    </div>
                    <div className={s.send}>
                      <Input
                        className={s.input}
                        containerClassName={s.inputContainer}
                        placeholder={t.myProfile.addComment}
                        type={'text'}
                      />
                      <Button variant={'ghost'}>{t.myProfile.publish}</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
      {currentModal === modalName.MODAL_EDIT_POST && (
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
                      bulletActiveClass: clsx(
                        'swiper-pagination-bullet-active',
                        s.bulletActiveClass
                      ),
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
      )}
    </>
  )
}
