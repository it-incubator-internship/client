import Spinner from '@/components/Spinner/Spinner'
import { getCombinedLayout } from '@/components/layouts/CombinedLayout/CombinedLayout'
import { PATH } from '@/consts/route-paths'
import Profile from '@/pages/profile'
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

  void router.replace(PATH.PROFILE)
}

Home.getLayout = getCombinedLayout
export default Home
