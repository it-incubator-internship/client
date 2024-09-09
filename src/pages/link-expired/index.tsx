import { useCallback, useState } from 'react'

import Spinner from '@/components/Spinner/Spinner'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import TimeManagement from '@/pages/link-expired/TimeManagement'
import { useResendEmailMutation } from '@/services/password-recovery/password-recovery-api'
import { Button, Modal } from '@robur_/ui-kit'
import { router } from 'next/client'

import s from './link-expired.module.scss'

function LinkExpired() {
  const [resendEmail, { isLoading }] = useResendEmailMutation()
  const { email } = router.query
  const [lastClickTime, setLastClickTime] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const handleOnClick = useCallback(async () => {
    const currentTime = Date.now()

    if (currentTime - lastClickTime < 60000) {
      const remainingTime = Math.ceil((60000 - (currentTime - lastClickTime)) / 1000)

      alert(`Please wait ${remainingTime} seconds before trying to send the link again.`)

      return
    }
    setLastClickTime(currentTime)
    if (email && typeof email === 'string') {
      await resendEmail({ email })
      setShowModal(true)
    }
  }, [resendEmail, lastClickTime, email])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className={s.outerWrapper}>
      <div className={s.innerWrapper}>
        <h1 className={s.title}>Email verification link expired</h1>
        <p className={s.text}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <Button fullWidth onClick={handleOnClick}>
          Resend link
        </Button>
      </div>
      <TimeManagement />
      <Modal
        buttonTitle={'OK'}
        onClose={() => setShowModal(false)}
        open={showModal}
        title={'Email sent'}
      >
        <p>We have sent a link to confirm your email to {email}</p>
      </Modal>
    </div>
  )
}

LinkExpired.getLayout = getHeaderLayout
export default LinkExpired
