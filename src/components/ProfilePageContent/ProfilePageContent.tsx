import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Spinner from '@/components/Preloaders/Spinner/Spinner'
import { AvatarProfile } from '@/components/ProfilePageContent/avatar-profile/avatar-profile'
import { useCountriesAndCities } from '@/components/ProfilePageContent/hooks/useCountriesAndCities'
import { useProfileForm } from '@/components/ProfilePageContent/hooks/useProfileForm'
import { useTranslation } from '@/hooks/useTranslation'
import { updateProfileFormValues, updateProfileSchema } from '@/schemas/updateProfileSchema'
import { useMeQuery } from '@/services/auth/authApi'
import { useGetProfileQuery } from '@/services/profile/profile-api'
import { Terra, TransformedType } from '@/services/profile/profile-types'
import { years } from '@/utils/profileUtils'
import { Button, FormCombobox, FormDatePicker, FormInput, FormTextarea } from '@demorest49de/ui-kit'
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { OptionsType } from '@demorest49de/ui-kit/dist/components/ui/radix-ui/combobox/form-combobox'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import s from './ProfilePageContent.module.scss'

export const ProfilePageContent = () => {
  const router = useRouter()
  const t = useTranslation()
  const { data: meData, isLoading: startIsLoading } = useMeQuery()
  const currentUserId = meData?.userId

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery(
    { id: currentUserId as string },
    { skip: !currentUserId }
  )

  const [countriesF, setCountriesF] = useState<TransformedType[]>([])
  const [citiesF, setCitiesF] = useState<TransformedType[]>([])

  const { control, handleSubmit, reset, setError, setValue, watch } =
    useForm<updateProfileFormValues>({
      defaultValues: {
        aboutMe: '',
        city: '',
        country: '',
        dateOfBirth: undefined,
        firstName: '',
        lastName: '',
        userName: meData?.userName,
      },
      mode: 'onSubmit',
      resolver: zodResolver(
        updateProfileSchema(t, countriesF as TransformedType[], citiesF as TransformedType[])
      ),
    })

  const {
    citiesValues,
    countriesValues,
    countryValue,
    getCountriesFromLocalStorage,
    handleClickInputCity,
    isCitiesLoading,
    isCountriesLoading,
    setUserSelectedCity,
    setUserSelectedCountry,
    userSelectedCountry,
  } = useCountriesAndCities({ profileData, router, setValue, watch })

  const { handleFormSubmit, isLoadingEditProfile, modalJSX } = useProfileForm({
    currentUserId,
    getCountriesFromLocalStorage,
    meData,
    profileData,
    reset,
    router,
    setError,
  })

  useEffect(() => {
    countriesValues && setCountriesF(countriesValues)
    citiesValues && setCitiesF(citiesValues)
  }, [citiesValues, countriesValues])

  if (startIsLoading || isLoadingProfile || isLoadingEditProfile) {
    return <Spinner />
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={s.formContainer}>
        <AvatarProfile currentUserId={currentUserId || ''} profileData={profileData || undefined} />
        <div className={s.dataSection}>
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            label={t.myProfileSettings.userName}
            markedAsRequired
            name={'userName'}
          />
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            label={t.myProfileSettings.firstName}
            markedAsRequired
            name={'firstName'}
          />
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            label={t.myProfileSettings.lastName}
            markedAsRequired
            name={'lastName'}
          />
          <FormDatePicker
            control={control}
            label={t.myProfileSettings.dateOfBirth}
            markedAsRequired
            name={'dateOfBirth'}
            years={years}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ flexGrow: 1 }}>
              <div>{t.myProfileSettings.selectYourCountry}</div>
              <FormCombobox
                control={control}
                dataForComboboxHandler={setUserSelectedCountry}
                isLoading={isCountriesLoading}
                markedAsRequired
                name={Terra.country}
                onInputClick={getCountriesFromLocalStorage}
                options={(countriesValues as OptionsType[]) || []}
                setValue={(value: string) => setValue(Terra.country, value as string)}
              />
            </div>
            <div style={{ flexGrow: 1 }}>
              <div>{t.myProfileSettings.selectYourCity}</div>
              <FormCombobox
                control={control}
                dataForComboboxHandler={setUserSelectedCity}
                disabled={!countryValue}
                isLoading={isCitiesLoading}
                markedAsRequired
                name={Terra.city}
                onInputClick={() => handleClickInputCity(userSelectedCountry)}
                options={(citiesValues as OptionsType[]) || []}
                setValue={(value: string) => setValue(Terra.city, value as string)}
              />
            </div>
          </div>
          <FormTextarea
            className={s.textArea}
            control={control}
            name={'aboutMe'}
            placeholder={'Text-area'}
            titleLabel={t.myProfileSettings.aboutMe}
          />
        </div>
      </div>
      <Button className={s.submitBtn} type={'submit'}>
        {t.myProfileSettings.saveChanges}
      </Button>
      {modalJSX}
    </form>
  )
}
