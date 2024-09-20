import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { AvatarDialog } from '@/components/ProfilePageContent/avatar-dialog/avatar-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Close,
  FormDatePicker,
  FormInput,
  ImageOutline,
  Modal,
  Select,
  SelectItem,
  Textarea,
} from '@robur_/ui-kit'
import Image from 'next/image'
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

export const ProfilePageContent = () => {
  const [avatar, setAvatar] = useState()
  const [isAvatarRemoveModal, setIsAvatarRemoveModal] = useState(false)
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

  const handleRemoveAvatarBtn = () => {
    setIsAvatarRemoveModal(true)
  }

  function handleModalClosed() {
    setIsAvatarRemoveModal(false)
  }

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={s.formContainer}>
          <div className={s.photoSection}>
            <div className={s.userPhoto}>
              {!avatar ? (
                <ImageOutline height={'48'} width={'48'} />
              ) : (
                <>
                  <button className={s.removeAvatarBtn} onClick={handleRemoveAvatarBtn} type={'button'}>
                    <Close />
                  </button>
                  <Image alt={'your avatar'} height={'192'} src={avatar} width={'192'} />
                </>
              )}
            </div>
            <AvatarDialog avatarPicture={avatar} setAvatarPicture={setAvatar} />
          </div>
          <div className={s.dataSection}>
            <FormInput containerClassName={s.inputContainer} control={control} label={'Username'} name={'username'} />
            <FormInput containerClassName={s.inputContainer} control={control} label={'Firstname'} name={'firstname'} />
            <FormInput containerClassName={s.inputContainer} control={control} label={'Lastname'} name={'lastname'} />
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
        <Button className={s.submitBtn} type={'submit'}>
          Save changes
        </Button>
      </form>
      <Modal
        buttonRejectionTitle={'No'}
        buttonTitle={'Yes'}
        onClose={handleModalClosed}
        onCloseWithApproval={() => setAvatar(undefined)}
        open={isAvatarRemoveModal}
        withConfirmation
      >
        Do you really want to delete your profile photo?
      </Modal>
    </>
  )
}
