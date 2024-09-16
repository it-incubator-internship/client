import { useState } from 'react'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'

import Spinner from '@/components/Spinner/Spinner'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import {
  useCheckEmailMutation,
  useResendEmailMutation,
} from '@/services/password-recovery/password-recovery-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, FormInput, Modal, Recaptcha } from '@robur_/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { z } from 'zod'

import s from './forgot-password.module.scss'

type FlowState = 'initial' | 'success'

const FormSchema = z.object({
  email: z.string({ message: 'This field is required' }).email({ message: 'Not valid email' }),
})

function ForgotPasswordRecaptchaWrapper() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY as string}>
      <ForgotPassword />
    </GoogleReCaptchaProvider>
  )
}

ForgotPasswordRecaptchaWrapper.getLayout = getHeaderLayout
export default ForgotPasswordRecaptchaWrapper

const ForgotPassword = () => {
  //local data states
  const [email, setEmail] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState('')

  //modal window states
  const [showThrottleModal, setShowThrottleModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  //local component states
  const [sendLinkState, setSendLinkState] = useState<FlowState>('initial')
  const [recaptchaState, setRecaptchaState] = useState<
    'checked' | 'expired' | 'initial' | 'loading' | 'withError'
  >('initial')

  //hooks
  const t = useTranslation()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const { control, handleSubmit, reset, setError, watch } = useForm({
    resolver: zodResolver(FormSchema),
  })
  const [checkEmail, { error, isError, isLoading: isLoadingCheckEmail, isSuccess }] =
    useCheckEmailMutation()

  const [resendEmail, { isLoading: isLoadingResendEmail }] = useResendEmailMutation()

  //throttle
  const [lastClickTime, setLastClickTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  //

  //check the email field for buttonSend disabling
  const emailValue = watch('email', '')

  //handlers
  const HandleSubmitDataForm = handleSubmit(async data => {
    await checkEmail({ email: data.email, recaptchaToken })
      .unwrap()
      .then(() => {
        setEmail(data.email)
        setSendLinkState('success')
      })
      .then(() => {
        setShowSuccessModal(true)
      })
  })

  if (isError) {
    setError('email', { message: "User with this email doesn't exist", type: 'manual' })
  }

  const handleSubmitRecaptchaForm = async (event: any) => {
    event.preventDefault()
    setRecaptchaState('loading')
    if (!executeRecaptcha) {
      setError('email', { message: 'Execute recaptcha not yet available', type: 'manual' })

      return
    }

    const token = await executeRecaptcha('password_recovery')

    setRecaptchaToken(token)
    setRecaptchaState('checked')
  }

  const handleResendEmail = async () => {
    const currentTime = Date.now()

    if (currentTime - lastClickTime < 60000) {
      const remainingTime = Math.ceil((60000 - (currentTime - lastClickTime)) / 1000)

      setRemainingTime(remainingTime)
      setShowThrottleModal(true)

      return
    }
    setLastClickTime(currentTime)

    await resendEmail({ email }).unwrap()
    setShowSuccessModal(true)
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    reset()
  }

  const handleCloseThrottleModal = () => {
    setShowThrottleModal(false)
  }

  const isBtnDisabled = () => {
    if (sendLinkState === 'success') {
      return false
    }

    return !emailValue || !recaptchaToken
  }

  //Guards
  if (isLoadingCheckEmail || isLoadingResendEmail) {
    return <Spinner />
  }

  return (
    <Card className={s.card}>
      <h1 className={s.title}>{t.forgotPassword.title}</h1>

      <form onSubmit={HandleSubmitDataForm}>
        <FormInput
          containerClassName={s.inputContainer}
          control={control}
          disabled={sendLinkState === 'success'}
          label={t.forgotPassword.inputLabel}
          name={'email'}
          placeholder={email ?? 'Epam@epam.com'}
          width={'100%'}
        />
        <p className={clsx(s.text, s.textTip)}>{t.forgotPassword.subtitleInitial}</p>
        {sendLinkState === 'success' && (
          <p className={s.text}>{t.forgotPassword.subtitleSuccess}</p>
        )}
        <Button
          className={s.btnSend}
          disabled={isBtnDisabled()}
          fullWidth
          onClick={sendLinkState === 'success' ? handleResendEmail : undefined}
          type={sendLinkState === 'success' ? 'button' : 'submit'}
        >
          {sendLinkState === 'success'
            ? t.forgotPassword.buttonSendSuccess
            : t.forgotPassword.buttonSendInitial}
        </Button>
      </form>

      <Button asChild className={s.btnBack} variant={'ghost'}>
        <Link href={PATH.LOGIN}>{t.forgotPassword.buttonBack}</Link>
      </Button>

      {sendLinkState !== 'success' && (
        <form className={s.recaptcha} onSubmit={handleSubmitRecaptchaForm}>
          <Recaptcha label={t.forgotPassword.recaptchaLabel} variant={recaptchaState} />
        </form>
      )}

      <Modal
        buttonTitle={t.forgotPassword.modal.buttonTitle}
        onClose={handleCloseSuccessModal}
        open={showSuccessModal}
        title={t.forgotPassword.modal.title}
      >
        <p>
          {t.forgotPassword.modal.subtitle}
          {email}
        </p>
      </Modal>
      <Modal
        buttonTitle={t.forgotPassword.modal.buttonTitle}
        onClose={handleCloseThrottleModal}
        open={showThrottleModal}
        title={''}
      >
        <p>
          {t.forgotPassword.modal.throttleSubtitleStart}
          {remainingTime}
          {t.forgotPassword.modal.throttleSubtitleEnd}
        </p>
      </Modal>
    </Card>
  )
}
