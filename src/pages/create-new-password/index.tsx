import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { PATH } from '@/consts/route-paths'
import { useChangePasswordMutation } from '@/services/password-recovery/password-recovery-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, FormInput, Modal } from '@robur_/ui-kit'
import { useRouter } from 'next/router'
import { z } from 'zod'

import styles from './index.module.scss'

function CreateNewPassword() {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const { recoveryCode } = router.query

  const [changePassword] = useChangePasswordMutation()

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

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(FormSchema),
  })

  const handleSubmitHandler = async (data: FormValues) => {
    try {
      if (typeof recoveryCode !== 'string') {
        throw new Error('Invalid recovery code')
      }

      if (data.newPassword !== data.confirmPassword) {
        alert('The passwords must match')

        return
      }

      const response = await changePassword({
        code: recoveryCode,
        newPassword: data.newPassword,
        passwordConfirmation: data.confirmPassword,
      }).unwrap()

      // await router.replace(PATH.LOGIN)

      setShowModal(true)
    } catch (error) {
      console.error('Ошибка при смене пароля:', error)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    reset()
  }

  return (
    <Card className={styles.cardContainer}>
      <div>
        <h1 className={styles.h1}>Create New Password</h1>
        <form onSubmit={handleSubmit(handleSubmitHandler)}>
          <FormInput
            control={control}
            label={'New password'}
            name={'newPassword'}
            type={'password'}
          />
          <FormInput
            control={control}
            label={'Password confirmation'}
            name={'confirmPassword'}
            type={'password'}
          />
          <p className={styles.paragraph}>Your password must be between 6 and 20 characters</p>
          <Button fullWidth>Create new password</Button>
        </form>
      </div>
      <Modal buttonTitle={'OK'} onClose={handleCloseModal} open={showModal}>
        <p>The password has been successfully changed.</p>
      </Modal>
    </Card>
  )
}

CreateNewPassword.getLayout = getHeaderLayout
export default CreateNewPassword
