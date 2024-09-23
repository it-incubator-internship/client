import { inctagramApi } from '../inctagramApi'
import { EditProfileArgs } from './profile-types'

export const profileApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    editProfile: builder.mutation<void, EditProfileArgs>({
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
    getProfile: builder.query<EditProfileArgs, { id: string }>({
      query: args => ({
        method: 'GET',
        url: `/v1/user/profile/${args.id}`,
      }),
    }),
  }),
})
export const { useEditProfileMutation, useGetProfileQuery } = profileApi
