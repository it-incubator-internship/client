import { inctagramApi } from '../inctagramApi'
import {
  Post,
  createPostArgs,
  getPostsResponse,
  getUserPostsResponse,
  uploadPhotosARgs,
} from './posts-types'

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
    deletePost: builder.mutation<void, { postId: string }>({
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `/v1/post/${postId}`,
      }),
    }),
    getPosts: builder.query<getPostsResponse, { pageNumber: number; pageSize: number }>({
      query: ({ pageNumber = 1, pageSize = 4 }) => ({
        method: 'GET',
        url: `/v1/post?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      }),
    }),
    getUserPost: builder.query<Post, { postId: string }>({
      providesTags: ['Post'],
      query: ({ postId }) => ({
        method: 'GET',
        url: `/v1/post/${postId}/post`,
      }),
    }),
    getUserPosts: builder.query<getUserPostsResponse, { lastCursor?: string; userId: string }>({
      query: ({ lastCursor = '', userId }) => ({
        method: 'GET',
        url: `/v1/post/${userId}?cursor=${lastCursor}`,
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

export const { getPosts, getUserPost, getUserPosts } = postsApi.endpoints

export const {
  util: { getRunningQueriesThunk },
} = postsApi
export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useGetUserPostQuery,
  useGetUserPostsQuery,
  useLazyGetUserPostsQuery,
  useUploadPostPhotosMutation,
} = postsApi
