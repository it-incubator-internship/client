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