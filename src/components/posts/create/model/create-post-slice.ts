import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ImageType = {
  id: number
  img: string
}

export const FILE_VALIDATION_CONFIG = {
  allowedFileTypes: ['image/png', 'image/jpeg'],
  maxFileSize: 10 * 1024 * 1024,
}
// 'image/webp'

export type CreatePostState = {
  croppedImages: ImageType[]
  images: ImageType[]
  page: number
  photoUploadError: string
}

export const createPostSlice = createSlice({
  initialState: {
    croppedImages: [] as ImageType[],
    filters: {} as { [key: number]: string },
    images: [] as ImageType[],
    page: 0,
    photoUploadError: '',
  },
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
    setCroppedImage: (state, action: PayloadAction<{ id: number; img: string }>) => {
      const { id, img } = action.payload
      const index = state.croppedImages.findIndex(item => item.id === id)

      if (index !== -1) {
        state.croppedImages[index].img = img
      }
    },
    setDraftData: (state, action: PayloadAction<CreatePostState>) => {
      return action.payload
    },
    setImage: (state, action: PayloadAction<{ img: string }>) => {
      const newImage: ImageType = {
        id: state.images.length,
        img: action.payload.img,
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
  },
})

export const createPostReducer = createPostSlice.reducer
export const {
  deleteImg,
  nextPage,
  prevPage,
  setCroppedImage,
  setDraftData,
  setImage,
  setImageFilter,
  setPage,
  setPhotoUploadError,
} = createPostSlice.actions
