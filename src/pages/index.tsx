import Spinner from '@/components/Spinner/Spinner'
import { getCombinedLayout } from '@/components/layouts/CombinedLayout/CombinedLayout'
import { PATH } from '@/consts/route-paths'
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

  return (
    <div style={{ display: 'grid', height: '100vh', placeItems: 'center', width: '100%' }}>
      <h2>HOME PAGE</h2>
    </div>
  )
}

Home.getLayout = getCombinedLayout
export default Home
