import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'

import Spinner from '@/components/Spinner/Spinner'
import { getCombinedLayout } from '@/components/layouts/CombinedLayout/CombinedLayout'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useMeQuery } from '@/services/auth/authApi'
import {
  getRunningQueriesThunk,
  getUserPosts,
  useLazyGetUserPostsQuery,
} from '@/services/posts/posts-api'
import { Post, getUserPostsResponse } from '@/services/posts/posts-types'
import { useGetProfileQuery } from '@/services/profile/profile-api'
import { wrapper } from '@/services/store'
import { Button } from '@robur_/ui-kit'
import clsx from 'clsx'
import { GetServerSidePropsContext, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import s from '../profile.module.scss'

type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type ProfileStatsProps = {
  countFollowers?: string
  countFollowing?: string
  countPublications?: string
}

type PublicationsPhotoProps = {
  posts: Post[]
  userId: string
}

type Props = {
  posts: getUserPostsResponse
}

const USER_ACHIEVEMENTS = {
  countFollowers: '2 358',
  countFollowing: '2 218',
  countPublications: '2 764',
}

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: GetServerSidePropsContext) => {
    const userId = context.query?.userId
    let posts
    const lastCursor = String('')

    if (userId) {
      const response = await store.dispatch(
        getUserPosts.initiate({ lastCursor, userId: userId as string })
      )

      posts = response?.data
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {
        posts,
      },
    }
  }
)

const Profile: NextPageWithLayout<Props> = ({ posts }: Props) => {
  const { data: meData, isLoading: startIsLoading } = useMeQuery()
  const currentUserId = meData?.userId
  const currentUserName = meData?.userName
  const { userId } = useParams()

  // console.log('initial posts', posts)

  const { lastCursor } = posts
  const t = useTranslation()

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery(
    { id: userId as string },
    { skip: !userId }
  )

  const [getUserPosts, { isLoading: isPostsLoading }] = useLazyGetUserPostsQuery()

  /*
  {
    lastCursor,
    userId: userId as string,
  }
   */

  if (!userId || startIsLoading || isLoadingProfile || isPostsLoading) {
    return <Spinner />
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
            src={profileData?.originalAvatarUrl || '/default-avatar.jpg'}
            width={204}
          />
        </div>
        <div className={s.info}>
          <div className={s.profileUrl}>
            <h1>{currentUserName}</h1>
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
      {posts.posts ? (
        <PublicationsPhoto posts={posts.posts} userId={userId as string} />
      ) : (
        <div>There is no any data...</div>
      )}
    </div>
  )
}

const ProfileStats: NextPageWithLayout<ProfileStatsProps> = () => {
  const t = useTranslation()
  const { data: meData } = useMeQuery()
  const currentUserId = meData?.userId
  const { error: profileError } = useGetProfileQuery({ id: currentUserId as string })
  let noProfile = false

  if (profileError && 'status' in profileError && profileError.status === 404) {
    noProfile = true
  }

  return (
    <div className={s.stats}>
      <p className={clsx(s.statsItem, s.statsFollowing)}>
        <a href={'#'}>
          <div>{!noProfile ? USER_ACHIEVEMENTS.countFollowing : '0'}</div>
          <span className={s.statsItemName}> {t.myProfile.following} </span>
        </a>
      </p>

      <p className={clsx(s.statsItem, s.statsFollowers)}>
        <a href={'#'}>
          <div>{!noProfile ? USER_ACHIEVEMENTS.countFollowers : '0'}</div>
          <span className={s.statsItemName}> {t.myProfile.followers} </span>
        </a>
      </p>

      <p className={clsx(s.statsItem, s.statsPublications)}>
        <div>{!noProfile ? USER_ACHIEVEMENTS.countPublications : '0'} </div>
        <span className={s.statsItemName}> {t.myProfile.publications} </span>
      </p>
    </div>
  )
}

const PublicationsPhoto: NextPageWithLayout<PublicationsPhotoProps> = ({ posts, userId }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const element = scrollAreaRef.current
  const [mouseOver, setmouseOver] = useState(false)

  useEffect(() => {

    const handleWheel = (event: WheelEvent) => {
      const { deltaY } = event

      if (deltaY > 0) {
        console.log(' deltaY down: ', deltaY)
        // scrollContainer.scrollBy(0, 100) // Прокрутка down на 100px
      } else {
        console.log(' deltaY up: ', deltaY)
        // scrollContainer.scrollBy(0, -100) // Прокрутка up на 100px
      }
    }

    if (element) {
      // element.addEventListener('mouseover', handleMouseOver)
      // element.addEventListener('mouseout', handleMouseOut)
      element.addEventListener('wheel', handleWheel)
    }

    return () => {
      if (element) {
        // element.removeEventListener('mouseover', handleMouseOver)
        // element.removeEventListener('mouseout', handleMouseOut)
        element.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  return (
    <div className={s.photoGrid} ref={scrollAreaRef}>
      {posts.map(post => {
        const imagePreview = post.images.find(item => {
          return item.originalImageUrl
        })

        return (
          <Link
            className={s.photoItem}
            href={`${PATH.PROFILE}/${userId}/post/${post.postId}`}
            key={post.postId}
          >
            <Image
              alt={`User photo ${post.postId}`}
              height={228}
              layout={'responsive'}
              src={imagePreview?.originalImageUrl || '/photo-default-1.png'}
              width={234}
            />
          </Link>
        )
      })}
    </div>
  )
}

Profile.getLayout = getCombinedLayout

export default Profile
