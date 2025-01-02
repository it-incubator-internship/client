import { useForm } from 'react-hook-form'

import { SocialMediaAuth } from '@/components/SocialMediaAuth/SocialMediaAuth'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { signInSchema } from '@/schemas/signInSchema'
import { useLazyMeQuery, useLoginMutation } from '@/services/auth/authApi'
import { LoginArgs } from '@/services/auth/authTypes'
import { customErrorHandler } from '@/utils/customErrorHandler'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, FormInput } from '@demorest49de/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { z } from 'zod'

import s from './signIn.module.scss'

import fetchUserIpAndStore from '../../utils/fetchUserIp'

type FormValues = z.infer<ReturnType<typeof signInSchema>>
type ZodKeys = keyof FormValues

function SignIn() {
  const [login, { isLoading }] = useLoginMutation()
  const [getMe] = useLazyMeQuery()
  const router = useRouter()

  const t = useTranslation()
  const SigninSchema = signInSchema(t)

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
      await fetchUserIpAndStore()
      await login(data).unwrap()

      const meRes = await getMe()

      const userId = meRes?.data?.userId

      if (!userId) {
        return
      } else {
        void router.replace(`${PATH.PROFILE}/${userId}`)

        return
      }
    } catch (error: unknown) {
      customErrorHandler<ZodKeys>({ error, setError, specificField: 'email', translations: t })
    }
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
            label={t.auth.email}
            name={'email'}
          />
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            error={errors?.password}
            label={t.auth.password}
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
