import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ImageType = {
  id: number
  img: string
}

export const createPostSlice = createSlice({
  initialState: {
    croppedImages: [] as ImageType[],
    images: [] as ImageType[],
    page: 1,
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
    setImage: (state, action: PayloadAction<{ img: string }>) => {
      const newImage: ImageType = {
        id: state.images.length,
        img: action.payload.img,
      }

      state.images.push(newImage)
      state.croppedImages.push(newImage)
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
  setImage,
  setPage,
  setPhotoUploadError,
} = createPostSlice.actions
