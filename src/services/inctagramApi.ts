import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://navaibe.ru/api',
  credentials: 'include',
  prepareHeaders: headers => {
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

export const inctagramApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  tagTypes: ['Me'],
})
