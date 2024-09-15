import { useForm } from 'react-hook-form'

import { SocialMediaAuth } from '@/components/SocialMediaAuth/SocialMediaAuth'
import Spinner from '@/components/Spinner/Spinner'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useLazyMeQuery, useLoginMutation, useMeQuery } from '@/services/auth/authApi'
import { LoginArgs } from '@/services/auth/authTypes'
import { convertAccessToken } from '@/utils/convertAccessToken'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, FormInput } from '@robur_/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { z } from 'zod'

import s from './signIn.module.scss'

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
})

type FormValues = z.infer<typeof SigninSchema>

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
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SigninSchema),
  })
  const handleSignIn = async (data: LoginArgs) => {
    try {
      const res = await login(data).unwrap()

      const parserPayload = await convertAccessToken(res.accessToken)

      console.log(parserPayload)

      let userId: string | undefined

      if (parserPayload?.userId) {
        userId = parserPayload?.userId
      } else {
        const meRes = await getMe()

        userId = meRes?.data?.userId
      }
      if (isLoading) {
        return <Spinner />
      } else if (userId) {
        console.log('userId', userId)
        void router.replace(`/profile/${userId}/edit`)

        return
      }

      if (!userId) {
        return
      }
    } catch (error: any) {
      if (error.data?.statusCode === 401 && error.data?.error === 'Unauthorized') {
        void router.replace(`/sign-up`)
      }
      console.log(error)
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
          <Button className={s.ButtonSignIn} fullWidth>
            {t.auth.signIn}
          </Button>
        </form>
        <Button asChild className={clsx(s.ButtonForgot, s.leftItem)} variant={'ghost'}>
          <Link href={PATH.FORGOT_PASSWORD}>{t.auth.forgotPassword}</Link>
        </Button>
        <Button asChild className={s.ButtonAccount} variant={'ghost'}>
          <a href={'#'}>{t.auth.noAccount}</a>
        </Button>
        <Button asChild className={s.ButtonSignUp} variant={'ghost'}>
          <a href={'#'}>{t.auth.signUp}</a>
        </Button>
      </Card>
    </div>
  )
}

SignIn.getLayout = getHeaderLayout
export default SignIn
