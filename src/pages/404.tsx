import Image from 'next/image'
import Link from 'next/link'

import image404 from '../../public/image404.png'

const NotFound = () => (
  <div>
    <div className={'wrapper404'}>
      <h1 style={{ fontSize: 50 }}>OOPS! PAGE NOT FOUND.</h1>
      <Image alt={'Picture 404 errors'} src={image404} />
      <Link href={'/'}>
        You can return to the <span style={{ color: 'var(--color-accent-500)' }}>home page.</span>
      </Link>
    </div>
  </div>
)

export default NotFound
