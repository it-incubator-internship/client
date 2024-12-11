import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { SocialMediaAuth } from '@/components/SocialMediaAuth/SocialMediaAuth'
import Spinner from '@/components/Preloaders/Spinner/Spinner'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { useTranslation } from '@/hooks/useTranslation'
import { signUpFormValues, signUpSchema } from '@/schemas/signUpSchema'
import { useRegistrationMutation } from '@/services/auth/authApi'
import { RegistrationArgs } from '@/services/auth/authTypes'
import { customErrorHandler } from '@/utils/customErrorHandler'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, FormCheckbox, FormInput, Label, Modal } from '@robur_/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'

import s from './Signup.module.scss'

type ZodKeys = keyof signUpFormValues

function SignUp() {
  const [registration, { isLoading }] = useRegistrationMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [responseEmail, setResponseEmail] = useState('')
  const t = useTranslation()

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm<signUpFormValues>({
    defaultValues: {
      email: '',
      isAgreement: false,
      password: '',
      passwordConfirmation: '',
      userName: '',
    },
    resolver: zodResolver(signUpSchema(t)),
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
      customErrorHandler<ZodKeys>({ error, setError, translations: t })
    }

    return
  }

  const args = {
    children: (
      <div>
        <p>{`${t.auth.sentConfirmationLink} ${responseEmail}`}</p>
      </div>
    ),
    onClose: () => {
      setIsModalOpen(false)
      reset()
    },
    open: true,
    title: t.auth.EmailSent,
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
        <h1 className={s.SignUpCardTitle}>{t.auth.signUp}</h1>
        <div className={s.SignUpCloudAuth}>
          <SocialMediaAuth />
        </div>
        <form className={s.SignUpForm} onSubmit={handleSubmit(handleSignUp)}>
          <Label className={s.SignUpFormLabel} label={t.auth.username}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.userName?.message}
              name={'userName'}
              type={'text'}
            />
          </Label>

          <Label className={s.SignUpFormLabel} label={t.auth.email}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.email?.message}
              name={'email'}
              type={'email'}
            />
          </Label>

          <Label className={s.SignUpFormLabel} label={t.auth.password}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.password?.message}
              name={'password'}
              type={'password'}
            />
          </Label>

          <Label className={s.SignUpFormLabel} label={t.auth.passwordConfirmation}>
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
              <span> {t.auth.agreeTo}&nbsp;</span>
              <Link className={s.SignUpAgreementLink} href={'/terms-of-service'} target={'_blank'}>
                {t.auth.terms}
              </Link>
              <span className={s.SignUpAgreementSpan}>&nbsp;{t.and}&nbsp;</span>
              <Link className={s.SignUpAgreementLink} href={'/privacy-policy'} target={'_blank'}>
                {t.auth.policy}
              </Link>
            </FormCheckbox>
          </div>

          <Button className={s.SignUpButton} fullWidth type={'submit'}>
            {t.auth.signUp}
          </Button>
        </form>
        <div className={s.SignUpHaveAccountLink}>{t.auth.haveAccount}</div>
        <Link className={s.SignInLink} href={'/sign-in'}>
          {t.auth.signIn}
        </Link>
      </Card>
    </div>
  )
}

SignUp.getLayout = getHeaderLayout
export default SignUp
