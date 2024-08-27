import { endpoints } from '@/common/constants/endpoints'
import { baseApi } from '@/services/base-api'
import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostRequest,
  DeletePostResponse,
  GetPostRequest,
  GetPostResponse,
  GetPostsListResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from '@/services/posts/posts.types'

export const postsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
      invalidatesTags: ['Posts'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: endpoints.posts_create,
      }),
    }),
    deletePost: builder.mutation<DeletePostResponse, DeletePostRequest>({
      invalidatesTags: ['Posts'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      query: body => ({
        body,
        method: 'DELETE',
        url: endpoints.posts_delete,
      }),
    }),
    getPost: builder.mutation<GetPostResponse, GetPostRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: endpoints.posts_get_post,
      }),
    }),
    getPostsList: builder.query<GetPostsListResponse, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      providesTags: ['Posts'],
      query: () => ({
        method: 'GET',
        url: endpoints.posts_get_all,
      }),
    }),
    updatePost: builder.mutation<UpdatePostResponse, UpdatePostRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
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

export const {} = postsService
