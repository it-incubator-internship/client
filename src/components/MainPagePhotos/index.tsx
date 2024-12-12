import { useEffect, useState } from 'react'

import { PostDialog } from '@/components/posts/post-dialog/ui/post-dialog/post-dialog'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { NextPageWithLayout } from '@/pages/_app'
import { PostWithOwner } from '@/services/posts/posts-types'
import initLineClamp from '@/utils/clampBlocks'
import convertDate from '@/utils/convertDate'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// eslint-disable-next-line import/extensions
import 'swiper/scss'
// eslint-disable-next-line import/extensions
import 'swiper/scss/navigation'
// eslint-disable-next-line import/extensions
import 'swiper/scss/pagination'

import s from './mainPagePhotos.module.scss'

type MainPagePhotosProps = {
  // publicImages?: string[]
  posts: Array<PostWithOwner>
}
export const MainPagePhotos: NextPageWithLayout<MainPagePhotosProps> = ({ posts }) => {
  const t = useTranslation()
  const [open, setOpen] = useState(false)
  const [currentPost, setCurrentPost] = useState<PostWithOwner | null>(null)

  const openPostHandler = (post: PostWithOwner) => {
    setCurrentPost(post)
    setOpen(true)
  }

  useEffect(() => {
    initLineClamp.init()
  }, [])

  return (
    <>
      <div className={s.photoGrid}>
        {posts.map(post => {
          return (
            <div className={s.photoItem} key={post.postId}>
              <Swiper
                className={s.swiperContainer}
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
                        {image.originalImageUrl ? (
                          <button
                            className={s.imageContainer}
                            onClick={() => openPostHandler(post)}
                            type={'button'}
                          >
                            <Image
                              alt={`User photo ${post.postId}`}
                              height={240}
                              layout={'responsive'}
                              src={image.originalImageUrl}
                              width={234}
                            />
                          </button>
                        ) : (
                          <span>
                            <Image
                              alt={`User photo ${post.postId}`}
                              height={240}
                              layout={'responsive'}
                              src={'/photo-default.jpg'}
                              width={234}
                            />
                          </span>
                        )}
                      </SwiperSlide>
                    )
                  })}
                <div className={'swiper-pagination swiper-pagination--custom'}></div>
              </Swiper>
              <Link className={s.user} href={`${PATH.PROFILE}/${post.userId}`}>
                {post.owner.smallAvatarUrl && (
                  <Image
                    alt={'User Avatar'}
                    className={s.avatarImage}
                    height={36}
                    layout={'intrinsic'}
                    src={post.owner.smallAvatarUrl}
                    width={36}
                  />
                )}
                <span>
                  {post.owner.firstName} {post.owner.lastName}
                </span>
              </Link>
              <div className={s.date}>{convertDate.timePassedFromDate(post.createdAt, t)}</div>
              {post.description && (
                <div className={'clamp-block'}>
                  <div className={clsx(s.description, 'clamp-content')}>{post.description}</div>
                  <button className={'clamp-more'} type={'button'}>
                    {t.other.showMore}
                  </button>
                  <button className={'clamp-less'} type={'button'}>
                    {t.other.showLess}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {currentPost && (
        <PostDialog
          isOpen={open}
          isPostSpecificPage={false}
          owner={currentPost.owner}
          post={currentPost}
          setOpen={setOpen}
          userId={currentPost.userId}
        />
      )}
    </>
  )
}
