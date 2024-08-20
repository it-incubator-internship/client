import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, ControlledInput } from '@robur_/ui-kit'
import { z } from 'zod'

import styles from './index.module.scss'

export default function CreateNewPassword() {
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

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(FormSchema),
  })

  const handleSubmitHandler = (data: FormValues) => {
    console.log(data)
  }

  return (
    <div className={styles.centeredContainer}>
      <Card className={styles.cardContainer}>
        <div>
          <h1 className={styles.h1}>Create New Password</h1>
          <form onSubmit={handleSubmit(handleSubmitHandler)}>
            <ControlledInput
              control={control}
              label={'New password'}
              name={'newPassword'}
              style={{
                width: '330px',
              }}
              type={'password'}
            />
            <ControlledInput
              control={control}
              label={'Password confirmation'}
              name={'confirmPassword'}
              style={{
                width: '330px',
              }}
              type={'password'}
            />
            <p className={styles.paragraph}>Your password must be between 6 and 20 characters</p>
            <Button fullWidth>Create new password</Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
