export type EditProfileArgs = {
  aboutMe?: string | undefined
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  id: string
  lastName: string
  userName: string
}

export type CountryReturnType = {
  country_id: number
  title_en: string
  title_ru: string
}

export enum CountryLocale {
  en = 'countries-en',
  ru = 'countries-ru',
}

export type TransformedType = {
  label: string
  value: { id: number; name: string }
}

export type CityReturnType = {
  city_id: number
  country_id: number
  title_ru: string
}