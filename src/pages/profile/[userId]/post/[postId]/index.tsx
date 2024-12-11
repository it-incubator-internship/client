import { ReactElement, ReactNode } from 'react'

import { PublicationsPhoto } from '@/components/PublicationsPhoto'
import Spinner from '@/components/Preloaders/Spinner/Spinner'
import { getCombinedLayout } from '@/components/layouts/CombinedLayout/CombinedLayout'
import { PostDialog } from '@/components/posts/post-dialog/ui/post-dialog/post-dialog'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useMeQuery } from '@/services/auth/authApi'
import { getRunningQueriesThunk, getUserPost, getUserPosts } from '@/services/posts/posts-api'
import { Post, getUserPostsResponse } from '@/services/posts/posts-types'
import { useGetProfileQuery } from '@/services/profile/profile-api'
import { wrapper } from '@/services/store'
import { Button } from '@robur_/ui-kit'
import clsx from 'clsx'
import { GetServerSidePropsContext, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from '../../../profile.module.scss'

type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type ProfileStatsProps = {
  countFollowers?: string
  countFollowing?: string
  countPublications?: string
}

const USER_ACHIEVEMENTS = {
  countFollowers: '2 358',
  countFollowing: '2 218',
  countPublications: '2 764',
}

type Props = {
  currentPost: Post
  posts: getUserPostsResponse
}

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: GetServerSidePropsContext) => {
    const userId = context.query?.userId
    const postId = context.query?.postId
    let posts
    let currentPost

    if (userId) {
      const response = await store.dispatch(getUserPosts.initiate({ userId: userId as string }))

      posts = response?.data
    }

    if (postId) {
      const response = await store.dispatch(getUserPost.initiate({ postId: postId as string }))

      currentPost = response?.data
    }

    if (!currentPost) {
      return {
        notFound: true,
      }
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {
        currentPost,
        posts,
      },
    }
  }
)

const ProfilePost: NextPageWithLayout<Props> = ({ currentPost, posts }) => {
  const { data: meData, isLoading: startIsLoading } = useMeQuery()
  const currentUserId = meData?.userId
  const router = useRouter()
  const { userId } = useParams()

  const t = useTranslation()

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery(
    { id: userId as string },
    { skip: !userId }
  )

  if (!userId || startIsLoading || isLoadingProfile) {
    return <Spinner />
  }

  if (!isLoadingProfile && !profileData) {
    void router.replace(PATH.NOT_FOUND)
  }

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
              src={profileData?.originalAvatarUrl || '/default-avatar.jpg'}
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
      {posts ? <PublicationsPhoto posts={posts.posts} /> : <div>There is no any data...</div>}
      {currentPost && (
        <PostDialog
          isOpen
          isPostSpecificPage
          post={currentPost}
          profileData={profileData}
          userId={userId as string}
        />
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

ProfilePost.getLayout = getCombinedLayout

export default ProfilePost
