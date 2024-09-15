import { useState } from 'react'

import Spinner from '@/components/Spinner/Spinner'
import TimeManagement from '@/pages/link-expired/TimeManagement'
import { useResendEmailMutation } from '@/services/password-recovery/password-recovery-api'
import { ServerError } from '@/services/password-recovery/password-recovery-types'
import { useThrottle } from '@/utils/throttleButtonClick'
import { Button, Modal } from '@robur_/ui-kit'

import s from '@/pages/link-expired/link-expired.module.scss'

type PasswordLinkExpiredProps = {
  email: string
}

export function PasswordLinkExpired({ email }: PasswordLinkExpiredProps) {
  const [resendEmail, { error, isError, isLoading }] = useResendEmailMutation()
  const serverError = (error as ServerError)?.data?.fields[0]?.message
  const [showThrottleModal, setShowThrottleModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { throttled } = useThrottle(60)

  const resendHandler = async () => {
    if (throttled()) {
      setShowThrottleModal(true)

      return
    }
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
    alert(serverError)
  }

  return (
    <div className={s.outerWrapper}>
      <div className={s.innerWrapper}>
        <h1 className={s.title}>Email verification link expired</h1>
        <p className={s.text}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <Button fullWidth onClick={resendHandler}>
          Resend link
        </Button>
      </div>
      <TimeManagement />
      <Modal
        buttonTitle={'OK'}
        onClose={() => setShowSuccessModal(false)}
        open={showSuccessModal}
        title={'Email sent'}
      >
        <p>We have sent a link to confirm your email to {email}</p>
      </Modal>
      <Modal buttonTitle={'OK'} onClose={handleCloseThrottleModal} open={showThrottleModal}>
        <p>Please wait {throttled()?.toFixed(0)} seconds before trying to send the link again.</p>
      </Modal>
    </div>
  )
}
