import React from 'react'
import { useForm } from 'react-hook-form'

import { Card, FormRadioGroup } from '@robur_/ui-kit'

import s from './AccountManagement.module.scss'

export const AccountManagement = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      accountType: '',
    },
  })

  const onSubmit = (data: any) => {
    console.log('Форма отправлена:', data)
  }

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={s.title}>Account type</h1>
      <Card className={s.containerCard}>
        <FormRadioGroup
          control={control}
          name={'accountType'}
          options={[
            { label: 'Personal', value: 'personal' },
            { label: 'Business', value: 'business' },
          ]}
        />
      </Card>
      <button type={'submit'}>Submit</button>
    </form>
  )
}
