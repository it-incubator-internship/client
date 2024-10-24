import { AvatarProfile } from '@/components/ProfilePageContent/avatar-profile/avatar-profile'
import { useProfileForm } from '@/components/ProfilePageContent/form-profile/useProfileForm'
import { useTranslation } from '@/hooks/useTranslation'
import { Terra } from '@/services/profile/profile-types'
import { years } from '@/utils/profileUtils'
import { Button, FormCombobox, FormDatePicker, FormInput, FormTextarea } from '@robur_/ui-kit'

import s from './ProfilePageContent.module.scss'

import Spinner from '../Spinner/Spinner'

export const ProfilePageContent = () => {
  const t = useTranslation()
  const {
    arrowDownPressed,
    citiesValues,
    control,
    countriesValues,
    countryValue,
    currentUserId,
    handleClickInputCity,
    handleClickInputCountries,
    handleFormSubmit,
    handleSubmit,
    isCitiesLoading,
    isCountriesLoading,
    isLoadingProfile,
    isloadingEditProfile,
    modalJSX,
    profileData,
    setArrowDownPressed,
    setGetDataForCity,
    setGetDataForCountry,
    setValue,
    startIsLoading,
  } = useProfileForm()

  if (startIsLoading || isLoadingProfile || isloadingEditProfile) {
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
            name={'userName'}
          />
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            label={t.myProfileSettings.firstName}
            name={'firstName'}
          />
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            label={t.myProfileSettings.lastName}
            name={'lastName'}
          />
          <FormDatePicker
            control={control}
            label={t.myProfileSettings.dateOfBirth}
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
                name={Terra.country}
                onInputClick={handleClickInputCountries}
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
