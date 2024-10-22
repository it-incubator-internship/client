import { useDispatch, useSelector } from 'react-redux'

import { createPostReducer } from '@/components/posts/create/model/create-post-slice'
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { inctagramApi } from './inctagramApi'

const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(inctagramApi.middleware),
    reducer: {
      createPost: createPostReducer,
      [inctagramApi.reducerPath]: inctagramApi.reducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
