import Spinner from '@/components/Spinner/Spinner'
import { PATH } from '@/consts/route-paths'
import { useMeQuery } from '@/services/auth/authApi'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

function Authentication() {
  const router = useRouter()
  const params = useParams<{ accessToken: string }>()

  localStorage.setItem('accessToken', params.accessToken)
  const { data: meData, isLoading } = useMeQuery()

  if (isLoading) {
    return <Spinner />
  } else if (meData) {
    // router.replace(`/profile/${meData.userId}`)
    //
    // return
    console.log('success', meData)
  } else {
    console.log('fail')
    // router.replace(PATH.LOGIN)
  }

  return <div>Authentication</div>
}
export default Authentication
