import MainPage from '@/components/MainPage/MainPage'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import {
  getPosts,
  getRunningQueriesThunk as getRunningPostQueriesThunk,
} from '@/services/posts/posts-api'
import { Post } from '@/services/posts/posts-types'
import {
  getRunningQueriesThunk as getRunningProfileQueriesThunk,
  getUsersCount,
} from '@/services/profile/profile-api'
import { wrapper } from '@/services/store'
import { GetServerSidePropsContext } from 'next'

type Props = {
  posts: Post[]
  usersCount: number
}
export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: GetServerSidePropsContext) => {
    let posts
    let usersCount

    const postsResponse = await store.dispatch(getPosts.initiate({ pageNumber: 1, pageSize: 4 }))

    posts = postsResponse?.data

    const usersCountResponse = await store.dispatch(getUsersCount.initiate())

    usersCount = usersCountResponse?.data?.totalCount

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
  // const { data, isLoading } = useMeQuery()
  // const router = useRouter()
  //
  // if (!isLoading && !data) {
  //   void router.replace(PATH.LOGIN)
  // }
  //
  // if (isLoading) {
  //   return <Spinner />
  // }

  return <MainPage posts={posts} usersCount={usersCount} />
}

Home.getLayout = getHeaderLayout
export default Home
