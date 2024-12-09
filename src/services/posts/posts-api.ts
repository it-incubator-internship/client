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
    getPosts: builder.query<getPostsResponse, { pageNumber: number; pageSize: number }>({
      query: ({ pageNumber = 1, pageSize = 4 }) => ({
        method: 'GET',
        url: `/v1/post?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      }),
    }),
    getUserPost: builder.query<Post, { postId: string }>({
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
  useGetPostsQuery,
  useGetUserPostQuery,
  useGetUserPostsQuery,
  useUploadPostPhotosMutation,
} = postsApi
