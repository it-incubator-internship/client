import { getSideBarLayout } from '@/components/layouts/SidebarLayout/SidebarLayout'
import Link from 'next/link'

function Home() {
  return (
    <>
      <main>
        <div className={'container'}>
          <h1 style={{ fontSize: 30, marginBottom: 20 }}>Home page</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Link href={'/sign-in'}>Sign in</Link>
            <Link href={'/sign-up'}>Sign up</Link>
            <Link href={'/profile'}>Profile</Link>
            <Link href={'/create-new-password'}>Create new password</Link>
            <Link href={'/forgot-password'}>Forgot-password</Link>
          </div>
        </div>
      </main>
    </>
  )
}

Home.getLayout = getSideBarLayout

export default Home
