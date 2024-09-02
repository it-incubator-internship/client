// eslint-disable-next-line import/no-unresolved
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { appReducer } from '@/services/slices/slice'
import { configureStore } from '@reduxjs/toolkit'

import { inctagramApi } from './inctagramApi'

export const store = configureStore({
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(inctagramApi.middleware),
  reducer: {
    appReducer,
    [inctagramApi.reducerPath]: inctagramApi.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
