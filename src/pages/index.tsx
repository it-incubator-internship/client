import Spinner from '@/components/Spinner/Spinner'
import { PATH } from '@/consts/route-paths'
import { useMeQuery } from '@/services/auth/authApi'
import { useRouter } from 'next/router'

function Home() {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()

  if (!isLoading && data) {
    void router.replace(`/profile/${data?.userId}/edit`)

    return
  } else {
    void router.replace(PATH.LOGIN)
  }

  return <Spinner />
}

export default Home
