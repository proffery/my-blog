import { toast } from 'react-toastify'

import {
  ChangePublishPostRequest,
  ChangePublishPostResponse,
  CreatePostRequest,
  CreatePostResponse,
  DeletePostRequest,
  DeletePostResponse,
  GetNotPublishedPostsRequest,
  GetNotPublishedPostsResponse,
  GetPostRequest,
  GetPostResponse,
  GetPostsRequest,
  GetPostsResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from '@/app/api/posts/posts.types'
import { endpoints } from '@/common/constants/endpoints'
import { errorNotification } from '@/common/utils/errors-notification'
import { baseApi } from '@/services/base-api'

export const postsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
      invalidatesTags: ['Posts', 'Post', 'NotPublishedPosts'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const response = await queryFulfilled

          toast.success(`Post "${response.data.title}" created successfully.`)
        } catch (error) {
          errorNotification(error)
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: endpoints.posts_create,
      }),
    }),
    deletePost: builder.mutation<DeletePostResponse, DeletePostRequest>({
      invalidatesTags: ['Posts', 'Post', 'NotPublishedPosts'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const response = await queryFulfilled

          toast.success(`Post deleted successfully.`)
        } catch (error) {
          errorNotification(error)
        }
      },
      query: body => ({
        body,
        method: 'DELETE',
        url: endpoints.posts_delete,
      }),
    }),
    getNotPublishedPosts: builder.query<GetNotPublishedPostsResponse, GetNotPublishedPostsRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          errorNotification(error)
        }
      },
      providesTags: ['NotPublishedPosts'],
      query: searchParams => ({
        params: searchParams,
        url: endpoints.posts_not_published,
      }),
    }),
    getPost: builder.query<GetPostResponse, GetPostRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          errorNotification(error)
        }
      },
      providesTags: ['Post'],
      query: ({ params: { postId } }) => ({
        url: endpoints.post + '/' + postId,
      }),
    }),
    getPosts: builder.query<GetPostsResponse, GetPostsRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          errorNotification(error)
        }
      },
      providesTags: ['Posts'],
      query: searchParams => ({
        params: searchParams,
        url: endpoints.posts,
      }),
    }),
    publishPost: builder.mutation<ChangePublishPostResponse, ChangePublishPostRequest>({
      invalidatesTags: ['Posts', 'Post', 'NotPublishedPosts'],
      async onQueryStarted({ isPublished }, { queryFulfilled }) {
        try {
          await queryFulfilled

          toast.success(
            isPublished ? 'The post is being published!' : 'The post is no longer published.'
          )
        } catch (error) {
          errorNotification(error)
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: endpoints.posts_publish,
      }),
    }),
    updatePost: builder.mutation<UpdatePostResponse, UpdatePostRequest>({
      invalidatesTags: ['Posts', 'Post', 'NotPublishedPosts'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const response = await queryFulfilled

          toast.success(`Post "${response.data.title}" updated successfully.`)
        } catch (error) {
          errorNotification(error)
        }
      },
      query: body => ({
        body,
        method: 'PUT',
        url: endpoints.posts_update,
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetNotPublishedPostsQuery,
  useGetPostQuery,
  useGetPostsQuery,
  usePublishPostMutation,
  useUpdatePostMutation,
} = postsService
