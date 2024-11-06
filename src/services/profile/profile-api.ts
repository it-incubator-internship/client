import { Storage } from '@/utils/storage'

import { inctagramApi } from '../inctagramApi'
import {
  CityReturnType,
  CountryLocale,
  CountryReturnType,
  EditProfileArgs,
  EditProfileResponse,
  TransformedType,
} from './profile-types'

const transformDataCountry = (data: CountryReturnType[], locale: string) => {
  const countryEn: Array<TransformedType> = []
  const countryRu: Array<TransformedType> = []
  const storage = new Storage()

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

  storage.setItem(CountryLocale.en, stringifiedEn)

  const stringifiedRu = JSON.stringify(countryRu)

  storage.setItem(CountryLocale.ru, stringifiedRu)
}

export const profileApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    deleteAvatarFromServer: builder.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: `/v1/file/avatar`,
      }),
    }),
    editProfile: builder.mutation<EditProfileResponse, EditProfileArgs>({
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

    getProfile: builder.query<EditProfileResponse, { id: string }>({
      providesTags: ['Profile'],
      query: args => ({
        method: 'GET',
        url: `/v1/user/profile/${args.id}`,
      }),
    }),
    sendAvatarToServer: builder.mutation<void, any>({
      query: file => ({
        body: file,
        method: 'POST',
        url: `/v1/file/avatar`,
      }),
    }),
  }),
})
export const {
  useDeleteAvatarFromServerMutation,
  useEditProfileMutation,
  useGetProfileQuery,
  useLazyGetCitiesQuery,
  useLazyGetCountriesQuery,
  useLazyGetProfileQuery,
  useSendAvatarToServerMutation,
} = profileApi
