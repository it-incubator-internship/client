import { useEffect, useState } from 'react'

import Spinner from '@/components/Preloaders/Spinner/Spinner'
import { useTranslation } from '@/hooks/useTranslation'
import { useRegistrationConfirmationMutation } from '@/services/auth/authApi'
import { Button } from '@robur_/ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './email-confirmed.module.scss'

import src from '../../../public/email-confirmed.png'

export default function EmailConfirmed() {
  const router = useRouter()
  const t = useTranslation()
  const code = router.query.code
  const [registrationConfirmation, { isLoading }] = useRegistrationConfirmationMutation()

  const [isRedirected, setIsRedirected] = useState(false)

  useEffect(() => {
    const resData = async () => {
      try {
        if (code && typeof code === 'string') {
          await registrationConfirmation({ code }).unwrap()
        }
      } catch (error: any) {
        console.log(error)

        if (error.status === 403) {
          setIsRedirected(true)
          void router.replace(`/verification-link-expired?email=${error.data.message}`)
        }
      }
    }

    resData()
  }, [])
  const handleOnClick = () => {
    void router.replace('/sign-in')
  }

  if (isLoading) {
    return <Spinner />
  }

  return isRedirected ? (
    <></>
  ) : (
    <div className={s.container}>
      <div className={s.outerWrapper}>
        <div className={s.innerWrapper}>
          <h1 className={s.title}>{t.emailConfirmed.title}</h1>
          <p className={s.text}>{t.emailConfirmed.text}</p>
          <Button onClick={handleOnClick}>{t.emailConfirmed.buttonText}</Button>
        </div>
        <Image alt={'email sent'} className={s.image} src={src} />
      </div>
    </div>
  )
}
