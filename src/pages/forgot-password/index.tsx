import { useCallback, useState } from 'react'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'

import Spinner from '@/components/Spinner/Spinner'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
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
  const [lastClickTime, setLastClickTime] = useState(0)

  //local component states
  const [showModal, setShowModal] = useState(false)
  const [sendLinkState, setSendLinkState] = useState<FlowState>('initial')
  const [recaptchaState, setRecaptchaState] = useState<
    'checked' | 'expired' | 'initial' | 'loading' | 'withError'
  >('initial')

  //libs hooks
  const { executeRecaptcha } = useGoogleReCaptcha()

  const { control, handleSubmit, reset, setError, watch } = useForm({
    resolver: zodResolver(FormSchema),
  })
  const [checkEmail, { isLoading: isLoadingCheckEmail }] = useCheckEmailMutation()

  const [resendEmail, { isLoading: isLoadingResendEmail }] = useResendEmailMutation()

  //check the email field for buttonSend disabling
  const emailValue = watch('email', '')

  //handlers
  const dataFormSubmit = handleSubmit(async data => {
    try {
      await checkEmail({ email: data.email, recaptchaToken }).unwrap()
      setEmail(data.email)
      setSendLinkState('success')
      setShowModal(true)
    } catch (e) {
      setError('email', { message: "User with this email doesn't exist", type: 'manual' })
    }
  })

  const recaptchaFormSubmit = async (event: any) => {
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

  const handleCloseModal = () => {
    setShowModal(false)
    reset()
  }

  const isBtnDisabled = () => {
    if (sendLinkState === 'success') {
      return false
    }

    return !emailValue || !recaptchaToken
  }

  const handleResendEmail = useCallback(async () => {
    const currentTime = Date.now()

    if (currentTime - lastClickTime < 60000) {
      const remainingTime = Math.ceil((60000 - (currentTime - lastClickTime)) / 1000)

      alert(`Please wait ${remainingTime} seconds before trying to send the link again.`)

      return
    }

    setLastClickTime(currentTime)
    await resendEmail({ email }).unwrap()
    setShowModal(true)
  }, [resendEmail, lastClickTime, email])

  //Guards
  if (isLoadingCheckEmail || isLoadingResendEmail) {
    return <Spinner />
  }

  return (
    <Card className={s.card}>
      <h1 className={s.title}>Forgot password</h1>

      <form onSubmit={dataFormSubmit}>
        <FormInput
          className={s.input}
          control={control}
          disabled={sendLinkState === 'success'}
          label={'Email'}
          name={'email'}
          placeholder={email ?? 'Epam@epam.com'}
          width={'100%'}
        />
        <p className={clsx(s.text, s.textTip)}>
          Enter your email address and we will send you further instructions
        </p>
        {sendLinkState === 'success' && (
          <p className={s.text}>
            The link has been sent by email. If you don’t receive an email send link again
          </p>
        )}
        <Button
          className={s.btnSend}
          disabled={isBtnDisabled()}
          fullWidth
          onClick={sendLinkState === 'success' ? handleResendEmail : undefined}
          type={sendLinkState === 'success' ? 'button' : 'submit'}
        >
          {sendLinkState === 'success' ? 'Send Link Again' : 'Send Link'}
        </Button>
      </form>

      <Button asChild className={s.btnBack} variant={'ghost'}>
        <Link href={'/sign-in'}>Back to Sign In</Link>
      </Button>

      {sendLinkState !== 'success' && (
        <form className={s.recaptcha} onSubmit={recaptchaFormSubmit}>
          <Recaptcha variant={recaptchaState} />
        </form>
      )}

      <Modal buttonTitle={'OK'} onClose={handleCloseModal} open={showModal} title={'Email sent'}>
        <p>We have sent a link to confirm your email to {email}</p>
      </Modal>
    </Card>
  )
}
