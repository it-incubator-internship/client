import { inctagramApi } from '../inctagramApi'
import { Post, createPostArgs, getUserPostsResponse, uploadPhotosARgs } from './posts-types'

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
    getUserPost: builder.query<Post, { postId: string }>({
      providesTags: ['Post'],
      query: ({ postId }) => ({
        method: 'GET',
        url: `/v1/post/${postId}/post`,
      }),
    }),
    getUserPosts: builder.query<getUserPostsResponse, { userId: string }>({
      query: ({ userId }) => ({
        method: 'GET',
        url: `/v1/post/${userId}`,
      }),
    }),
    uploadPostPhotos: builder.mutation<void, uploadPhotosARgs>({
      invalidatesTags: ['Post'],
      query: ({ photos, postId }) => ({
        body: photos,
        method: 'POST',
        url: `/v1/file/post/${postId}`,
      }),
    }),
  }),
})

export const { getUserPost, getUserPosts } = postsApi.endpoints

export const {
  util: { getRunningQueriesThunk },
} = postsApi
export const {
  useCreatePostMutation,
  useGetUserPostQuery,
  useGetUserPostsQuery,
  useUploadPostPhotosMutation,
} = postsApi
