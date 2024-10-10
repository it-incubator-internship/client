import { useForm } from 'react-hook-form'

import { SocialMediaAuth } from '@/components/SocialMediaAuth/SocialMediaAuth'
import Spinner from '@/components/Spinner/Spinner'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useLazyMeQuery, useLoginMutation, useMeQuery } from '@/services/auth/authApi'
import { LoginArgs } from '@/services/auth/authTypes'
import { customErrorHandler } from '@/utils/customErrorHandler'
import { Button, Card, FormInput } from '@demorest49de/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { z } from 'zod'

import s from './signIn.module.scss'

const SigninSchema = z.object({
  email: z.string().min(1, { message: 'This field is required' }).email(),
  password: z.string().min(1, { message: 'This field is required' }),
})

type FormValues = z.infer<typeof SigninSchema>
type ZodKeys = keyof FormValues

function SignIn() {
  const [login, { isLoading }] = useLoginMutation()
  const { data: meData, isLoading: startIsLoading } = useMeQuery()
  const [getMe] = useLazyMeQuery()
  const router = useRouter()

  const t = useTranslation()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SigninSchema),
  })
  const handleSignIn = async (data: LoginArgs) => {
    try {
      await login(data).unwrap()

      const meRes = await getMe()

      const userId = meRes?.data?.userId

      if (!userId) {
        return
      } else {
        void router.replace(`/profile-settings/${userId}`)

        return
      }
    } catch (error: unknown) {
      customErrorHandler<ZodKeys>({ error, setError, specificField: 'email', translations: t })
    }
  }

  if (startIsLoading) {
    return <Spinner />
  } else if (meData) {
    void router.replace(`/`)

    return
  }

  return (
    <div className={s.Container}>
      <Card className={s.Card}>
        <h1 className={s.Title}>{t.auth.signIn}</h1>
        <form className={s.Form} onSubmit={handleSubmit(handleSignIn)}>
          <SocialMediaAuth />
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            error={errors?.email}
            label={'Email'}
            name={'email'}
          />
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            error={errors?.password}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
          <Button className={s.ButtonSignIn} disabled={isLoading} fullWidth>
            {t.auth.signIn}
          </Button>
        </form>
        <Button asChild className={clsx(s.ButtonForgot, s.leftItem)} variant={'ghost'}>
          <Link href={PATH.FORGOT_PASSWORD}>{t.auth.forgotPassword}</Link>
        </Button>
        <div className={s.ButtonAccount}>{t.auth.noAccount}</div>
        <Button asChild className={s.ButtonSignUp} variant={'ghost'}>
          <Link href={PATH.REGISTRATION}>{t.auth.signUp}</Link>
        </Button>
      </Card>
    </div>
  )
}

SignIn.getLayout = getHeaderLayout
export default SignIn
