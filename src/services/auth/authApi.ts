import { LoginArgs, LoginResponse, MeResponse } from '@/services/auth/authTypes'

import { inctagramApi } from '../inctagramApi'

const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginArgs>({
      invalidatesTags: ['Me'],
      query: ({ email, password }) => ({
        body: { email, password },
        credentials: 'same-origin',
        method: 'POST',
        url: `/v1/auth/login`,
      }),
    }),
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => `/v1/auth/me`,
    }),
  }),
})

export const { useLazyMeQuery, useLoginMutation, useMeQuery } = authApi
