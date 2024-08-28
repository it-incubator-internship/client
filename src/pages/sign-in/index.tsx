import { useForm } from 'react-hook-form'

import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { useLoginMutation } from '@/services/auth/authApi'
import { LoginArgs } from '@/services/auth/authTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, FormInput, GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@robur_/ui-kit'
import clsx from 'clsx'
import { z } from 'zod'

import s from './signIn.module.scss'

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

type FormValues = z.infer<typeof SigninSchema>
function SignIn() {
  const [login, { isLoading }] = useLoginMutation()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(SigninSchema) })
  const handleSignIn = async (data: LoginArgs) => {
    try {
      await login(data).unwrap()
    } catch (error: any) {
      console.log(error)
    }
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
          <FormInput control={control} error={errors?.email} label={'Email'} name={'email'} />
          <FormInput
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
