import { useEffect, useState } from 'react'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { updateProfileFormValues } from '@/schemas/updateProfileSchema'
import { useLazyGetCitiesQuery, useLazyGetCountriesQuery } from '@/services/profile/profile-api'
import {
  CityLocale,
  CityReturnType,
  CountryLocale,
  CurrentLocaleType,
  EditProfileResponse,
  RouterLocale,
  Terra,
  TransformedType,
} from '@/services/profile/profile-types'
import { Storage } from '@/utils/storage'
import { NextRouter } from 'next/router'

type Props = {
  profileData: EditProfileResponse | undefined
  router: NextRouter
  setValue: UseFormSetValue<updateProfileFormValues>
  watch: UseFormWatch<updateProfileFormValues>
}

export const useCountriesAndCities = ({ profileData, router, setValue, watch }: Props) => {
  const [getCountries, { isLoading: isCountriesLoading }] = useLazyGetCountriesQuery()
  const [getCities, { isLoading: isCitiesLoading }] = useLazyGetCitiesQuery()
  const [countriesValues, setCountriesValues] = useState<TransformedType[] | null>([])
  const [citiesValues, setCitiesValues] = useState<TransformedType[] | null>([])
  const [userSelectedCountry, setUserSelectedCountry] = useState<TransformedType | null>(null)
  const [userSelectedCity, setUserSelectedCity] = useState<TransformedType | null>(null)
  const storage = new Storage()

  const getCountriesFromLocalStorage = () => {
    const currentLocale = getCurrentLocale()
    const storedCountries = storage.getItem(currentLocale?.country as string)

    try {
      if (storedCountries) {
        handleStoredCountries(storedCountries)
      } else {
        getCountries()
          .unwrap()
          .then(() => {
            const storedCountries = storage.getItem(currentLocale?.country as string)

            if (storedCountries) {
              handleStoredCountries(storedCountries)
            }
          })
      }
    } catch (error) {
      console.error('Error parsing countries:', error)
    }
  }

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

    handleClickInputCity(countryObject)

    setCountriesValues(countries)
  }

  const handleClickInputCity = (countryObject: TransformedType = null) => {
    const currentLocale = getCurrentLocale()
    const storedCities = storage.getItem(currentLocale?.city as string)
    const cities = JSON.parse(storedCities as string)

    if (cities?.length > 0 && cities[0].value.id === countryObject?.value.id) {
      setCitiesValues(cities)

      return
    }

    if (countryObject?.value.id) {
      getCities({ id: countryObject?.value.id as number })
        .unwrap()
        .then(data => {
          const cities = transformDataCity(data)

          setCitiesValues(cities)

          setCityToLS(cities, currentLocale as CurrentLocaleType)
        })
        .catch((error: any) => {
          // eslint-disable-next-line
          console.log(error)
        })
    }
  }

  function setCityToLS(cities: TransformedType[], currentLocale: CurrentLocaleType) {
    const citiesStringified = JSON.stringify(cities)

    storage.setItem(currentLocale?.city as string, citiesStringified)
  }

  const transformDataCity = (data: CityReturnType[]): TransformedType[] => {
    return data.map(city => ({
      label: city.title_ru,
      value: { id: city.country_id, name: city.title_ru },
    }))
  }

  const countryValue = watch(Terra.country)

  useEffect(() => {
    if (!countryValue) {
      setValue(Terra.city, '')
    }
  }, [countryValue])

  useEffect(() => {
    // setCitiesValues(null)
  }, [userSelectedCountry])

  return {
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
  }
}
