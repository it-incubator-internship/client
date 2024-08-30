import { LoginArgs, LoginResponse, MeResponse } from '@/services/auth/authTypes'

import { inctagramApi } from '../inctagramApi'

const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
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
