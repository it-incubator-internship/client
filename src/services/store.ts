// eslint-disable-next-line import/no-unresolved
import { configureStore } from '@reduxjs/toolkit'

import { inctagramApi } from './inctagramApi'

export const store = configureStore({
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(inctagramApi.middleware),
  reducer: {
    [inctagramApi.reducerPath]: inctagramApi.reducer,
  },
})
