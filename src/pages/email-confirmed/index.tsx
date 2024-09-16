import { useEffect, useState } from 'react'

import Spinner from '@/components/Spinner/Spinner'
import { useRegistrationConfirmationMutation } from '@/services/auth/authApi'
import { Button } from '@robur_/ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './email-confirmed.module.scss'

import src from '../../../public/email-confirmed.png'

export default function EmailConfirmed() {
  const router = useRouter()
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
    router.replace('/sign-in')
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
          <h1 className={s.title}>Congratulations!</h1>
          <p className={s.text}>Your email has been confirmed</p>
          <Button onClick={handleOnClick}>Sign in</Button>
        </div>
        <Image alt={'email sent'} className={s.image} src={src} />
      </div>
    </div>
  )
}
