import { useEffect, useState } from 'react'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'

import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { useCheckEmailQuery } from '@/services/password-recovery/password-recovery-api'
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
  const { data: serverData, error } = useCheckEmailQuery(
    { email, recaptchaToken },
    { skip: !email || !recaptchaToken }
  )
  //check the email field for buttonSend disabling
  const emailValue = watch('email', '')
  //handlers
  const dataFormSubmit = handleSubmit(data => {
    setEmail(data.email)
  })

  const recaptchaFormSubmit = async (event: any) => {
    event.preventDefault()
    setRecaptchaState('loading')
    if (!executeRecaptcha) {
      // console.log('Execute recaptcha not yet available')

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

  //side effects
  useEffect(() => {
    if (serverData && serverData.email === email) {
      setShowModal(true)
      setSendLinkState('success')
    }
  }, [serverData, email])

  useEffect(() => {
    if (error) {
      setError('email', { message: "User with this email doesn't exist", type: 'manual' })
    }
  }, [error, setError])

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
        <Button className={s.btnSend} disabled={!emailValue || !recaptchaToken} fullWidth>
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
        <p>We have sent a link to confirm your email to {serverData?.email}</p>
      </Modal>
    </Card>
  )
}
