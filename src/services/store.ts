// eslint-disable-next-line import/no-unresolved
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { inctagramApi } from './inctagramApi'

// create a makeStore function
const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(inctagramApi.middleware),
    reducer: {
      [inctagramApi.reducerPath]: inctagramApi.reducer,
    },
  })

export type RootAppState = ReturnType<typeof makeStore>

// export an assembled wrapper
export const wrapper = createWrapper<RootAppState>(makeStore, { debug: false })
