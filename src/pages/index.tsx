import Spinner from '@/components/Spinner/Spinner'
import UsersBar from '@/components/UsersBar/UsersBar'
import { getCombinedLayout } from '@/components/layouts/CombinedLayout/CombinedLayout'
import { PATH } from '@/consts/route-paths'
import { useMeQuery } from '@/services/auth/authApi'
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
import { useRouter } from 'next/router'

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
  const { data, isLoading } = useMeQuery()
  const router = useRouter()

  if (!isLoading && !data) {
    void router.replace(PATH.LOGIN)
  }

  if (isLoading) {
    return <Spinner />
  }

  console.log('posts', posts)
  console.log('usersCount', usersCount)

  return (
    <div style={{ display: 'grid', height: '100vh', placeItems: 'center', width: '100%' }}>
      {usersCount && <UsersBar usersCount={usersCount} />}
    </div>
  )
}

Home.getLayout = getCombinedLayout
export default Home
