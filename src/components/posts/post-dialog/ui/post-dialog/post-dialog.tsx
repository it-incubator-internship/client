import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { Post } from '@/services/posts/posts-types'
import { EditProfileResponse } from '@/services/profile/profile-types'
import * as Dialog from '@radix-ui/react-dialog'
import { BookmarkOutline, Button, HeartOutline, Input, PaperPlaneOutline } from '@robur_/ui-kit'
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
export const PostDialog = ({ post, profileData, userId }: Props) => {
  const router = useRouter()
  const t = useTranslation()

  const handleClickOverlay = () => {
    router.push(`${PATH.PROFILE}/${userId}`)
  }

  return (
    <Dialog.Root onOpenChange={handleClickOverlay} open>
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
                  <span>
                    {profileData.firstName} {profileData.lastName}
                  </span>
                )}
              </div>
              <div className={s.comments}>
                <div>Message 1</div>
                <div>Message 2</div>
                <div>Message 3</div>
                <div>Message 4</div>
                <div>Message 5</div>
              </div>
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
  )
}
