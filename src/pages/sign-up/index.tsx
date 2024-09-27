import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { SocialMediaAuth } from '@/components/SocialMediaAuth/SocialMediaAuth'
import Spinner from '@/components/Spinner/Spinner'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { PATH } from '@/consts/route-paths'
import { useRegistrationMutation } from '@/services/auth/authApi'
import { RegistrationArgs } from '@/services/auth/authTypes'
import { customErrorHandler } from '@/utils/customErrorHandler'
import { ErrorType, FieldError } from '@/utils/types/errorTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, FormCheckbox, FormInput, Label, Modal } from '@robur_/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { z } from 'zod'

import s from './Signup.module.scss'

const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'This field is required' })
      .email('The email must match the format\nexample@example.com'),
    isAgreement: z.boolean(),
    password: z
      .string({ message: 'This field is required' })
      .min(8)
      .max(20)
      .regex(
        /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/g,
        'password can contain a-z, A-Z, 0-9, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _ ` { | } ~'
      ),
    passwordConfirmation: z.string().min(1, { message: 'This field is required' }),
    userName: z.string().min(1, { message: 'This field is required' }),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Password should match',
    path: ['passwordConfirmation'],
  })
  .superRefine((data, ctx) => {
    if (!data.isAgreement) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please, mark the checkbox, if you agree to our terms',
        path: ['isAgreement'],
      })
    }
  })

type FormValues = z.infer<typeof signUpSchema>
type ZodKeys = keyof FormValues

function SignUp() {
  const [registration, { isLoading }] = useRegistrationMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [responseEmail, setResponseEmail] = useState('')

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      isAgreement: false,
      password: '',
      passwordConfirmation: '',
      userName: '',
    },
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

      setIsModalOpen(true)
      setResponseEmail(res.email)
    } catch (error: unknown) {
      customErrorHandler<ZodKeys>({ error, setError })
      const errors = (error as ErrorType<ZodKeys>).data?.fields

      if (errors) {
        errors.forEach((error: FieldError<ZodKeys>) => {
          setError(error.field, {
            message: error.message,
            type: 'manual',
          })
        })
      }
    }

    return
  }

  const args = {
    children: (
      <div>
        <p>We have sent a link to confirm your email to {responseEmail}</p>
        <Link href={PATH.LOGIN}>Go to sign in</Link>
      </div>
    ),
    onClose: () => {
      setIsModalOpen(false)
      reset()
    },
    open: true,
    title: 'Email sent',
  }

  const modalJSX = <Modal {...args}>{args.children}</Modal>

  if (isLoading) {
    return <Spinner />
  }

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
          <Label className={s.SignUpFormLabel} label={'Username'}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.userName?.message}
              name={'userName'}
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

SignUp.getLayout = getHeaderLayout
export default SignUp
