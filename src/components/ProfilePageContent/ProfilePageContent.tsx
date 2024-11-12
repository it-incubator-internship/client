import { useForm } from 'react-hook-form'

import { AvatarProfile } from '@/components/ProfilePageContent/avatar-profile/avatar-profile'
import { useCountriesAndCities } from '@/components/ProfilePageContent/hooks/useCountriesAndCities'
import { useProfileForm } from '@/components/ProfilePageContent/hooks/useProfileForm'
import { useTranslation } from '@/hooks/useTranslation'
import { updateProfileFormValues, updateProfileSchema } from '@/schemas/updateProfileSchema'
import { useMeQuery } from '@/services/auth/authApi'
import { useGetProfileQuery } from '@/services/profile/profile-api'
import { Terra } from '@/services/profile/profile-types'
import { years } from '@/utils/profileUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormCombobox, FormDatePicker, FormInput, FormTextarea } from '@robur_/ui-kit'
import { useRouter } from 'next/router'

import s from './ProfilePageContent.module.scss'

import Spinner from '../Spinner/Spinner'

export const ProfilePageContent = () => {
  const router = useRouter()
  const t = useTranslation()
  const { data: meData, isLoading: startIsLoading } = useMeQuery()
  const currentUserId = meData?.userId

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery(
    { id: currentUserId as string },
    { skip: !currentUserId }
  )

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
      resolver: zodResolver(updateProfileSchema(t)),
    })

  const {
    arrowDownPressed,
    citiesValues,
    countriesValues,
    countryValue,
    getCountriesFromLocalStorage,
    handleClickInputCity,
    isCitiesLoading,
    isCountriesLoading,
    setArrowDownPressed,
    setGetDataForCity,
    setGetDataForCountry,
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
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flexGrow: 1 }}>
              <div>{t.myProfileSettings.selectYourCountry}</div>
              <FormCombobox
                control={control}
                getDataForCombobox={setGetDataForCountry}
                isLoading={isCountriesLoading}
                // todo разкомментировать когда будет смерджена либа
                // markedAsRequired
                name={Terra.country}
                onInputClick={getCountriesFromLocalStorage}
                options={countriesValues ?? []}
                setValue={value => setValue(Terra.country, value)}
              />
            </div>
            <div style={{ flexGrow: 1 }}>
              <div>{t.myProfileSettings.selectYourCity}</div>

              <FormCombobox
                control={control}
                disabled={!countryValue}
                getDataForCombobox={setGetDataForCity}
                isLoading={isCitiesLoading}
                  // todo разкомментировать когда будет смерджена либа
                // markedAsRequired
                name={Terra.city}
                onInputClick={() => handleClickInputCity()}
                options={citiesValues ?? []}
                requestItemOnKeyDown={() => {
                  if (!arrowDownPressed) {
                    handleClickInputCity()
                    setArrowDownPressed(true)
                  }
                }}
                setValue={value => setValue(Terra.city, value)}
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
