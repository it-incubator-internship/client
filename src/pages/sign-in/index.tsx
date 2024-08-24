// import GoogleSvgrepoCom1 from '@robur_/ui-kit'
import { useForm } from 'react-hook-form'

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
export default function SignIn() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(SigninSchema) })
  const submitForm = handleSubmit(data => {
    //console.log(data)
  })

  return (
    <div className={s.Conteiner}>
      <Card className={s.Card}>
        <h1 className={s.Title}>Sign in</h1>
        <form className={s.Form} onSubmit={submitForm}>
          <div className={s.BlockForLinks}>
            <GoogleSvgrepoCom1 className={s.Svg} />
            <GithubSvgrepoCom31 className={s.Svg} />
          </div>
          <FormInput
            control={control}
            error={errors?.email}
            label={'Email'}
            name={'email'}
            width={'100%'}
          />
          <FormInput
            control={control}
            error={errors?.password}
            label={'Password'}
            name={'password'}
            type={'password'}
            width={'100%'}
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
