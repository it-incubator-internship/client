import { useReducer } from 'react'

const FILE_VALIDATION_CONFIG = {
  allowedFileTypes: ['image/png', 'image/jpeg'],
  maxFileSize: 10 * 1024 * 1024,
}

const initialState = {
  isError: '',
  isFileLoad: false,
  isPreview: null,
}

type State = {
  isError: string
  isFileLoad: boolean
  isPreview: null | string
}

type Action =
  | { payload: string; type: 'SET_ERROR' }
  | { payload: string; type: 'SET_PREVIEW' }
  | { type: 'FILE_LOADED' }
  | { type: 'RESET' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, isError: action.payload }
    case 'SET_PREVIEW':
      return { ...state, isPreview: action.payload }
    case 'FILE_LOADED':
      return { ...state, isFileLoad: true }
    case 'RESET':
      return initialState
  }
}

export const useAvatarDialog = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const validateFile = (file: File) => {
    if (file.size > FILE_VALIDATION_CONFIG.maxFileSize) {
      dispatch({ payload: 'Error! Photo size must be less than 4 MB', type: 'SET_ERROR' })

      return false
    }
    if (!FILE_VALIDATION_CONFIG.allowedFileTypes.includes(file.type)) {
      dispatch({
        payload: 'Error! The format of the uploaded photo must be PNG or JPEG',
        type: 'SET_ERROR',
      })

      return false
    }
    dispatch({ payload: '', type: 'SET_ERROR' })

    return true
  }

  return { dispatch, state, validateFile }
}
