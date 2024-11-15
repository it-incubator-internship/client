import { ReactElement, ReactNode } from 'react'

import Spinner from '@/components/Spinner/Spinner'
import { getCombinedLayout } from '@/components/layouts/CombinedLayout/CombinedLayout'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useMeQuery } from '@/services/auth/authApi'
import { useGetUserPostsQuery } from '@/services/posts/posts-api'
import { Post } from '@/services/posts/posts-types'
import { useGetProfileQuery } from '@/services/profile/profile-api'
import { Button } from '@robur_/ui-kit'
import clsx from 'clsx'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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
  // publicImages?: string[]
  posts: Post[]
}

const USER_ACHIEVEMENTS = {
  countFollowers: '2 358',
  countFollowing: '2 218',
  countPublications: '2 764',
}

const Profile: NextPageWithLayout<MyProfileProps> = ({ avatar = '/default-avatar.jpg' }) => {
  const { data: meData, isLoading: startIsLoading } = useMeQuery()
  const currentUserId = meData?.userId
  const router = useRouter()
  const { userId } = useParams()

  const t = useTranslation()

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery(
    { id: userId as string },
    { skip: !userId }
  )

  const { data: userPosts, isLoading: isLoadingUserPosts } = useGetUserPostsQuery(
    { userId: userId as string },
    { skip: !userId }
  )

  if (!userId || startIsLoading || isLoadingProfile) {
    return <Spinner />
  }

  if (!isLoadingProfile && !profileData) {
    void router.replace(PATH.NOT_FOUND)
  }

  console.log('userPosts', userPosts)

  return (
    <div className={s.profile}>
      <div className={s.header}>
        <div className={s.avatar}>
          {profileData && (
            <Image
              alt={'User Avatar'}
              className={s.avatarImage}
              height={204}
              layout={'intrinsic'}
              src={profileData?.originalAvatarUrl || avatar}
              width={204}
            />
          )}
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
        {currentUserId === userId && (
          <Button asChild className={s.profileSettingsBtn} variant={'secondary'}>
            <Link href={`/profile-settings/${currentUserId}`}>{t.myProfile.profileSettings}</Link>
          </Button>
        )}
      </div>
      {userPosts ? (
        <PublicationsPhoto posts={userPosts.posts} />
      ) : (
        <div>There is no any data...</div>
      )}
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

// publicImages = [
//   '/photo-default-1.png',
//   '/photo-default-2.png',
//   '/photo-default-3.png',
//   '/photo-default-4.png',
//   '/photo-default-5.png',
//   '/photo-default-6.png',
//   '/photo-default-7.png',
//   '/photo-default-8.png',
//   '/photo-default-1.png',
//   '/photo-default-2.png',
//   '/photo-default-3.png',
//   '/photo-default-4.png',
//   '/photo-default-5.png',
//   '/photo-default-6.png',
//   '/photo-default-7.png',
//   '/photo-default-8.png',
// ]
const PublicationsPhoto: NextPageWithLayout<PublicationsPhotoProps> = ({ posts }) => {
  return (
    <div className={s.photoGrid}>
      {posts.map(post => {
        const imagePreview = post.images.find(item => {
          return item.originalImageUrl
        })

        return (
          <div className={s.photoItem} key={post.postId}>
            <Image
              alt={`User photo ${post.postId}`}
              height={228}
              layout={'responsive'}
              src={imagePreview?.originalImageUrl}
              width={234}
            />
          </div>
        )
      })}
    </div>
  )
}

Profile.getLayout = getCombinedLayout

export default Profile
