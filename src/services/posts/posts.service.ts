import { GetPostParams } from '@/app/api/posts/post/[postId]/route'
import { GetPostsSearchParams } from '@/app/api/posts/route'
import { endpoints } from '@/common/constants/endpoints'
import { baseApi } from '@/services/base-api'
import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostRequest,
  DeletePostResponse,
  GetPostResponse,
  GetPostsResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from '@/services/posts/posts.types'

export const postsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
      invalidatesTags: ['Posts', 'PostsByAuthor'],
      async onQueryStarted(_, { queryFulfilled }) {
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
      invalidatesTags: ['Posts', 'PostsByAuthor'],
      async onQueryStarted(_, { queryFulfilled }) {
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
    getPost: builder.query<GetPostResponse, GetPostParams>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      query: ({ params: { postId } }) => ({
        url: endpoints.posts_get_post + '/' + postId,
      }),
    }),
    getPosts: builder.query<GetPostsResponse, GetPostsSearchParams>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      providesTags: ['PostsByAuthor'],
      query: searchParams => ({
        params: searchParams,
        url: endpoints.posts,
      }),
    }),
    updatePost: builder.mutation<UpdatePostResponse, UpdatePostRequest>({
      invalidatesTags: ['Posts', 'PostsByAuthor'],
      async onQueryStarted(_, { queryFulfilled }) {
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

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
} = postsService