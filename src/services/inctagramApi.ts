import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './inctagram.baseQuery'

//reducer
export const inctagramApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  tagTypes: ['Me'],
})
