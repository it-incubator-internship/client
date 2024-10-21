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

import s from './create-post-filter.module.scss'

export const CreatePostFilter = () => {
  const images = useAppSelector(state => state.createPost.images)

  return (
    <div className={s.container}>
      <div className={s.swiperContainer}>
        <Swiper
          modules={[Pagination, Navigation]}
          navigation
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={5}
        >
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
        </Swiper>
      </div>
      <div>Filters</div>
    </div>
  )
}
