import { PATH } from '@/consts/route-paths'
import {
  LoginArgs,
  LoginResponse,
  MeResponse,
  RegistrationArgs,
  RegistrationConfirmationArgs,
  RegistrationResendingArgs,
  RegistrationResponse,
} from '@/services/auth/authTypes'
import Router from 'next/router'

import { inctagramApi } from '../inctagramApi'

const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    githubLogin: builder.query<undefined, void>({
      query: () => `/v1/auth/github`,
    }),
    googleLogin: builder.query<undefined, void>({
      query: () => `/v1/auth/google`,
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        if (!data) {
          return
        }

        localStorage.setItem('accessToken', data.accessToken)
      },
      query: ({ email, password }) => {
        const storedIp = sessionStorage.getItem('clientIp') || ''

        return {
          body: { email, password },
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-Client-IP': storedIp,
          },
          method: 'POST',
          url: `/v1/auth/login`,
        }
      },
    }),
    logout: builder.mutation<void, void>({
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          localStorage.removeItem('accessToken')
          dispatch(inctagramApi.util.invalidateTags(['Me']))
          dispatch(inctagramApi.util.resetApiState())
          void Router.replace(PATH.LOGIN)
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
    registration: builder.mutation<RegistrationResponse, RegistrationArgs>({
      query: (regArgs: RegistrationArgs) => ({
        body: regArgs,
        method: 'POST',
        url: `/v1/auth/registration`,
      }),
    }),
    registrationConfirmation: builder.mutation<void, RegistrationConfirmationArgs>({
      query: (code: RegistrationConfirmationArgs) => ({
        body: code,
        method: 'POST',
        url: `/v1/auth/registration-confirmation`,
      }),
    }),
    registrationResending: builder.mutation<void, RegistrationResendingArgs>({
      query: (email: RegistrationResendingArgs) => ({
        body: email,
        method: 'POST',
        url: `/v1/auth/registration-email-resending`,
      }),
    }),
  }),
})

export const {
  useLazyGithubLoginQuery,
  useLazyGoogleLoginQuery,
  useLazyMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRegistrationConfirmationMutation,
  useRegistrationMutation,
  useRegistrationResendingMutation,
} = authApi
