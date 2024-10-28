import React, { ChangeEvent, useRef } from 'react'

import { setPostDescription } from '@/components/posts/create/model/create-post-slice'
import { commonVariables } from '@/consts/common-variables'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useMeQuery } from '@/services/auth/authApi'
import { useGetProfileQuery } from '@/services/profile/profile-api'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { Textarea } from '@robur_/ui-kit'
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

import s from './create-post-publish.module.scss'

export const CreatePostPublish = () => {
  const { data: meData, isLoading: startIsLoading } = useMeQuery()

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery(
    { id: meData?.userId as string },
    { skip: !meData?.userId }
  )
  const t = useTranslation()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const images = useAppSelector(state => state.createPost.images)
  const filters = useAppSelector(state => state.createPost.filters)
  const description = useAppSelector(state => state.createPost.postDescription)
  const descriptionError = useAppSelector(state => state.createPost.postDescriptionError)
  const dispatch = useAppDispatch()
  const handleTextArea = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      setPostDescription({
        description: evt.target.value,
        errorText: t.createPost.postDescriptionError,
      })
    )
  }

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
          <div className={'swiper-pagination swiper-pagination--custom'}></div>
        </Swiper>
      </div>
      <div className={s.info}>
        <div className={s.infoTop}>
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
              <Link href={`${PATH.PROFILE}/${meData?.userId}`}>
                {profileData.firstName} {profileData.lastName}
              </Link>
            )}
          </div>
          <Textarea
            className={s.textArea}
            error={descriptionError}
            onChange={handleTextArea}
            ref={textAreaRef}
            titleLabel={t.createPost.addPublicationTitle}
            value={description}
          />
          <div className={s.limit}>
            {description.length}/{commonVariables.POST_DESCRIPTION_LIMIT}
          </div>
        </div>
      </div>
    </div>
  )
}
