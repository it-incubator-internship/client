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
import {CityReturnType, CountryLocale, TransformedType} from '@/services/profile/profile-types'
import { calculateAge, formatDateOfBirth, years } from '@/utils/profileUtils'
import {
  Button,
  FormCombobox,
  FormDatePicker,
  FormInput,
  FormTextarea,
  ImageOutline,
} from '@demorest49de/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

import s from './ProfilePageContent.module.scss'

import Spinner from '../Spinner/Spinner'

const updateProfileSchema = z.object({
  aboutMe: z
    .string()
    .max(200, { message: 'This field about me must be no more than 200 characters' })
    .optional(),
  city: z
    .string({ message: 'This field is required' })
    .min(4, 'This field is required')
    .max(30, 'This field is required'),
  country: z.string().min(4, 'This field is required').max(30, 'This field is required'),
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
  const router = useRouter()

  const { data: meData, isLoading: startIsLoading } = useMeQuery()
  const currentUserId = meData?.userId

  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery(
    { id: currentUserId as string },
    { skip: !currentUserId }
  )

  const [editProfile, { isError, isLoading: isloadingEditProfile }] = useEditProfileMutation()
  const { modalJSX, openModal } = useModalFromSettingsProfile()

  const { control, handleSubmit, reset, setError } = useForm<FormValues>({
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

    // приходит с комп-ты строка
  const [valueCountry, setValueCountry] = useState<null | string>(null)
  const [valueCity, setValueCity] = useState<null | string>(null)

  const [dataForCity, setGetDataForCity] = useState<TransformedType | null>(null)

  console.log(' dataForCity: ', dataForCity)

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

  // const transformDataCity = (data: CityReturnType[]): TransformedType[] => {
  //   const chunkSize = 100;
  //   let transformedCities: TransformedType[] = [];
  //
  //   for (let i = 0; i < data.length; i += chunkSize) {
  //     const chunk = data.slice(i, i + chunkSize);
  //     const transformedChunk = chunk.map(city => ({
  //       label: city.title_ru,
  //       value: {
  //         id: city.city_id,
  //         name: city.title_ru,
  //       },
  //     }));
  //     transformedCities = [...transformedCities, ...transformedChunk];
  //   }
  //   console.log(' transformedCities: ', transformedCities);
  //   return transformedCities;
  // };

  const transformDataCity = (data:  CityReturnType[]): TransformedType[] => {
    // const tmp = data.slice(0, 100);

    const arr =  data.map((city) => {
        const el = {
          label: city.title_ru,
          value: { id: city.country_id, name: city.title_ru },
        }
      console.log(' el: ', el);
        return el;
    })
    console.log(' arr: ', arr);
    return arr;


    // return tmp.map((city) => ({
    //     label: city.title_ru,
    //     value: { id: city.country_id, name: city.title_ru },
    // }));
  };

  //todo заблокировать пока не получены страны
  const handleClickInputCity = () => {
    console.log(' dataForCountry: ', dataForCountry);
    if (dataForCountry?.value.id) {
      getCities({ id: dataForCountry?.value.id })
        .unwrap()
        .then(data => {
          const cities = transformDataCity(data)
            // setCitiesValues(cities)
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }

  const handleFormSubmit = async (dataForm: FormValues) => {
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

  if (
    startIsLoading ||
    isLoadingProfile ||
    isloadingEditProfile ||
    isCountriesLoading ||
    isCitiesLoading
  ) {
    return <Spinner />
  }

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
            // eslint-disable-next-line react/jsx-no-comment-textnodes
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
                //todo сделать поле в комп-те необязательным
                getDataForCombobox={setGetDataForCountry}
                name={'country'}
                onInputClick={handleClickInputCountries}
                options={countriesValues ?? []}
                setValue={setValueCountry}
                value={valueCountry}
              />
            </div>
            <div style={{ flexGrow: 1 }}>
              <div>Select your city</div>

              <FormCombobox
                control={control}
                getDataForCombobox={setGetDataForCity}
                name={'city'}
                onInputClick={handleClickInputCity}
                options={citiesValues ?? []}
                setValue={setValueCity}
                value={valueCity}
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
