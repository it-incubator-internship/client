import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  prepareHeaders: (headers: Headers) => {
    const token = localStorage.getItem('accessToken')

    if (headers.get('Authorization')) {
      return headers
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            credentials: 'include',
            method: 'POST',
            url: '/v1/auth/refresh-token',
          },
          api,
          extraOptions
        )

        console.log(refreshResult)

        if (
          typeof refreshResult.data === 'object' &&
          refreshResult.data !== null &&
          'accessToken' in refreshResult.data &&
          refreshResult.data?.accessToken &&
          typeof refreshResult.data?.accessToken === 'string'
        ) {
          localStorage.setItem('accessToken', refreshResult.data?.accessToken)
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          //   api.dispatch(loggedOut())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
