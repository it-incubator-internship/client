import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { SocialMediaAuth } from '@/components/SocialMediaAuth/SocialMediaAuth'
import Spinner from '@/components/Spinner/Spinner'
import { useRegistrationMutation } from '@/services/auth/authApi'
import { RegistrationArgs } from '@/services/auth/authTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, FormCheckbox, FormInput, Label, Modal } from '@robur_/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { z } from 'zod'

import s from './Signup.module.scss'

const signUpSchema = z
  .object({
    email: z.string().email('The email must match the format\nexample@example.com'),
    isAgreement: z.literal(true, {
      errorMap: () => ({ message: 'Please, mark the checkbox, if you agree to our terms' }),
    }),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(
        /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/g,
        'password can contain a-z, A-Z, 0-9, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _ ` { | } ~'
      ),
    passwordConfirmation: z.string().min(8).max(20),
    userName: z
      .string()
      .min(6, `Minimum number of characters 6`)
      .max(30, `Minimum number of characters 30`)
      .regex(/^[a-zA-Z0-9_-]+$/g, 'name must contain  0-9; A-Z; a-z; _ ; -'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Password should match',
    path: ['passwordConfirmation'],
  })

type FormValues = z.infer<typeof signUpSchema>

export default function SignUp() {
  const [registration, { isLoading }] = useRegistrationMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [responseEmail, setResponseEmail] = useState('')

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      isAgreement: true,
      password: 'StRo0NgP@SSWoRD',
      passwordConfirmation: 'StRo0NgP@SSWoRD',
      userName: 'demorest49de9',
    },
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  const handleSignUp = async (data: RegistrationArgs) => {
    const trimmedData = {
      ...data,
      email: data.email.trim(),
      userName: data.userName.trim(),
    }

    try {
      const res = await registration(trimmedData).unwrap()

      console.log(res)

      setIsModalOpen(true)
      setResponseEmail(res.email)
    } catch (error: any) {
      console.log(error)
      //todo bubble...
    }

    if (isLoading) {
      return <Spinner />
    }

    return
  }

  const args = {
    children: <p>We have sent a link to confirm your email to {responseEmail}</p>,
    onClose: () => {
      setIsModalOpen(false)
      reset()
    },
    open: true,
    title: 'Email sent',
  }

  const modalJSX = <Modal {...args}>{args.children}</Modal>

  return isModalOpen ? (
    modalJSX
  ) : (
    <div className={clsx(s.SignUpContainer)}>
      <Card className={clsx(s.SignUpCard, s.BorderBack)}>
        <h1 className={s.SignUpCardTitle}>Sign Up</h1>
        <div className={s.SignUpCloudAuth}>
          <SocialMediaAuth />
        </div>
        <form className={s.SignUpForm} onSubmit={handleSubmit(handleSignUp)}>
          <Label className={s.SignUpFormLabel} label={'userName'}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.userName?.message}
              name={'userName'}
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
              errorMsg={errors.isAgreement?.message}
              id={'SignUpAgreementCheckbox'}
              name={'isAgreement'}
            >
              <span>I agree to the&nbsp;</span>
              <Link className={s.SignUpAgreementLink} href={'/terms-of-service'} target={'_blank'}>
                Terms of Service
              </Link>
              <span className={s.SignUpAgreementSpan}>&nbsp;and&nbsp;</span>
              <Link className={s.SignUpAgreementLink} href={'/privacy-policy'} target={'_blank'}>
                Privacy Policy
              </Link>
            </FormCheckbox>
          </div>

          <Button className={s.SignUpButton} disabled={!isValid} fullWidth type={'submit'}>
            Sign Up
          </Button>
        </form>
        <Link className={s.SignUpHaveAccountLink} href={'/have-account'}>
          Do you have an account?
        </Link>
        <Link className={s.SignInLink} href={'/sign-in'}>
          Sign In
        </Link>
      </Card>
    </div>
  )
}
