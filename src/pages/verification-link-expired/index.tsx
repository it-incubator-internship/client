import { useState } from 'react'

import Spinner from '@/components/Preloaders/Spinner/Spinner'
import { useTranslation } from '@/hooks/useTranslation'
import { useRegistrationResendingMutation } from '@/services/auth/authApi'
import { Button, Modal } from '@robur_/ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './verification-link-expired.module.scss'

import src from '../../../public/TimeManagement.png'

export default function LinkExpired() {
  const router = useRouter()
  const t = useTranslation()
  const { email } = router.query
  const [registrationResending, { isLoading }] = useRegistrationResendingMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [responseEmail, setResponseEmail] = useState('')

  const [isSpinnerWorking, setIsSpinnerWorking] = useState(false)

  const handleOnClick = async () => {
    try {
      if (email && typeof email === 'string') {
        void (await registrationResending({ email }).unwrap())

        setIsModalOpen(true)
        setResponseEmail(email)
      }
    } catch (error: any) {
      console.log(`error into LinkExpired: ${error}`)
    }
  }

  if (isLoading || isSpinnerWorking) {
    return <Spinner />
  }

  const args = {
    buttonTitle: t.verificationLinkExpired.modal.buttonTitle,
    children: (
      <>
        {t.verificationLinkExpired.modal.subtitle}
        <span>` ${responseEmail}`</span>
      </>
    ),
    onClose: () => {
      setIsModalOpen(false)
      setIsSpinnerWorking(true)
      void router.replace('/sign-in')
    },
    open: true,
    title: t.verificationLinkExpired.modal.title,
  }

  const modalJSX = <Modal {...args}>{args.children}</Modal>

  return isModalOpen ? (
    modalJSX
  ) : (
    <div className={s.container}>
      <div className={s.outerWrapper}>
        <div className={s.innerWrapper}>
          <h1 className={s.title}>{t.verificationLinkExpired.title}</h1>
          <p className={s.text}>{t.verificationLinkExpired.subtitle}</p>
          <Button onClick={handleOnClick}>{t.verificationLinkExpired.button}</Button>
        </div>
        <Image alt={'email-confirmed'} className={s.image} src={src} />
      </div>
    </div>
  )
}
