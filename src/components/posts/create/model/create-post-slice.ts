import { commonVariables } from '@/consts/common-variables'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ImageType = {
  id: number
  img: string
  type: string
}

export type CreatePostState = {
  croppedImages: ImageType[]
  filters: { [key: number]: string }
  images: ImageType[]
  page: number
  photoUploadError: string
  postDescription: string
  postDescriptionError: string
}

const initialState: CreatePostState = {
  croppedImages: [] as ImageType[],
  filters: {} as { [key: number]: string },
  images: [] as ImageType[],
  page: 0,
  photoUploadError: '',
  postDescription: '',
  postDescriptionError: '',
}

export const createPostSlice = createSlice({
  initialState,
  name: 'createPost',
  reducers: {
    deleteImg: (state, action: PayloadAction<{ id: number }>) => {
      state.croppedImages = state.croppedImages.filter(el => el.id !== action.payload.id)
    },
    nextPage: state => {
      state.page = state.page + 1
    },
    prevPage: state => {
      state.page = state.page - 1
    },
    resetState: () => initialState,
    setCroppedImage: (state, action: PayloadAction<{ id: number; img: string }>) => {
      const { id, img } = action.payload
      const index = state.croppedImages.findIndex(item => item.id === id)

      if (index !== -1) {
        state.croppedImages[index].img = img
        state.croppedImages[index].type = state.images[index].type
      }
    },
    setDraftData: (state, action: PayloadAction<CreatePostState>) => {
      return action.payload
    },
    setImage: (state, action: PayloadAction<{ img: string; type: string }>) => {
      const newImage: ImageType = {
        id: state.images.length,
        img: action.payload.img,
        type: action.payload.type,
      }

      state.images.push(newImage)
      state.croppedImages.push(newImage)
    },
    setImageFilter: (state, action: PayloadAction<{ filter: string; id: number }>) => {
      const { filter, id } = action.payload

      state.filters[id] = filter
    },
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page
    },
    setPhotoUploadError: (state, action: PayloadAction<{ uploadError: string }>) => {
      state.photoUploadError = action.payload.uploadError
    },
    setPostDescription: (
      state,
      action: PayloadAction<{ description: string; errorText: string }>
    ) => {
      if (action.payload.description.length > commonVariables.POST_DESCRIPTION_LIMIT) {
        state.postDescriptionError = action.payload.errorText
      } else {
        state.postDescriptionError = ''
      }
      state.postDescription = action.payload.description
    },
  },
})

export const createPostReducer = createPostSlice.reducer
export const {
  deleteImg,
  nextPage,
  prevPage,
  resetState,
  setCroppedImage,
  setDraftData,
  setImage,
  setImageFilter,
  setPage,
  setPhotoUploadError,
  setPostDescription,
} = createPostSlice.actions
