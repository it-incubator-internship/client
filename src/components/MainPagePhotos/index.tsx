import { useEffect, useState } from 'react'

import { PostDialog } from '@/components/posts/post-dialog/ui/post-dialog/post-dialog'
import { NextPageWithLayout } from '@/pages/_app'
import { Post } from '@/services/posts/posts-types'
import { EditProfileResponse } from '@/services/profile/profile-types'
import initLineClamp from '@/utils/clampBlocks'
import clsx from 'clsx'
import Image from 'next/image'
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
  posts: Post[]
}
export const MainPagePhotos: NextPageWithLayout<MainPagePhotosProps> = ({ posts }) => {
  console.log(posts)
  const [open, setOpen] = useState(false)
  const [currentPost, setCurrentPost] = useState<Post | null>(null)
  const [currentPostProfileData, setCurrentPostProfileData] = useState<
    EditProfileResponse | undefined
  >(undefined)

  const openPostHandler = (post: Post) => {
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
          const imagePreview = post.images.find(item => {
            return item.originalImageUrl
          })

          return (
            <div className={s.photoItem} key={post.postId}>
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
                        <button
                          className={s.imageContainer}
                          onClick={() => openPostHandler(post)}
                          type={'button'}
                        >
                          <Image
                            alt={`User photo ${post.postId}`}
                            height={240}
                            layout={'responsive'}
                            src={imagePreview?.originalImageUrl || '/photo-default-1.png'}
                            width={234}
                          />
                        </button>
                      </SwiperSlide>
                    )
                  })}
                <div className={'swiper-pagination swiper-pagination--custom'}></div>
              </Swiper>
              <div className={'clamp-block'}>
                <div className={clsx(s.description, 'clamp-content')}>{post.description}</div>
                <button className={'clamp-more'} type={'button'}>
                  Show more
                </button>
                <button className={'clamp-less'} type={'button'}>
                  Hide
                </button>
              </div>
            </div>
          )
        })}
      </div>
      {currentPost && (
        <PostDialog
          isOpen={open}
          isPostSpecificPage={false}
          post={currentPost}
          profileData={currentPostProfileData}
          setOpen={setOpen}
          userId={currentPost.userId}
        />
      )}
    </>
  )
}
