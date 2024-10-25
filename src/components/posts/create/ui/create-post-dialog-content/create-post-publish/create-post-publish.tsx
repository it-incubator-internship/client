import { useAppSelector } from '@/services/store'
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

  return (
    <div className={s.container}>
      <div className={s.swiperContainer}>
        <Swiper
          modules={[Pagination, Navigation]}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={5}
        >
          {images.map(image => {
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
        </Swiper>
      </div>
      <div className={s.publishButtonContainer}>Publish</div>
    </div>
  )
}
