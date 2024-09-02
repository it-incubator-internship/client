import { createAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  isInitialized: boolean
}

export const isInitialized = createAction('app/isInitialized')

const initialState: InitialState = {
  isInitialized: false,
}

const slice = createSlice({
  extraReducers: builder => {
    builder.addCase(isInitialized, state => {
      state.isInitialized = true
    })
  },
  initialState,
  name: 'app',
  reducers: {},
})

export const appReducer = slice.reducer
