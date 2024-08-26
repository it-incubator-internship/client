import { configureStore } from '@reduxjs/toolkit'

import { inctagramApi } from './inctagramApi'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(inctagramApi.middleware),
  reducer: {
    [inctagramApi.reducerPath]: inctagramApi.reducer,
  },
})
