import { inctagramApi } from '../inctagramApi'
import { CountryReturnType, EditProfileArgs } from './profile-types'

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
