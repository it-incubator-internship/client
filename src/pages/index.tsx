import MainPage from '@/components/MainPage/MainPage'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import {
  getPosts,
  getRunningQueriesThunk as getRunningPostQueriesThunk,
} from '@/services/posts/posts-api'
import { PostWithOwner } from '@/services/posts/posts-types'
import {
  getRunningQueriesThunk as getRunningProfileQueriesThunk,
  getUsersCount,
} from '@/services/profile/profile-api'
import { wrapper } from '@/services/store'
import { GetServerSidePropsContext } from 'next'

type Props = {
  posts: PostWithOwner[]
  usersCount: number
}
export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: GetServerSidePropsContext) => {
    const postsResponse = await store.dispatch(getPosts.initiate({ pageNumber: 1, pageSize: 4 }))

    const posts = postsResponse?.data

    const usersCountResponse = await store.dispatch(getUsersCount.initiate())

    const usersCount = usersCountResponse?.data?.totalCount

    await Promise.all([
      store.dispatch(getRunningPostQueriesThunk()),
      store.dispatch(getRunningProfileQueriesThunk()),
    ])

    return {
      props: {
        posts,
        usersCount,
      },
    }
  }
)

function Home({ posts, usersCount }: Props) {
  console.log('posts', posts)

  return <MainPage posts={posts} usersCount={usersCount} />
}

Home.getLayout = getHeaderLayout
export default Home
