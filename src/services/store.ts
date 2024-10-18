import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { createPostReducer } from '@/components/posts/create/model/create-post-slice'
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { inctagramApi } from './inctagramApi'

export const store = configureStore({
  devTools: true,
  middleware: gDM => gDM().concat(inctagramApi.middleware),
  reducer: {
    createPost: createPostReducer,
    [inctagramApi.reducerPath]: inctagramApi.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(inctagramApi.middleware),
    reducer: {
      createPost: createPostReducer,
      [inctagramApi.reducerPath]: inctagramApi.reducer,
    },
  })

export type RootAppState = ReturnType<typeof makeStore>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export an assembled wrapper
export const wrapper = createWrapper<RootAppState>(makeStore, { debug: false })
