import { inctagramApi } from '../inctagramApi'
import {
  CityReturnType,
  CountryLocale,
  CountryReturnType,
  EditProfileArgs,
  TransformedType,
} from './profile-types'

const transformDataCountry = (data: CountryReturnType[], locale: string) => {
  const countryEn: Array<TransformedType> = []
  const countryRu: Array<TransformedType> = []

  data.forEach(country => {
    countryEn.push({
      label: country.title_en,
      value: { id: country.country_id, name: country.title_en },
    })

    countryRu.push({
      label: country.title_ru,
      value: { id: country.country_id, name: country.title_ru },
    })
  })

  const stringifiedEn = JSON.stringify(countryEn)

  localStorage.setItem(CountryLocale.en, stringifiedEn)

  const stringifiedRu = JSON.stringify(countryRu)

  localStorage.setItem(CountryLocale.ru, stringifiedRu)
}

export const profileApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    editProfile: builder.mutation<void, EditProfileArgs>({
      invalidatesTags: ['Profile'],
      query: args => ({
        body: {
          aboutMe: args.aboutMe,
          city: args.city,
          country: args.country,
          dateOfBirth: args.dateOfBirth,
          firstName: args.firstName,
          lastName: args.lastName,
          userName: args.userName,
        },
        method: 'PUT',
        url: `/v1/user/profile/${args.id}`,
      }),
    }),
    getCities: builder.query<CityReturnType[], { id: number }>({
      query: args => ({
        method: 'GET',
        url: `/v1/localization/cities/${args.id}`,
      }),
    }),
    getCountries: builder.query<CountryReturnType[], void>({
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        if (!data) {
          return
        }

        transformDataCountry(data, 'ru')
        transformDataCountry(data, 'en')
      },
      query: args => ({
        method: 'GET',
        url: `/v1/localization/countries`,
      }),
    }),

    getProfile: builder.query<EditProfileArgs, { id: string }>({
      providesTags: ['Profile'],
      query: args => ({
        method: 'GET',
        url: `/v1/user/profile/${args.id}`,
      }),
    }),
  }),
})
export const {
  useEditProfileMutation,
  useGetProfileQuery,
  useLazyGetCitiesQuery,
  useLazyGetCountriesQuery,
} = profileApi
