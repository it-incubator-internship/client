import { Fragment, ReactElement, ReactNode, useEffect, useRef, useState } from 'react'

import Spinner from '@/components/Preloaders/Spinner/Spinner'
import ThreeDotsLoader from '@/components/Preloaders/ThreeDots/ThreeDotsLoader'
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
  lastCursor?: string
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

    if (userId) {
      const response = await store.dispatch(getUserPosts.initiate({ userId: userId as string }))

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
  const { userId } = useParams()

  const { lastCursor } = posts
  const t = useTranslation()

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery(
    { id: userId as string },
    { skip: !userId }
  )

  if (!userId || startIsLoading || isLoadingProfile) {
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
          {profileData?.firstName && (
            <div className={s.profileUrl}>
              <h1>
                {profileData.firstName} {profileData.lastName}
              </h1>
            </div>
          )}
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
        <PublicationsPhoto lastCursor={lastCursor} posts={posts.posts} userId={userId as string} />
      ) : (
        <div>{t.other.noData}</div>
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

const PublicationsPhoto: NextPageWithLayout<PublicationsPhotoProps> = ({
  lastCursor,
  posts: initialPosts,
  userId,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [getUserPosts, { isLoading: isPostsLoading }] = useLazyGetUserPostsQuery()
  const [currentCursor, setCurrentCursor] = useState<null | string>('')
  const [addedPosts, setAddedPosts] = useState<Post[]>(initialPosts)
  const [posts, setPosts] = useState<Post[]>(initialPosts || [])

  useEffect(() => {
    const element = scrollAreaRef.current
    const image = element?.querySelector('[class*="profile_photoItem"]')
    const imageHeight = image && image.getBoundingClientRect().height
    const getBoundingClientRectTop = image && image.getBoundingClientRect().top

    const emptySpaceHeight = window.innerHeight - (getBoundingClientRectTop as number)

    const verticalGap = 12
    const amountOfPictureRowsToAddInEmptySpace =
      emptySpaceHeight / ((imageHeight as number) + verticalGap) / 2

    //if resolution about 2560px it's neseccary to preload more posts rows
    const _ROWSGOTFROMSERVERMULTIPLEOFEIGHT = 1
    const diffOfRowsToGetFromServer =
      Math.ceil(amountOfPictureRowsToAddInEmptySpace) - _ROWSGOTFROMSERVERMULTIPLEOFEIGHT

    if (diffOfRowsToGetFromServer > 0) {
      for (let i = 0; i <= diffOfRowsToGetFromServer; i++) {
        void getSomeMorePosts()
      }
    }
  }, [])

  useEffect(() => {
    const handleWheel = async (event: WheelEvent) => {
      const { deltaY } = event
      // event.preventDefault()
      // const scrollSpeed = 0.9

      // Модификация deltaY для замедления
      // const newDeltaY = deltaY * scrollSpeed

      deltaY > 0 && (await getSomeMorePosts())
    }

    window.addEventListener('wheel', handleWheel)
    // window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [currentCursor, addedPosts])

  async function getSomeMorePosts() {
    try {
      if (addedPosts.length > 0) {
        const res = await getUserPosts({
          lastCursor: currentCursor ? currentCursor : (lastCursor as string),
          userId: userId as string,
        })

        const { lastCursor: newLastCursor, posts: addedPostsWithNewCursor } =
          res?.data as getUserPostsResponse

        if (newLastCursor) {
          setAddedPosts(addedPostsWithNewCursor)

          setPosts(prevPosts => {
            const existingPostIds = new Set(prevPosts.map(post => post.postId))
            const uniquePosts = addedPostsWithNewCursor.filter(
              post => !existingPostIds.has(post.postId)
            )

            return [...prevPosts, ...uniquePosts]
          })

          setCurrentCursor(newLastCursor)
        } else {
          setAddedPosts([])
        }
      }
    } catch (error) {
      console.error('Error fetching posts: ', error)
    }
  }

  return (
    <>
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
                src={imagePreview?.originalImageUrl || '/photo-default.jpg'}
                width={234}
              />
            </Link>
          )
        })}
      </div>
      {isPostsLoading && <ThreeDotsLoader />}
    </>
  )
}

Profile.getLayout = getCombinedLayout

export default Profile
