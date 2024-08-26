import { getLayout } from '@/components/Layout/Layout'
import Link from 'next/link'

function Home() {
  return (
    <main>
      <div className={'container'}>
        <h1>Home page</h1>
        <div>
          <Link href={'/sign-in'}>Sign in</Link>
          <Link href={'/sign-up'}>Sign up</Link>
          <Link href={'/profile'}>Profile</Link>
        </div>
      </div>
    </main>
  )
}

Home.getLayout = getLayout

export default Home
