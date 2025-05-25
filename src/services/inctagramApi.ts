import type { Action, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/services/store'
import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { baseQueryWithReauth } from './inctagram.baseQuery'

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

//reducer
export const inctagramApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'inctagramApi',
  tagTypes: ['Me', 'Sessions', 'Profile', 'Post', 'Subscription'],
})
