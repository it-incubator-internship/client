import { LoginArgs, LoginResponse, MeResponse } from '@/services/auth/authTypes'

import { inctagramApi } from '../inctagramApi'

const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginArgs>({
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        if (!data) {
          return
        }

        localStorage.setItem('accessToken', data.accessToken)
      },
      query: ({ email, password }) => ({
        body: { email, password },
        credentials: 'include',
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
