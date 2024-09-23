import {
  ChangePublishFeedbackRequest,
  ChangePublishFeedbackResponse,
  ChangeReadFeedbackRequest,
  ChangeReadFeedbackResponse,
  CreateFeedbackRequest,
  CreateFeedbackResponse,
  DeleteFeedbackRequest,
  DeleteFeedbackResponse,
  GetFeedbacksRequest,
  GetFeedbacksResponse,
} from '@/app/api/feedbacks/feedbacks.types'
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
import { baseApi } from '@/services/base-api'

export const feedbacksService = baseApi.injectEndpoints({
  endpoints: builder => ({
    allFeedbacks: builder.query<GetFeedbacksResponse, GetFeedbacksRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      providesTags: ['Feedbacks'],
      query: searchParams => ({
        params: searchParams,
        url: endpoints.feedbacks_all,
      }),
    }),
    createFeedback: builder.mutation<CreateFeedbackResponse, CreateFeedbackRequest>({
      invalidatesTags: ['Feedbacks'],
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
        url: endpoints.feedbacks_create,
      }),
    }),
    deleteFeedback: builder.mutation<DeleteFeedbackResponse, DeleteFeedbackRequest>({
      invalidatesTags: ['Feedbacks'],
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
        url: endpoints.feedbacks_delete,
      }),
    }),
    publishFeedback: builder.mutation<ChangePublishFeedbackResponse, ChangePublishFeedbackRequest>({
      invalidatesTags: ['Feedbacks'],
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
        url: endpoints.feedbacks_publish,
      }),
    }),
    readFeedback: builder.mutation<ChangeReadFeedbackResponse, ChangeReadFeedbackRequest>({
      invalidatesTags: ['Feedbacks'],
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
        url: endpoints.feedbacks_read,
      }),
    }),
  }),
})

export const {
  useAllFeedbacksQuery,
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
  usePublishFeedbackMutation,
  useReadFeedbackMutation,
} = feedbacksService
