import Spinner from '@/components/Spinner/Spinner'
import { getCombinedLayout } from '@/components/layouts/CombinedLayout/CombinedLayout'
import { PATH } from '@/consts/route-paths'
import MyProfile from '@/pages/my-profile'
import { useMeQuery } from '@/services/auth/authApi'
import { useRouter } from 'next/router'

function Home() {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()

  if (!isLoading && !data) {
    void router.replace(PATH.LOGIN)
  }

  if (isLoading) {
    return <Spinner />
  }

  return <MyProfile />
}

Home.getLayout = getCombinedLayout
export default Home
