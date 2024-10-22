import { useTranslation } from '@/hooks/useTranslation'
import Image from 'next/image'
import Link from 'next/link'

const NotFound = () => {
  const t = useTranslation()

  return (
    <div>
      <div className={'wrapper404'}>
        <h1 style={{ fontSize: 50 }}>{t.errors.oopsPageNotFound}</h1>
        <Image alt={'Picture 404 errors'} height={192} src={'/image404.png'} width={451} />
        <Link href={'/'}>
          {t.errors.youCanReturnToThe}
          <span style={{ color: 'var(--color-accent-500)' }}> {t.errors.homePage}</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
