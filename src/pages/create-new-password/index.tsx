import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Spinner from '@/components/Spinner/Spinner'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { PATH } from '@/consts/route-paths'
import { useChangePasswordMutation } from '@/services/password-recovery/password-recovery-api'
import { ServerError } from '@/services/password-recovery/password-recovery-types'
import { convertAccessToken } from '@/utils/convertAccessToken'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, FormInput, Modal } from '@robur_/ui-kit'
import { useRouter } from 'next/router'
import { z } from 'zod'

import styles from './index.module.scss'

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

function CreateNewPassword() {
  const router = useRouter()
  const { recoveryCode } = router.query
  const [showModal, setShowModal] = useState(false)
  const [parsedJwt, setParsedJwt] = useState<{
    email: string
    exp: number
    iat: number
  }>({
    email: '',
    exp: 0,
    iat: 0,
  })
  const [changePassword, { error, isError, isLoading }] = useChangePasswordMutation()
  const serverError = (error as ServerError)?.data?.fields[0]?.message

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    const getParsedData = async () => {
      const jwtData = await convertAccessToken(recoveryCode)

      setParsedJwt(jwtData)
    }

    void getParsedData()
  }, [recoveryCode])

  useEffect(() => {
    if (parsedJwt.email && parsedJwt.exp && Date.now() > parsedJwt.exp * 1000) {
      void router.replace(`/${PATH.LINK_EXPIRED}?email=${encodeURIComponent(parsedJwt.email)}`)
    }
  }, [parsedJwt, router])

  const handleSubmitHandler = async (data: FormValues) => {
    await changePassword({
      code: recoveryCode as string,
      newPassword: data.newPassword,
      passwordConfirmation: data.confirmPassword,
    })
      .unwrap()
      .then(() => setShowModal(true))
  }

  const handleCloseModal = () => {
    setShowModal(false)
    reset()
    void router.replace(PATH.LOGIN)
  }

  if (isError) {
    alert(serverError)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Card className={styles.cardContainer}>
      <div>
        <h1 className={styles.h1}>Create New Password</h1>
        <form onSubmit={handleSubmit(handleSubmitHandler)}>
          <FormInput
            containerClassName={styles.input}
            control={control}
            label={'New password'}
            name={'newPassword'}
            type={'password'}
          />
          <FormInput
            containerClassName={styles.input}
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
