import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { AvatarProfile } from '@/components/ProfilePageContent/avatar-profile/avatar-profile'
import { useModalFromSettingsProfile, variantModals } from '@/hooks/useModalFromSettingsProfile'
import { useTranslation } from '@/hooks/useTranslation'
import { updateProfileFormValues, updateProfileSchema } from '@/schemas/updateProfileSchema'
import { useMeQuery } from '@/services/auth/authApi'
import {
  useEditProfileMutation,
  useGetProfileQuery,
  useLazyGetCitiesQuery,
  useLazyGetCountriesQuery,
} from '@/services/profile/profile-api'
import { CityReturnType, TransformedType } from '@/services/profile/profile-types'
import { customErrorHandler } from '@/utils/customErrorHandler'
import { calculateAge, formatDateOfBirth, years } from '@/utils/profileUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormCombobox, FormDatePicker, FormInput, FormTextarea } from '@robur_/ui-kit'
import { useRouter } from 'next/router'

import s from './ProfilePageContent.module.scss'

import Spinner from '../Spinner/Spinner'

type ZodKeys = keyof updateProfileFormValues

type FieldError = {
  field: ZodKeys
  message: string
}

type ErrorType = {
  data: {
    fields: FieldError[]
  }
  message: string
}

export const ProfilePageContent = () => {
  const router = useRouter()
  const t = useTranslation()

  const { data: meData, isLoading: startIsLoading } = useMeQuery()
  const currentUserId = meData?.userId

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery(
    { id: currentUserId as string },
    { skip: !currentUserId }
  )

  const [editProfile, { isError, isLoading: isloadingEditProfile }] = useEditProfileMutation()
  const { modalJSX, openModal } = useModalFromSettingsProfile()

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

  const [getCountries, { isError: isCountryError, isLoading: isCountriesLoading }] =
    useLazyGetCountriesQuery()
  const [getCities, { isError: isCityError, isLoading: isCitiesLoading }] = useLazyGetCitiesQuery()

  const [countriesValues, setCountriesValues] = useState<TransformedType[]>([])

  const [citiesValues, setCitiesValues] = useState<TransformedType[] | null>([])

  const [dataForCountry, setGetDataForCountry] = useState<TransformedType | null>(null)

  const [dataForCity, setGetDataForCity] = useState<TransformedType | null>(null)

  const countryValue = watch('country')

  useEffect(() => {
    if (profileData) {
      reset({
        aboutMe: profileData.aboutMe || '',
        city: profileData.city || '',
        country: profileData.country || '',
        dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth) : undefined,
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        userName: profileData.userName || '',
      })
    }
  }, [profileData, reset])

  useEffect(() => {
    if (!countryValue) {
      setValue('city', '') // Очистка значения city
      setCitiesValues(null) // Также очищаем список городов, если необходимо
    }
  }, [countryValue, setValue])

  const getCountriesFromLocalStorage = () => {
    const currentLocale = `countries-${router.locale}`
    const storedCountries = localStorage.getItem(currentLocale)

    try {
      if (storedCountries !== null) {
        const countries: TransformedType[] = JSON.parse(storedCountries)

        setCountriesValues(countries)
        setCitiesValues(null)
      } else {
        getCountries()
          .unwrap()
          .then(() => {
            const storedCountries = localStorage.getItem(currentLocale)

            if (storedCountries !== null) {
              const countries: TransformedType[] = JSON.parse(storedCountries)

              setCountriesValues(countries)
              setCitiesValues(null)
            }
          })
      }
    } catch (error) {
      console.error('Error parsing countries:', error)
    }
  }

  const handleClickInputCountries = () => {
    getCountriesFromLocalStorage()
  }

  const transformDataCity = (data: CityReturnType[]): TransformedType[] => {
    return data.map(city => ({
      label: city.title_ru,
      value: { id: city.country_id, name: city.title_ru },
    }))
  }

  const handleClickInputCity = () => {
    console.log(' dataForCountry: ', dataForCountry)
    if (dataForCountry?.value.id) {
      getCities({ id: dataForCountry?.value.id })
        .unwrap()
        .then(data => {
          const cities = transformDataCity(data)

          setCitiesValues(cities)
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }

  const handleFormSubmit = async (dataForm: updateProfileFormValues) => {
    if (!currentUserId) {
      console.error('User ID is missing')

      return
    }

    try {
      const birthDate = new Date(dataForm.dateOfBirth)
      const formattedDateOfBirth = formatDateOfBirth(birthDate)
      const age = calculateAge(birthDate)

      if (age < 13) {
        openModal(variantModals.youngUser)

        return
      }

      await editProfile({
        ...dataForm,
        dateOfBirth: formattedDateOfBirth,
        id: currentUserId,
      }).unwrap()

      openModal(variantModals.successfulSaveProfile)
    } catch (error: unknown) {
      customErrorHandler<ZodKeys>({ error, setError, translations: t })
      openModal(variantModals.failedSaveProfile)
    }
  }

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
            label={'Username'}
            name={'userName'}
          />
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            label={'Firstname'}
            name={'firstName'}
          />
          <FormInput
            containerClassName={s.inputContainer}
            control={control}
            label={'Lastname'}
            name={'lastName'}
          />
          <FormDatePicker
            control={control}
            label={'Date of birth'}
            name={'dateOfBirth'}
            years={years}
          />
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flexGrow: 1 }}>
              <div>Select your country</div>
              <FormCombobox
                control={control}
                getDataForCombobox={setGetDataForCountry}
                isLoading={isCountriesLoading}
                name={'country'}
                onInputClick={handleClickInputCountries}
                options={countriesValues ?? []}
                setValue={value => setValue('country', value)}
              />
            </div>
            <div style={{ flexGrow: 1 }}>
              <div>Select your city</div>

              <FormCombobox
                control={control}
                disabled={!countryValue}
                getDataForCombobox={setGetDataForCity}
                isLoading={isCitiesLoading}
                name={'city'}
                onInputClick={handleClickInputCity}
                options={citiesValues ?? []}
                setValue={value => setValue('city', value)}
              />
            </div>
          </div>
          <FormTextarea
            className={s.textArea}
            control={control}
            name={'aboutMe'}
            placeholder={'Text-area'}
            titleLabel={'About Me'}
          />
        </div>
      </div>
      <Button className={s.submitBtn} type={'submit'}>
        Save changes
      </Button>
      {modalJSX}
    </form>
  )
}
