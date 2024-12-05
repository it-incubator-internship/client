import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useMeQuery } from '@/services/auth/authApi'
import { Post } from '@/services/posts/posts-types'
import { EditProfileResponse } from '@/services/profile/profile-types'
import convertDate from '@/utils/convertDate'
import * as Dialog from '@radix-ui/react-dialog'
import {
  BookmarkOutline,
  Button,
  HeartOutline,
  Input,
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
  isOpen: boolean
  isPostSpecificPage: boolean
  post: Post | undefined
  profileData: EditProfileResponse | undefined
  setOpen?: (flag: boolean) => void
  userId: string
}
export const PostDialog = ({
  isOpen,
  isPostSpecificPage,
  post,
  profileData,
  setOpen,
  userId,
}: Props) => {
  const { data: me } = useMeQuery()
  const router = useRouter()
  const t = useTranslation()

  const handleClickOverlay = () => {
    if (isPostSpecificPage) {
      router.push(`${PATH.PROFILE}/${userId}`)
    } else {
      setOpen && setOpen(false)
    }
  }

  return (
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
              </div>
              <ScrollAreaComponent>
                <div className={s.comments}>
                  <div>{`${profileData?.firstName} ${profileData?.lastName}: ${post?.description}`}</div>
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
