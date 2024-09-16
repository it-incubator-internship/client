import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FormDatePicker,
  FormInput,
  ImageOutline,
  Select,
  SelectItem,
  Textarea,
} from '@robur_/ui-kit'
import { z } from 'zod'

import s from './ProfilePageContent.module.scss'

const updateProfileSchema = z.object({
  birthdate: z.date({ message: 'This field is required' }),
  firstname: z.string({ message: 'This field is required' }).min(1, 'This field is required'),
  lastname: z.string({ message: 'This field is required' }).min(1, 'This field is required'),
  username: z.string({ message: 'This field is required' }).min(1, 'This field is required'),
})

type FormValues = z.infer<typeof updateProfileSchema>

const countryOptions = [
  {
    label: 'England',
    value: '1',
  },
  {
    label: 'Usa',
    value: '2',
  },
  {
    label: 'Germany',
    value: '3',
  },
]

const cityOptions = [
  {
    label: 'London',
    value: '1',
  },
  {
    label: 'Paris',
    value: '2',
  },
  {
    label: 'Berlin',
    value: '3',
  },
]

type ProfilePageContentProps = {
  isEditMode?: boolean
}

export const ProfilePageContent = ({ isEditMode = false }: ProfilePageContentProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      birthdate: undefined,
      firstname: '',
      lastname: '',
      username: '',
    },
    resolver: zodResolver(updateProfileSchema),
  })

  const handleFormSubmit = (e: any) => {
    console.log(e)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={s.formContainer}>
        <div className={s.photoSection}>
          <div className={s.userPhoto}>
            <ImageOutline height={'48'} width={'48'} />
          </div>
          {isEditMode && (
            <Button fullWidth type={'button'} variant={'outlined'}>
              Add a Profile Photo
            </Button>
          )}
        </div>
        <div className={s.dataSection}>
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            label={'Username'}
            name={'username'}
          />
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            label={'Firstname'}
            name={'firstname'}
          />
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            label={'Lastname'}
            name={'lastname'}
          />
          <FormDatePicker control={control} label={'Date of birth'} name={'birthdate'} />
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flexGrow: 1 }}>
              <div>Select your country</div>
              <Select placeholder={'Country'}>
                {countryOptions.map(option => {
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  )
                })}
              </Select>
            </div>
            <div style={{ flexGrow: 1 }}>
              <div>Select your city</div>
              <Select placeholder={'City'}>
                {cityOptions.map(option => {
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  )
                })}
              </Select>
            </div>
          </div>
          <Textarea className={s.textArea} placeholder={'Text-area'} titleLabel={'About Me'} />
        </div>
      </div>
      {isEditMode && (
        <Button className={s.submitBtn} type={'submit'}>
          Save changes
        </Button>
      )}
    </form>
  )
}
