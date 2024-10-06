import { inctagramApi } from '../inctagramApi'
import { CountryReturnType, EditProfileArgs } from './profile-types'

const transformData = (data: CountryReturnType[], locale: string) => {
  const countryEn: Array<{ country_id: number; value: string }> = []
  const countryRu: Array<{ country_id: number; value: string }> = []

  const COUNTRIES_EN = 'countries-en'
  const COUNTRIES_RU = 'countries-ru'

  data.forEach(country => {
    countryEn.push({
      country_id: country.country_id,
      value: country.title_en,
    })

    countryRu.push({
      country_id: country.country_id,
      value: country.title_ru,
    })
  })

  const stringifiedEn = JSON.stringify(countryEn)

  localStorage.setItem(COUNTRIES_EN, stringifiedEn)

  const stringifiedRu = JSON.stringify(countryRu)

  localStorage.setItem(COUNTRIES_RU, stringifiedRu)
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
    getCountries: builder.query<CountryReturnType[], void>({
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        console.log(' data: ', data)
        if (!data) {
          return
        }
        transformData(data, 'ru')
        transformData(data, 'en')
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
export const { useEditProfileMutation, useGetProfileQuery, useLazyGetCountriesQuery } = profileApi
