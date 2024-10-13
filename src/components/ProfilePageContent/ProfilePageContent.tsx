// region imports
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useModalFromSettingsProfile, variantModals } from '@/hooks/useModalFromSettingsProfile'
import { useMeQuery } from '@/services/auth/authApi'
import {
  useEditProfileMutation,
  useGetProfileQuery,
  useLazyGetCitiesQuery,
  useLazyGetCountriesQuery,
} from '@/services/profile/profile-api'
import {
  CityLocale,
  CityReturnType,
  CountryLocale,
  CurrentLocaleType,
  RouterLocale,
  Terra,
  TransformedType,
} from '@/services/profile/profile-types'
import { calculateAge, formatDateOfBirth, years } from '@/utils/profileUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FormCombobox,
  FormDatePicker,
  FormInput,
  FormTextarea,
  ImageOutline,
} from '@robur_/ui-kit'
import { useRouter } from 'next/router'
import { z } from 'zod'

import s from './ProfilePageContent.module.scss'

import Spinner from '../Spinner/Spinner'

// endregion imports

//region zodSchema
const updateProfileSchema = z.object({
  aboutMe: z
    .string()
    .max(200, { message: 'This field about me must be no more than 200 characters' })
    .optional(),
  city: z
    .string({ message: 'This field is required' })
    .min(4, 'This field is required')
    .max(30, 'This field is required'),
  country: z
    .string({ message: 'This field is required' })
    .min(4, 'This field is required')
    .max(30, 'This field is required'),
  dateOfBirth: z.date({ message: 'This field is required' }),
  firstName: z
    .string({ message: 'This field is required' })
    .min(1, 'This field is required')
    .max(50, { message: 'This field firstname must be no more than 50 characters' })
    .regex(/^[A-Za-zА-Яа-я]+$/, {
      message: 'First name must contain only letters A-Z, a-z, А-Я, а-я',
    }),
  lastName: z
    .string({ message: 'This field is required' })
    .min(1, 'This field is required')
    .max(50, { message: 'This field lastname must be no more than 50 characters' })
    .regex(/^[A-Za-zА-Яа-я]+$/, {
      message: 'Last name must contain only letters A-Z, a-z, А-Я, а-я',
    }),
  userName: z
    .string({ message: 'This field is required' })
    .min(6, 'This field is required')
    .max(30),
})

//endregion zodSchema

//region types
type FormValues = z.infer<typeof updateProfileSchema>
type ZodKeys = keyof FormValues

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
//endregion types

export const ProfilePageContent = () => {
  //region hooks
  const router = useRouter()

  const { data: meData, isLoading: startIsLoading } = useMeQuery()
  const currentUserId = meData?.userId

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery(
    { id: currentUserId as string },
    { skip: !currentUserId }
  )

  const [editProfile, { isError, isLoading: isloadingEditProfile }] = useEditProfileMutation()
  const { modalJSX, openModal } = useModalFromSettingsProfile()

  const { control, handleSubmit, reset, setError, setValue, watch } = useForm<FormValues>({
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
    resolver: zodResolver(updateProfileSchema),
  })

  const [getCountries, { isError: isCountryError, isLoading: isCountriesLoading }] =
    useLazyGetCountriesQuery()
  const [getCities, { isError: isCityError, isLoading: isCitiesLoading }] = useLazyGetCitiesQuery()

  const [countriesValues, setCountriesValues] = useState<TransformedType[]>([])

  const [citiesValues, setCitiesValues] = useState<TransformedType[] | null>([])

  const [dataForCountry, setGetDataForCountry] = useState<TransformedType | null>(null)

  const [dataForCity, setGetDataForCity] = useState<TransformedType | null>(null)

  const [arrowDownPressed, setArrowDownPressed] = useState<boolean>(false)

  const countryValue = watch(Terra.country)
  console.log(' countryValue: ', countryValue)

  //endregion hooks

  //region useEffects

  useEffect(() => {
    if (!countryValue) {
      setValue(Terra.city, '')
    }
  }, [countryValue])

  useEffect(() => {
    setArrowDownPressed(false)
    setCitiesValues(null)
  }, [dataForCountry])

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

      handleClickInputCountries()
    }
  }, [profileData, reset, router.locale])

  //endregion useEffects

  // region functionality

  function getCurrentLocale() {
    if (router.locale === RouterLocale.en) {
      return { city: CityLocale.ru, country: CountryLocale.en }
    }
    if (router.locale === RouterLocale.ru) {
      return { city: CityLocale.ru, country: CountryLocale.ru }
    }
  }

  function handleStoredCountries(storedCountries: string) {
    const countries: TransformedType[] = JSON.parse(storedCountries)

    const countryObject = countries.find(country => country?.label === profileData?.country)

    setGetDataForCountry(countryObject as TransformedType)
    handleClickInputCity(countryObject)

    setCountriesValues(countries)
    setCitiesValues(null)
  }

  const getCountriesFromLocalStorage = () => {
    const currentLocale = getCurrentLocale()

    const storedCountries = localStorage.getItem(currentLocale?.country as string)

    try {
      if (storedCountries) {
        handleStoredCountries(storedCountries)
      } else {
        getCountries()
          .unwrap()
          .then(() => {
            const storedCountries = localStorage.getItem(currentLocale?.country as string)

            if (storedCountries) {
              handleStoredCountries(storedCountries)
            }
          })
      }
    } catch (error) {
      console.error('Error parsing countries:', error)
    }
  }

  const handleClickInputCity = (countryObject: TransformedType = null) => {
    const dataObject = countryObject ? countryObject : dataForCountry

    console.log(' dataForCountry: ', dataForCountry)

    const currentLocale = getCurrentLocale()

    if (dataObject?.value.id) {
      getCities({ id: dataObject?.value.id as number })
        .unwrap()
        .then(data => {
          const cities = transformDataCity(data)

          setCitiesValues(cities)

          setCityToLocalStorage(cities, currentLocale as CurrentLocaleType)
        })
        .catch((error: any) => {
          console.log(error)
        })
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

  const handleFormSubmit = async (dataForm: FormValues) => {
    const result = updateProfileSchema.safeParse(dataForm)

    if (!result.success) {
      console.log('Validation errors:', result.error.errors)
    }

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
      handleFormSubmitError(error)
    }
  }

  const handleFormSubmitError = (error: unknown) => {
    if (error && typeof error === 'object' && 'data' in error) {
      const errors = (error as ErrorType).data?.fields

      if (errors) {
        errors.forEach((error: FieldError) => {
          setError(error.field, {
            message: error.message,
            type: 'manual',
          })
        })
      }
    }

    openModal(variantModals.failedSaveProfile)
    console.error('Profile update failed:', error)
  }

  if (startIsLoading || isLoadingProfile || isloadingEditProfile) {
    return <Spinner />
  }

  const setCityToLocalStorage = (cities: TransformedType[], currentLocale: CurrentLocaleType) => {
    const citiesStringified = JSON.stringify(cities)

    localStorage.setItem(currentLocale?.city as string, citiesStringified)
  }

  // endregion functionality

  return (
    <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={s.formContainer}>
        <div className={s.photoSection}>
          <div className={s.userPhoto}>
            <ImageOutline height={'48'} width={'48'} />
          </div>
          <Button fullWidth type={'button'} variant={'outlined'}>
            Add a Profile Photo
          </Button>
        </div>
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
                name={Terra.country}
                onInputClick={handleClickInputCountries}
                options={countriesValues ?? []}
                setValue={value => setValue(Terra.country, value)}
              />
            </div>
            <div style={{ flexGrow: 1 }}>
              <div>Select your city</div>

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
