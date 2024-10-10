import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Spinner from '@/components/Spinner/Spinner'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useLogoutMutation } from '@/services/auth/authApi'
import { useChangePasswordMutation } from '@/services/password-recovery/password-recovery-api'
import { ServerError } from '@/services/password-recovery/password-recovery-types'
import { showErrorToast } from '@/utils/toastConfig'
import { Button, Card, FormInput, Modal } from '@demorest49de/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Router from 'next/router'
import { z } from 'zod'

import styles from './new-password-form.module.scss'

type NewPasswordFormProps = {
  recoveryCode: string
}

const FormSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be no more than 20 characters'),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be no more than 20 characters'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'The passwords must match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof FormSchema>

export function NewPasswordForm({ recoveryCode }: NewPasswordFormProps) {
  const [showModal, setShowModal] = useState(false)
  const [changePassword, { error, isError, isLoading }] = useChangePasswordMutation()
  const [doLogout] = useLogoutMutation()
  const t = useTranslation()

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(FormSchema),
  })
  const handleSubmitHandler = async (data: FormValues) => {
    await changePassword({
      code: recoveryCode as string,
      newPassword: data.newPassword,
      passwordConfirmation: data.confirmPassword,
    })
      .unwrap()
      .then(() => {
        setShowModal(true)
      })
  }

  const handleCloseModal = async () => {
    await doLogout()
      .unwrap()
      .finally(() => {
        Router.replace(PATH.LOGIN).then(() => {
          setShowModal(false)
          reset()
        })
      })
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    const errorMessage = (error as ServerError).data?.message || 'Unexpected error occurred.'

    showErrorToast(errorMessage)
  }

  return (
    <Card className={styles.cardContainer}>
      <div>
        <h1 className={styles.h1}>{t.createNewPassword.newPasswordForm.title}</h1>
        <form onSubmit={handleSubmit(handleSubmitHandler)}>
          <FormInput
            containerClassName={styles.input}
            control={control}
            label={t.createNewPassword.newPasswordForm.inputNewPassLabel}
            name={'newPassword'}
            type={'password'}
          />
          <FormInput
            containerClassName={styles.input}
            control={control}
            label={t.createNewPassword.newPasswordForm.inputConfirmPassLabel}
            name={'confirmPassword'}
            type={'password'}
          />
          <p className={styles.paragraph}>{t.createNewPassword.newPasswordForm.subTitle}</p>
          <Button fullWidth>{t.createNewPassword.newPasswordForm.button}</Button>
        </form>
      </div>
      <Modal
        buttonTitle={t.createNewPassword.newPasswordForm.modal.buttonTitle}
        onClose={handleCloseModal}
        open={showModal}
        title={''}
      >
        <p>{t.createNewPassword.newPasswordForm.modal.subtitle}</p>
      </Modal>
    </Card>
  )
}
