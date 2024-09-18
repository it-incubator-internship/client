import { useState } from 'react'
import { toast } from 'react-toastify'

import Spinner from '@/components/Spinner/Spinner'
import { useTranslation } from '@/hooks/useTranslation'
import { useResendEmailMutation } from '@/services/password-recovery/password-recovery-api'
import { ServerError } from '@/services/password-recovery/password-recovery-types'
import { showErrorToast } from '@/utils/toastConfig'
import { Button, Modal } from '@robur_/ui-kit'

import s from './password-link-expired.module.scss'

import TimeManagement from './TimeManagement'

type PasswordLinkExpiredProps = {
  email: string
}

export function PasswordLinkExpired({ email }: PasswordLinkExpiredProps) {
  const [resendEmail, { error, isError, isLoading }] = useResendEmailMutation()
  const [showThrottleModal, setShowThrottleModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const t = useTranslation()
  //throttle
  const [lastClickTime, setLastClickTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  //

  const resendHandler = async () => {
    const currentTime = Date.now()

    if (currentTime - lastClickTime < 60000) {
      const remainingTime = Math.ceil((60000 - (currentTime - lastClickTime)) / 1000)

      setRemainingTime(remainingTime)
      setShowThrottleModal(true)

      return
    }
    setLastClickTime(currentTime)

    await resendEmail({ email })
    setShowSuccessModal(true)
  }

  const handleCloseThrottleModal = () => {
    setShowThrottleModal(false)
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    const errorMessage = (error as ServerError).data?.message || 'Unexpected error occurred.'

    showErrorToast(errorMessage)
  }

  return (
    <div className={s.outerWrapper}>
      <div className={s.innerWrapper}>
        <h1 className={s.title}>{t.createNewPassword.passwordLinkExpired.title}</h1>
        <p className={s.text}>{t.createNewPassword.passwordLinkExpired.subtitle}</p>
        <Button fullWidth onClick={resendHandler}>
          {t.createNewPassword.passwordLinkExpired.button}
        </Button>
      </div>
      <TimeManagement />
      <Modal
        buttonTitle={t.createNewPassword.passwordLinkExpired.modal.buttonTitle}
        onClose={() => setShowSuccessModal(false)}
        open={showSuccessModal}
        title={t.createNewPassword.passwordLinkExpired.modal.title}
      >
        <p>
          {t.createNewPassword.passwordLinkExpired.modal.subtitle}
          {email}
        </p>
      </Modal>
      <Modal
        buttonTitle={t.createNewPassword.passwordLinkExpired.modal.buttonTitle}
        onClose={handleCloseThrottleModal}
        open={showThrottleModal}
        title={''}
      >
        <p>
          {t.createNewPassword.passwordLinkExpired.modal.throttleSubtitleStart}
          {remainingTime}
          {t.createNewPassword.passwordLinkExpired.modal.throttleSubtitleEnd}
        </p>
      </Modal>
    </div>
  )
}
