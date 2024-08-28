import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, FormInput } from '@robur_/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { z } from 'zod'

import s from './forgot-password.module.scss'

type FlowState = 'initial' | 'success'

const FormSchema = z.object({
  email: z.string({ message: 'This field is required' }).email({ message: 'Not valid email' }),
})

function ForgotPassword() {
  const { control, handleSubmit, setError } = useForm({ resolver: zodResolver(FormSchema) })
  const formSubmit = handleSubmit(data => {
    console.log(data)
    setError('email', { message: "User with this email doesn't exist", type: 'manual' })
  })

  //state, should be change to state from redux
  const [sendLinkState, setSendLinkState] = useState<FlowState>('initial')

  return (
    <Card className={s.card}>
      <h1 className={s.title}>Forgot password</h1>
      <form onSubmit={formSubmit}>
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
        <Button className={s.btnSend} fullWidth>
          {sendLinkState === 'success' ? 'Send Link Again' : 'Send Link'}
        </Button>
      </form>
      <Button asChild className={s.btnBack} variant={'ghost'}>
        <Link href={'/sign-in'}>Back to Sign In</Link>
      </Button>
      {sendLinkState !== 'success' && <div className={s.recaptcha}>Recaptcha</div>}
    </Card>
  )
}

ForgotPassword.getLayout = getHeaderLayout
export default ForgotPassword
