import { useEffect, useRef } from 'react'

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

import s from './create-post-filter.module.scss'

export const CreatePostFilter = () => {
  const images = useAppSelector(state => state.createPost.images)

  return (
    <div className={s.container}>
      <div className={s.swiperContainer}>
        <Swiper
          className={s.customSwiper}
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
          {/*swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal*/}
          {images.map(image => {
            return (
              <SwiperSlide className={s.slide} key={image.id}>
                <Image
                  alt={image.id.toString()}
                  className={s.image}
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
      <div>Filters</div>
    </div>
  )
}
