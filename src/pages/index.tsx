import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className={'container'}>
        <h1>Hello world</h1>
        <h2>Navigation</h2>
        <div>
          <Link href={'/sign-in'}>Sign in</Link>
          <Link href={'/sign-up'}>Sign up</Link>
          <Link href={'/profile'}>Profile</Link>
        </div>
      </div>
    </main>
  )
}
