import { useEffect, useState } from 'react'
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
  const [checkEmail, { isError: isErrorCheckEmail, isLoading: isLoadingCheckEmail }] =
    useCheckEmailMutation()
  const [resendEmail, { isError: isErrorResendEmail, isLoading: isLoadingResendEmail }] =
    useResendEmailMutation()
  //check the email field for buttonSend disabling
  const emailValue = watch('email', '')
  //handlers
  const dataFormSubmit = handleSubmit(async data => {
    try {
      if (sendLinkState === 'initial') {
        await checkEmail({ email: data.email, recaptchaToken }).unwrap()
        setEmail(data.email)
        setSendLinkState('success')
      } else if (sendLinkState === 'success') {
        await resendEmail({ email }).unwrap()
      }
      setShowModal(true)
    } catch (error: any) {
      if (error.data?.statusCode === 400) {
        // setError('email', { message: "User with this email doesn't exist", type: 'manual' })
      }
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

  if (isLoadingCheckEmail || isLoadingResendEmail) {
    return <Spinner />
  }

  if (isErrorCheckEmail || isErrorResendEmail) {
    setError('email', { message: "User with this email doesn't exist", type: 'manual' })
  }

  const isBtnDisabled = () => {
    if (sendLinkState === 'success') {
      return false
    }

    return !emailValue || !recaptchaToken
  }

  return (
    <Card className={s.card}>
      <h1 className={s.title}>Forgot password</h1>
      <form onSubmit={dataFormSubmit}>
        <FormInput
          className={s.input}
          control={control}
          label={'Email'}
          name={'email'}
          placeholder={'Epam@epam.com'}
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
        <Button className={s.btnSend} disabled={isBtnDisabled()} fullWidth>
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
