import { useState } from 'react'

import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useDeletePostMutation } from '@/services/posts/posts-api'
import { useMeQuery } from '@/services/auth/authApi'
import { Owner, Post } from '@/services/posts/posts-types'
import { EditProfileResponse } from '@/services/profile/profile-types'
import convertDate from '@/utils/convertDate'
import { showErrorToast, showSuccessToast } from '@/utils/toastConfig'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  BookmarkOutline,
  Button,
  Edit2Outline,
  HeartOutline,
  Input,
  Modal,
  MoreHorizontal,
  PaperPlaneOutline,
  TrashOutline,
  ScrollAreaComponent,
} from '@robur_/ui-kit'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './post-dialog.module.scss'

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
  const { data: me } = useMeQuery()
  const router = useRouter()
  const t = useTranslation()
  let userAvatar = '/default-avatar.jpg'
  let userFirstName
  let userLastName

  if (profileData) {
    userAvatar = profileData.smallAvatarUrl
    userFirstName = profileData.firstName
    userLastName = profileData.lastName
  } else if (owner) {
    userAvatar = owner.smallAvatarUrl
    userFirstName = owner.firstName
    userLastName = owner.lastName
  }

  const [isModalOpen, setModalOpen] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [deletePost] = useDeletePostMutation()

  const handleClickOverlay = () => {
    if (isPostSpecificPage) {
      router.push(`${PATH.PROFILE}/${userId}`)
    } else {
      setOpen && setOpen(false)
    }
  }

  const handleDeletePost = () => {
    setModalOpen(true)
    setMenuOpen(false)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (post?.postId) {
      try {
        await deletePost({ postId: post.postId }).unwrap()
        setModalOpen(false)
        showSuccessToast(t.createPost.postDeleted)
        handleClickOverlay()
      } catch (error) {
        showErrorToast(t.createPost.postNotDeleted)
        console.error('Failed to delete post:', error)
      }
    }
  }

  const PostActionsMenu = () => {
    return (
      <DropdownMenu.Root onOpenChange={setMenuOpen} open={isMenuOpen}>
        <DropdownMenu.Trigger asChild>
          <button className={s.moreHorizontalButton} type={'button'}>
            <MoreHorizontal />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align={'end'} className={s.menuContent} sideOffset={8}>
            <DropdownMenu.Item
              className={s.menuItem}
              onSelect={event => {
                event.preventDefault()
                console.log('Edit Post')
              }}
            >
              <div className={s.menuItemIcon}>
                <Edit2Outline />
              </div>
              <p>{t.post.editPost}</p>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={s.menuItem}
              onSelect={event => {
                event.preventDefault()
                handleDeletePost()
              }}
            >
              <div className={s.menuItemIcon}>
                <TrashOutline />
              </div>
              <p>{t.post.deletePost}</p>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }

  return (
    <>
      <Dialog.Root onOpenChange={handleClickOverlay} open={isOpen}>
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
                    bulletActiveClass: clsx('swiper-pagination-bullet-active', s.bulletActiveClass),
                    bulletClass: clsx('swiper-pagination-bullet', s.bulletClass),
                    clickable: true,
                    el: '.swiper-pagination--custom',
                  }}
                  slidesPerView={1}
                  spaceBetween={5}
                >
                  {post &&
                    post.images.map(image => (
                      <SwiperSlide className={s.slide} key={image.id}>
                        <Image
                          alt={`image-${image.id}`}
                          className={s.image}
                          height={562}
                          src={image.originalImageUrl}
                          width={490}
                        />
                      </SwiperSlide>
                    ))}
                  <div className={'swiper-pagination swiper-pagination--custom'}></div>
                </Swiper>
              </div>
              <div className={s.main}>
                <div className={s.userPostHeader}>
                  <div className={s.user}>
                    {userAvatar && (
                      <Image
                        alt={'User Avatar'}
                        className={s.avatarImage}
                        height={36}
                        layout={'intrinsic'}
                        src={userAvatar}
                        width={36}
                      />
                    )}
                    {userFirstName && (
                      <spanclassName={s.title}>
                        {userFirstName} {userLastName}
                      </span>
                    )}
                  </div>
                  <PostActionsMenu />
                </div>
                <ScrollAreaComponent>
                <div className={s.comments}>
                  {post?.description && userFirstName && (
                    <div>{`${userFirstName} ${userLastName}: ${post?.description}`}</div>
                  )}
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
                    {me && (<div className={s.options}>
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
                    </div>)}
                    <div className={s.likes}>2 243 Like</div>{post?.createdAt && (
                    <div className={s.date}>{convertDate.toLocaleString(post.createdAt)}</div>
                  )}</div>
                  {me && (<div className={s.send}>
                    <Input
                      className={s.input}
                      containerClassName={s.inputContainer}
                      placeholder={t.myProfile.addComment}
                      type={'text'}
                    />
                    <Button variant={'ghost'}>{t.myProfile.publish}</Button>
                  </div>)}
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {isModalOpen && (
        <Modal
          buttonRejectionTitle={t.post.no}
          buttonTitle={t.post.yes}
          onClose={handleCloseModal}
          onCloseWithApproval={handleConfirmDelete}
          open={isModalOpen}
          title={t.post.deletePost}
          withConfirmation
        >
          <p>{t.post.sureWantDeletePost}</p>
        </Modal>
      )}
    </>
  )
}
