import { LoginArgs, LoginResponse, MeResponse } from '@/services/auth/authTypes'
import Router from 'next/router'

import { inctagramApi } from '../inctagramApi'

const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    googleLogin: builder.query<undefined, void>({
      query: () => `/v1/auth/google`,
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      async onQueryStarted(
        // 1 параметр: QueryArg - аргументы, которые приходят в query
        _,
        // 2 параметр: MutationLifecycleApi - dispatch, queryFulfilled, getState и пр.
        // queryFulfilled - это промис, возвращаемый RTK Query, который разрешается,
        // когда запрос успешно завершен
        { queryFulfilled }
      ) {
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
    logout: builder.mutation<void, void>({
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          localStorage.removeItem('accessToken')
          dispatch(inctagramApi.util.invalidateTags(['Me']))
          dispatch(inctagramApi.util.resetApiState())
          void Router.replace('/')
        } catch (error) {
          console.error('Logout failed:', error)
        }
      },
      query: () => {
        return {
          credentials: 'include',
          method: 'POST',
          url: '/v1/auth/logout',
        }
      },
    }),
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => `/v1/auth/me`,
    }),
  }),
})

export const { useLazyGoogleLoginQuery, useLazyMeQuery, useLoginMutation, useLogoutMutation, useMeQuery } = authApi
