import clsx from 'clsx'
import { Card, ControlledInput, GithubSvgrepoCom31, GoogleSvgrepoCom1, Label } from '@robur_/ui-kit'
import s from './Signup.module.scss'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

export default function SignUp() {
  const { register, handleSubmit, control } = useForm()

  const submitForm = handleSubmit(data => {
    console.log(data)
  })

  return (
    <div className={clsx(s.SignUpContainer)}>
      <Card className={clsx(s.SignUpCard, s.BorderBack)}>
        <h1 className={s.SignUpCardTitle}>Sign Up</h1>
        <div className={s.SignUpCloudAuth}>
          <Link className={s.SignUpCloudAuthLink} href={'https://www.google.com'} target={'_blank'}>
            <GoogleSvgrepoCom1 />
          </Link>
          <Link className={s.SignUpCloudAuthLink} href={'https://www.github.com'} target={'_blank'}>
            <GithubSvgrepoCom31 />
          </Link>
        </div>
        <form className={s.SignUpForm}>
          <Label label={'Username'} className={s.SignUpFormLabel}>
            <ControlledInput
              control={control}
              {...register('username')}
              className={clsx(s.SignUpFormInput, s.BorderBack)}
            />
          </Label>
        </form>
      </Card>
    </div>
  )
}
