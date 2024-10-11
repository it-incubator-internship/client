import { ReactElement, ReactNode } from 'react'

import Spinner from '@/components/Spinner/Spinner'
import { getCombinedLayout } from '@/components/layouts/CombinedLayout/CombinedLayout'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useMeQuery } from '@/services/auth/authApi'
import { useGetProfileQuery } from '@/services/profile/profile-api'
import clsx from 'clsx'
import { NextPage } from 'next'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from '../profile.module.scss'

// Тип страницы с поддержкой getLayout
type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type ProfileStatsProps = {
  countFollowers?: string
  countFollowing?: string
  countPublications?: string
}

type MyProfileProps = {
  avatar?: string
}

type PublicationsPhotoProps = {
  publicImages?: string[]
}

const USER_ACHIEVEMENTS = {
  countFollowers: '2 358',
  countFollowing: '2 218',
  countPublications: '2 764',
}

const Profile: NextPageWithLayout<MyProfileProps> = ({ avatar = '/default-avatar.png' }) => {
  const { data: meData, isLoading: startIsLoading } = useMeQuery()
  const router = useRouter()
  const { userId } = useParams()

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery(
    { id: userId as string },
    { skip: !userId }
  )

  if (!userId || startIsLoading || isLoadingProfile) {
    return <Spinner />
  }

  if (meData?.userId === userId) {
    void router.replace(PATH.PROFILE)
  }

  if (!isLoadingProfile && !profileData) {
    void router.replace(PATH.NOT_FOUND)
  }

  return (
    <div className={s.profile}>
      <div className={s.header}>
        <div className={s.avatar}>
          <Image
            alt={'User Avatar'}
            className={s.avatarImage}
            height={204}
            layout={'intrinsic'}
            src={avatar}
            width={204}
          />
        </div>
        <div className={s.info}>
          <div className={s.profileUrl}>
            <h1>{profileData?.userName}</h1>
          </div>
          <ProfileStats />

          <div className={s.description}>
            <p>{profileData?.aboutMe}</p>
          </div>
        </div>
      </div>
      <PublicationsPhoto />
    </div>
  )
}

const ProfileStats: NextPageWithLayout<ProfileStatsProps> = () => {
  const t = useTranslation()

  return (
    <div className={s.stats}>
      <p className={clsx(s.statsItem, s.statsFollowing)}>
        <a href={'#'}>
          <div>{USER_ACHIEVEMENTS.countFollowing}</div>
          <span className={s.statsItemName}> {t.myProfile.following} </span>{' '}
        </a>
      </p>

      <p className={clsx(s.statsItem, s.statsFollowers)}>
        <a href={'#'}>
          <div>{USER_ACHIEVEMENTS.countFollowers}</div>
          <span className={s.statsItemName}> {t.myProfile.followers} </span>
        </a>
      </p>

      <p className={clsx(s.statsItem, s.statsPublications)}>
        <div>{USER_ACHIEVEMENTS.countPublications} </div>
        <span className={s.statsItemName}> {t.myProfile.publications} </span>
      </p>
    </div>
  )
}

const PublicationsPhoto: NextPageWithLayout<PublicationsPhotoProps> = ({
  publicImages = [
    '/photo-default-1.png',
    '/photo-default-2.png',
    '/photo-default-3.png',
    '/photo-default-4.png',
    '/photo-default-5.png',
    '/photo-default-6.png',
    '/photo-default-7.png',
    '/photo-default-8.png',
    '/photo-default-1.png',
    '/photo-default-2.png',
    '/photo-default-3.png',
    '/photo-default-4.png',
    '/photo-default-5.png',
    '/photo-default-6.png',
    '/photo-default-7.png',
    '/photo-default-8.png',
  ],
}) => {
  return (
    <div className={s.photoGrid}>
      {publicImages.map((image, index) => (
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

Profile.getLayout = getCombinedLayout

export default Profile
