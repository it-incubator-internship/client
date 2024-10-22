import { useTranslation } from '@/hooks/useTranslation'
import Image from 'next/image'
import Link from 'next/link'

const ServerError = () => {
  const t = useTranslation()

  return (
    <div>
      <div className={'wrapper500'}>
        <h1 style={{ fontSize: 50 }}>{t.errors.oopsInternalServerError}</h1>
        <Image alt={'Picture 404 errors'} height={192} src={'/image500.png'} width={451} />
        <p>{t.errors.anUnexpectedErrorHasOccurredServer}</p>
        {/*<Image alt={'Picture 500 errors'} src={image500} />*/}
        <Link href={'/'}>
          {t.errors.youCanReturnToThe}
          <span style={{ color: 'var(--color-accent-500)' }}> {t.errors.homePage}.</span>
        </Link>
      </div>
    </div>
  )
}

export default ServerError
