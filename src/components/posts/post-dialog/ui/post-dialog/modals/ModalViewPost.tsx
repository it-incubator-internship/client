import { useTranslation } from '@/hooks/useTranslation'
import { useMeQuery } from '@/services/auth/authApi'
import { Owner, Post } from '@/services/posts/posts-types'
import { EditProfileResponse } from '@/services/profile/profile-types'
import convertDate from '@/utils/convertDate'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  BookmarkOutline,
  Button,
  Edit2Outline,
  HeartOutline,
  Input,
  MoreHorizontal,
  PaperPlaneOutline,
  ScrollAreaComponent,
  TrashOutline,
} from '@robur_/ui-kit'
import clsx from 'clsx'
import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from '@/components/posts/post-dialog/ui/post-dialog/post-dialog.module.scss'

type Props = {
  handleClickOverlayViewPost: () => void
  handleDeletePost: () => void
  handleOpenEditingPost: () => void
  isMenuOpen: boolean
  isOpen: boolean
  owner?: Owner
  post: Post | undefined
  postDescription: string | undefined
  profileData?: EditProfileResponse | undefined
  setMenulOpen: (open: boolean) => void
}

export const ModalViewPost = ({
  handleClickOverlayViewPost,
  handleDeletePost,
  handleOpenEditingPost,
  isMenuOpen,
  isOpen,
  owner,
  post,
  postDescription,
  profileData,
  setMenulOpen,
}: Props) => {
  const { data: me } = useMeQuery()
  const t = useTranslation()
  const userFirstName = profileData?.firstName || owner?.firstName
  let userLastName
  let userAvatar = '/default-avatar.jpg'

  if (profileData) {
    userAvatar = profileData.smallAvatarUrl
    userLastName = profileData.lastName
  } else if (owner) {
    userAvatar = owner.smallAvatarUrl
    userLastName = owner.lastName
  }
  const PostActionsMenu = () => {
    return (
      <DropdownMenu.Root onOpenChange={setMenulOpen} open={isMenuOpen}>
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
                handleOpenEditingPost()
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
    <Dialog.Root onOpenChange={handleClickOverlayViewPost} open={isOpen}>
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
                    <span className={s.title}>
                      {userFirstName} {userLastName}
                    </span>
                  )}
                </div>
                {me?.userId === post?.userId && <PostActionsMenu />}
              </div>
              <ScrollAreaComponent>
                <div className={s.comments}>
                  {post?.description && userFirstName && (
                    <div>{`${userFirstName} ${userLastName}: ${postDescription}`}</div>
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
                  {me && (
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
                  )}
                  <div className={s.likes}>2 243 Like</div>
                  {post?.createdAt && (
                    <div className={s.date}>{convertDate.toLocaleString(post.createdAt)}</div>
                  )}
                </div>
                {me && (
                  <div className={s.send}>
                    <Input
                      className={s.input}
                      containerClassName={s.inputContainer}
                      placeholder={t.myProfile.addComment}
                      type={'text'}
                    />
                    <Button variant={'ghost'}>{t.myProfile.publish}</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
