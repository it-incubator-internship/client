import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className={'container'}>
        <h2>Navigation</h2>
        <div>
          <Link href={'/sign-in'}>Sign in</Link>
          <Link href={'/sign-up'}>Sign up</Link>
          <Link href={'/profile'}>Profile</Link>
          <Link href={'/forgot-password'}>Forgot-password</Link>
        </div>
      </div>
    </main>
  )
}
