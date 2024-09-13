import Image from 'next/image'
import Link from 'next/link'

import image500 from '../../public/image500.png'

const ServerError = () => (
  <div>
    <div className={'wrapper500'}>
      <h1 style={{ fontSize: 50 }}>OOPS! INTERNAL SERVER ERROR.</h1>
      <p>An unexpected error has occurred on the server. Please wait, it will be fixed soon.</p>
      {/*<Image alt={'Picture 500 errors'} src={image500} />*/}
      <Link href={'/'}>
        Try to return to the <span style={{ color: 'var(--color-accent-500)' }}>home page.</span>
      </Link>
    </div>
  </div>
)

export default ServerError
