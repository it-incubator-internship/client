import { inctagramApi } from '../inctagramApi'
import { createPostArgs, getUserPostsResponse, uploadPhotosARgs } from './posts-types'

export const postsApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<{ postId: string }, createPostArgs>({
      query: ({ description, imageCount }) => ({
        body: {
          description,
          imageCount,
        },
        method: 'POST',
        url: `/v1/post`,
      }),
    }),
    getUserPosts: builder.query<getUserPostsResponse, { userId: string }>({
      query: ({ userId }) => ({
        method: 'GET',
        url: `/v1/post/${userId}`,
      }),
    }),
    uploadPostPhotos: builder.mutation<void, uploadPhotosARgs>({
      query: ({ photos, postId }) => ({
        body: photos,
        method: 'POST',
        url: `/v1/file/post/${postId}`,
      }),
    }),
  }),
})

export const { getUserPosts } = postsApi.endpoints

export const {
  util: { getRunningQueriesThunk },
} = postsApi
export const { useCreatePostMutation, useGetUserPostsQuery, useUploadPostPhotosMutation } = postsApi
