import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { showErrorToast } from '@/utils/toastConfig'
// eslint-disable-next-line no-duplicate-imports
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  prepareHeaders: (headers: Headers) => {
    let token

    try {
      token = localStorage.getItem('accessToken')
    } catch (e) {
      console.log('localStorage is not accessible')
    }

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

        if (
          typeof refreshResult.data === 'object' &&
          refreshResult.data !== null &&
          'accessToken' in refreshResult.data &&
          refreshResult.data?.accessToken &&
          typeof refreshResult.data?.accessToken === 'string'
        ) {
          try {
            localStorage.setItem('accessToken', refreshResult.data?.accessToken)
          } catch (e) {
            console.log('localStorage is not accessible')
          }
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
  } else if (result.error) {
    if (result.error.status === 'FETCH_ERROR') {
      showErrorToast('Some problems with your connection')
    }
  }

  return result
}
