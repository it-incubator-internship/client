import { useForm } from 'react-hook-form'

import Spinner from '@/components/Spinner/Spinner'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { useLazyMeQuery, useLoginMutation, useMeQuery } from '@/services/auth/authApi'
import { LoginArgs } from '@/services/auth/authTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, FormInput, GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@robur_/ui-kit'
import clsx from 'clsx'
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

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: 'kirillmorgunov@mail.ru',
      password: 'StRo0NgP@SSWoRD',
    },
    resolver: zodResolver(SigninSchema),
  })
  const handleSignIn = async (data: LoginArgs) => {
    try {
      const res = await login(data).unwrap()

      const tokenPayload = res.accessToken.split('.')?.[1]
      let parserPayload

      try {
        const decoderPayload = atob(tokenPayload)

        parserPayload = JSON.parse(decoderPayload)
      } catch {
        parserPayload = {}
      }

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
        router.replace(`/profile/${userId}`)

        return
      }
      if (!userId) {
        return
      }
    } catch (error: any) {
      if (error.data?.statusCode === 401 && error.data?.error === 'Unauthorized') {
        router.replace(`/sign-up`)
      }
      console.log(error)
    }
  }

  if (startIsLoading) {
    return <Spinner />
  } else if (meData) {
    router.replace(`/`)

    return
  }

  return (
    <div className={s.Container}>
      <Card className={s.Card}>
        <h1 className={s.Title}>Sign in</h1>
        <form className={s.Form} onSubmit={handleSubmit(handleSignIn)}>
          <div className={s.BlockForLinks}>
            <GoogleSvgrepoCom1 className={s.Svg} />
            <GithubSvgrepoCom31 className={s.Svg} />
          </div>
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
            Sign In
          </Button>
        </form>
        <Button asChild className={clsx(s.ButtonForgot, s.leftItem)} variant={'ghost'}>
          <a href={'#'}>Forgot Password</a>
        </Button>
        <Button asChild className={s.ButtonAccount} variant={'ghost'}>
          <a href={'#'}>Don’t have an account?</a>
        </Button>
        <Button asChild className={s.ButtonSignUp} variant={'ghost'}>
          <a href={'#'}>Sign Up</a>
        </Button>
      </Card>
    </div>
  )
}

SignIn.getLayout = getHeaderLayout
export default SignIn
