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
import { NextRouter } from 'next/router'

type Props = {
  profileData: EditProfileResponse | undefined
  router: NextRouter
  setValue: UseFormSetValue<updateProfileFormValues>
  watch: UseFormWatch<updateProfileFormValues>
}

export const useCountriesAndCities = ({ profileData, router, setValue, watch }: Props) => {
  const [getCountries, { isError: isCountryError, isLoading: isCountriesLoading }] =
    useLazyGetCountriesQuery()
  const [getCities, { isError: isCityError, isLoading: isCitiesLoading }] = useLazyGetCitiesQuery()
  const [countriesValues, setCountriesValues] = useState<TransformedType[]>([])
  const [citiesValues, setCitiesValues] = useState<TransformedType[] | null>([])
  const [dataForCountry, setGetDataForCountry] = useState<TransformedType | null>(null)
  const [dataForCity, setGetDataForCity] = useState<TransformedType | null>(null)
  const [arrowDownPressed, setArrowDownPressed] = useState<boolean>(false)

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

  const handleClickInputCity = (countryObject: TransformedType = null) => {
    const dataObject = countryObject || dataForCountry
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

  function setCityToLocalStorage(cities: TransformedType[], currentLocale: CurrentLocaleType) {
    const citiesStringified = JSON.stringify(cities)

    localStorage.setItem(currentLocale?.city as string, citiesStringified)
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
    setArrowDownPressed(false)
    setCitiesValues(null)
  }, [dataForCountry])

  return {
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
  }
}
