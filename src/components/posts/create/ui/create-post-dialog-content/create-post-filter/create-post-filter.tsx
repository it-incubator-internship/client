import { useState } from 'react'

import { setImageFilter } from '@/components/posts/create/model/create-post-slice'
import { useAppDispatch, useAppSelector } from '@/services/store'
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

const FILTERS = [
  { class: s.normal, name: 'Normal' },
  { class: s.clarendon, name: 'Clarendon' },
  { class: s.lark, name: 'Lark' },
  { class: s.gingham, name: 'Gingham' },
  { class: s.moon, name: 'Moon' },
  { class: s.mayfair, name: 'Mayfair' },
  { class: s.reyes, name: 'Reyes' },
  { class: s.hudson, name: 'Hudson' },
  { class: s.valencia, name: 'Valencia' },
]

export const CreatePostFilter = () => {
  const images = useAppSelector(state => state.createPost.images)
  const imageFilters = useAppSelector(state => state.createPost.filters)
  const dispatch = useAppDispatch()

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)

  const handleFilterChange = (filterName: string) => {
    const imageId = images[activeImageIndex]?.id

    if (imageId !== undefined) {
      dispatch(setImageFilter({ filter: filterName, id: imageId }))
    }
  }

  return (
    <div className={s.container}>
      <div className={s.swiperContainer}>
        <Swiper
          className={s.customSwiper}
          modules={[Pagination, Navigation]}
          navigation
          onSlideChange={swiper => setActiveImageIndex(swiper.activeIndex)} // Слушаем смену слайда
          pagination={{
            bulletActiveClass: clsx('swiper-pagination-bullet-active', s.bulletActiveClass),
            bulletClass: clsx('swiper-pagination-bullet', s.bulletClass),
            clickable: true,
            el: '.swiper-pagination--custom',
          }}
          slidesPerView={1}
          spaceBetween={5}
        >
          {images.map(image => (
            <SwiperSlide className={s.slide} key={image.id}>
              <Image
                alt={image.id.toString()}
                className={clsx(
                  s.image,
                  imageFilters[image.id]
                    ? FILTERS.find(f => f.name === imageFilters[image.id])?.class
                    : s.normal
                )}
                height={504}
                src={image.img}
                width={490}
              />
            </SwiperSlide>
          ))}
          <div className={'swiper-pagination swiper-pagination--custom'}></div>
        </Swiper>
      </div>

      <div className={s.filtersGrid}>
        {FILTERS.map(filter => (
          <div
            className={clsx(
              s.filterThumbnail,
              imageFilters[activeImageIndex] === filter.name && s.activeFilter
            )}
            key={filter.name}
            onClick={() => handleFilterChange(filter.name)}
          >
            <div className={clsx(s.thumbnail, filter.class)}>
              <Image
                alt={filter.name}
                height={100}
                src={images[activeImageIndex]?.img || '/placeholder.png'}
                width={100}
              />
            </div>
            <span>{filter.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
