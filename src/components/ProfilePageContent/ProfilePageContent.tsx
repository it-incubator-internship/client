import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormDatePicker, FormInput, Select } from '@robur_/ui-kit'
import { z } from 'zod'

import s from './ProfilePageContent.module.scss'

const updateProfileSchema = z.object({
  birthdate: z.date({ message: 'This field is required' }),
  firstname: z.string({ message: 'This field is required' }),
  lastname: z.string({ message: 'This field is required' }),
  username: z.string({ message: 'This field is required' }),
})

type FormValues = z.infer<typeof updateProfileSchema>

export const ProfilePageContent = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      birthdate: new Date(),
      firstname: 'John',
      lastname: 'Doe',
      username: 'John Doe',
    },
    resolver: zodResolver(updateProfileSchema),
  })

  return (
    <form className={s.form}>
      <div className={s.formContainer}>
        <div className={s.photoSection}>
          <div className={s.userPhoto}></div>
          <Button fullWidth type={'button'} variant={'outlined'}>
            Add a Profile Photo
          </Button>
        </div>
        <div className={s.dataSection}>
          <FormInput control={control} label={'Username'} name={'username'} />
          <FormInput control={control} label={'Firstname'} name={'firstname'} />
          <FormInput control={control} label={'Lastname'} name={'lastname'} />
          <FormDatePicker control={control} label={'Date of birth'} name={'birthdate'} />
          <div style={{ display: 'flex', gap: '24px' }}>
            <Select />
            <Select />
          </div>
        </div>
      </div>
      <Button className={s.submitBtn} type={'submit'}>
        Save changes
      </Button>
    </form>
  )
}
