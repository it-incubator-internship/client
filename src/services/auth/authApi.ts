import { LoginArgs } from '@/services/auth/authTypes'

import { inctagramApi } from '../inctagramApi'

const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<undefined, LoginArgs>({
      query: ({ email }) => ({
        body: { email },
        method: 'POST',
        url: `/v1/auth/login`,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
