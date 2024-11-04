import { useAppSelector } from '@/services/store'
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

import s from './create-post-publish.module.scss'

export const CreatePostPublish = () => {
  const images = useAppSelector(state => state.createPost.images)
  const filters = useAppSelector(state => state.createPost.filters)
  const croppedImages = useAppSelector(state => state.createPost.croppedImages)

  return (
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
          {croppedImages.map(image => {
            const appliedFilter = filters[image.id] || 'Normal'
            const filterClass = s[appliedFilter.toLowerCase()] || s.normal

            return (
              <SwiperSlide className={s.slide} key={image.id}>
                <Image
                  alt={`image-${image.id}`}
                  className={`${s.image} ${filterClass}`}
                  height={504}
                  src={image.img}
                  width={490}
                />
              </SwiperSlide>
            )
          })}
          <div className={'swiper-pagination swiper-pagination--custom'}></div>
        </Swiper>
      </div>
      <div className={s.publishButtonContainer}>Publish</div>
    </div>
  )
}
