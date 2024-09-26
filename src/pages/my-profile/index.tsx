import { ReactElement, ReactNode } from 'react'

import { getCombinedLayout } from '@/components/layouts/CombinedLayout/CombinedLayout'
import { useTranslation } from '@/hooks/useTranslation'
import clsx from 'clsx'
import { NextPage } from 'next'
import Image from 'next/image'

import s from './MyProfile.module.scss'

// Тип страницы с поддержкой getLayout
type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type ProfileStatsProps = {
  initialNumberFollowers?: string
  initialNumberFollowing?: string
  initialNumberPublications?: string
}

type MyProfileProps = {
  initialAvatar?: string
}

type PublicationsPhotoProps = {
  initialImages?: string[]
}

export const ProfileStats: NextPageWithLayout<ProfileStatsProps> = ({
  initialNumberFollowers = '2 358',
  initialNumberFollowing = '2 218',
  initialNumberPublications = '2 764',
}) => {
  const t = useTranslation()

  return (
    <div className={s.stats}>
      <p className={clsx(s.statsItem, s.statsFollowing)}>
        <a href={'#'}>
          <div>{initialNumberFollowing}</div>
          <span className={s.statsItemName}> {t.myProfile.following} </span>{' '}
        </a>
      </p>

      <p className={clsx(s.statsItem, s.statsFollowers)}>
        <a href={'#'}>
          <div>{initialNumberFollowers}</div>
          <span className={s.statsItemName}> {t.myProfile.followers} </span>
        </a>
      </p>

      <p className={clsx(s.statsItem, s.statsPublications)}>
        <div>{initialNumberPublications} </div>
        <span className={s.statsItemName}> {t.myProfile.publications} </span>
      </p>
    </div>
  )
}

export const PublicationsPhoto: NextPageWithLayout<PublicationsPhotoProps> = ({
  initialImages = [
    '/photo-default-1.png',
    '/photo-default-2.png',
    '/photo-default-3.png',
    '/photo-default-4.png',
    '/photo-default-5.png',
    '/photo-default-5.png',
    '/photo-default-5.png',
    '/photo-default-5.png',
  ],
}) => {
  return (
    <div className={s.photoGrid}>
      {initialImages.map((image, index) => (
        <div className={s.photoItem} key={index}>
          <Image
            alt={`User photo ${index + 1}`}
            height={228}
            layout={'responsive'}
            src={image}
            width={234}
          />
        </div>
      ))}
    </div>
  )
}

const MyProfile: NextPageWithLayout<MyProfileProps> = ({
  initialAvatar = '/default-avatar.png',
}) => {
  const t = useTranslation()

  return (
    <div className={s.profile}>
      {/* Шапка профиля */}
      <div className={s.header}>
        <div className={s.avatar}>
          <Image
            alt={'User Avatar'}
            className={s.avatarImage}
            height={204}
            layout={'intrinsic'}
            src={initialAvatar}
            width={204}
          />
        </div>
        <div className={s.info}>
          <div className={s.profileUrl}>
            <h1>
              <a href={'#'}> {t.myProfile.initialUrlProfile}</a>
            </h1>
          </div>
          {/* Статистика профиля Following Followers Publications */}
          <ProfileStats />

          <div className={s.description}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco{' '}
              <a className={s.descriptionLink} href={'#'}>
                {' '}
                laboris nisi ut aliquip ex ea commodo consequat.{' '}
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Сетка фотографий */}
      <PublicationsPhoto />
    </div>
  )
}

MyProfile.getLayout = getCombinedLayout

export default MyProfile
