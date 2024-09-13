import {
  Button,
  Card,
  FormCheckbox,
  FormInput,
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
  Label,
} from '@robur_/ui-kit'
import clsx from 'clsx'

// todo куда передать тру что бы чекбокс показывал ошибку
// todo User with this username is already registered,
// todo

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { z } from 'zod'

import s from './Signup.module.scss'

const signUpSchema = z.object({
  email: z.string().email('The email must match the format\nexample@example.com'),
  password: z.string().min(8).max(20),
  passwordConfirmation: z.string().min(8).max(20),
  terms_agreement: z.literal(true, {
    errorMap: () => ({ message: 'Please, mark the checkbox, if you agree to our terms' }),
  }),
  username: z
    .string()
    .min(6, `Minimum number of characters 6`)
    .max(30, `Minimum number of characters 30`),
})

type FormValues = z.infer<typeof signUpSchema>

export default function SignUp() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(signUpSchema) })

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
        <form className={s.SignUpForm} onSubmit={submitForm}>
          <Label className={s.SignUpFormLabel} label={'Username'}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.username?.message}
              name={'username'}
              rules={{ required: true }}
              type={'text'}
            />
          </Label>

          <Label className={s.SignUpFormLabel} label={'Email'}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.email?.message}
              name={'email'}
              rules={{ required: true }}
              type={'email'}
            />
          </Label>

          <Label className={s.SignUpFormLabel} label={'Password'}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.password?.message}
              name={'password'}
              rules={{ required: true }}
              type={'password'}
            />
          </Label>

          <Label className={s.SignUpFormLabel} label={'Password confirmation'}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.passwordConfirmation?.message}
              name={'passwordConfirmation'}
              rules={{ required: true }}
              shouldUnregister
              type={'password'}
            />
          </Label>

          <div className={s.CheckboxAgreementBlock}>
            <FormCheckbox
              className={s.SignUpAgreementCheckbox}
              control={control}
              errorMsg={errors.terms_agreement?.message}
              id={'SignUpAgreementCheckbox'}
              name={'terms_agreement'}
            >
              <span>I agree to the&nbsp;</span>
              <Link
                className={s.SignUpAgreementLink}
                href={'/terms-and-conditions'}
                target={'_blank'}
              >
                Terms of Service
              </Link>
              <span className={s.SignUpAgreementSpan}>&nbsp;and&nbsp;</span>
              <Link className={s.SignUpAgreementLink} href={'/privacy-policy'} target={'_blank'}>
                Privacy Policy
              </Link>
            </FormCheckbox>
          </div>

          <Button className={s.SignUpButton} fullWidth type={'submit'}>
            Sign Up
          </Button>
        </form>
        <div className={s.SignUpHaveAccountLink}>Do you have an account?</div>
        <Link className={s.SignInLink} href={'/sign-in'}>
          Sign In
        </Link>
      </Card>
    </div>
  )
}
