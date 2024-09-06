import Spinner from '@/components/Spinner/Spinner'
import { PATH } from '@/consts/route-paths'
import { useMeQuery } from '@/services/auth/authApi'
import { useRouter } from 'next/router'

function Authentication() {
  const router = useRouter()

  localStorage.setItem('accessToken', JSON.stringify(router.query.accessToken))

  const { data: meData, isLoading } = useMeQuery()

  if (isLoading) {
    return <Spinner />
  } else if (meData) {
    router.replace(`/profile/${meData.userId}`)

    return
  } else {
    router.replace(PATH.LOGIN)
  }

  return <div>Authentication</div>
}
export default Authentication
