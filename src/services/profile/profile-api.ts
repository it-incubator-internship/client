import { inctagramApi } from '../inctagramApi'
import { EditProfileArgs, EditProfileResponse } from './profile-types'

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
  useLazyGetProfileQuery,
  useSendAvatarToServerMutation,
} = profileApi
