import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, FormInput } from '@robur_/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { z } from 'zod'

import s from './forgot-password.module.scss'

type FlowState = 'fail' | 'initial' | 'success'

const FormSchema = z.object({
  email: z.string({ message: 'This field is required' }).email({ message: 'Not valid email' }),
})

export default function ForgotPassword() {
  const { control, handleSubmit } = useForm({ resolver: zodResolver(FormSchema) })
  const formSubmit = handleSubmit(data => console.log(data))

  //state, should be change to state from redux
  const [sendLinkState, setSendLinkState] = useState<FlowState>('success')

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <h1 className={s.title}>Forgot password</h1>
        <form onSubmit={formSubmit}>
          <FormInput
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={'Epam@epam.com'}
            width={'100%'}
          />
          {sendLinkState === 'fail' && (
            <span className={clsx(s.text, s.textError)}>
              {"User with this email doesn't exist"}
            </span>
          )}
          <p className={s.text}>
            Enter your email address and we will send you further instructions
          </p>
          {sendLinkState === 'success' && (
            <p className={clsx(s.text, s.successText)}>
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
    </div>
  )
}
