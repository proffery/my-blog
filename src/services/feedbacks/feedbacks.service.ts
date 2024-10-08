import { toast } from 'react-toastify'

import {
  ChangePublishFeedbackRequest,
  ChangePublishFeedbackResponse,
  CreateFeedbackRequest,
  CreateFeedbackResponse,
  DeleteFeedbackRequest,
  DeleteFeedbackResponse,
  GetFeedbacksRequest,
  GetFeedbacksResponse,
  GetPublishedFeedbacksRequest,
  GetPublishedFeedbacksResponse,
} from '@/app/api/feedbacks/feedbacks.types'
import { endpoints } from '@/common/constants/endpoints'
import { errorNotification } from '@/common/utils/errors-notification'
import { baseApi } from '@/services/base-api'

export const feedbacksService = baseApi.injectEndpoints({
  endpoints: builder => ({
    allFeedbacks: builder.query<GetFeedbacksResponse, GetFeedbacksRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          errorNotification(error)
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
      async onQueryStarted({ email, name }, { queryFulfilled }) {
        try {
          await queryFulfilled

          toast.success(
            `${name}, your review has been delivered. If it requires a response, it will be sent to your email: ${email}`
          )
        } catch (error) {
          errorNotification(error)
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: endpoints.feedbacks_create,
      }),
    }),
    deleteFeedback: builder.mutation<DeleteFeedbackResponse, DeleteFeedbackRequest>({
      invalidatesTags: ['Feedbacks', 'PublishedFeedbacks'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled

          toast.success(`Feedback has been deleted.`)
        } catch (error) {
          errorNotification(error)
        }
      },
      query: body => ({
        body,
        method: 'DELETE',
        url: endpoints.feedbacks_delete,
      }),
    }),
    publishFeedback: builder.mutation<ChangePublishFeedbackResponse, ChangePublishFeedbackRequest>({
      invalidatesTags: ['Feedbacks', 'PublishedFeedbacks'],
      async onQueryStarted({ isPublished }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          toast.success(
            isPublished
              ? 'The feedback is being published!'
              : 'The feedback is no longer published.'
          )
        } catch (error) {
          errorNotification(error)
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: endpoints.feedbacks_publish,
      }),
    }),
    publishedFeedbacks: builder.query<GetPublishedFeedbacksResponse, GetPublishedFeedbacksRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          errorNotification(error)
        }
      },
      providesTags: ['PublishedFeedbacks'],
      query: searchParams => ({
        params: searchParams,
        url: endpoints.feedbacks_published,
      }),
    }),
  }),
})

export const {
  useAllFeedbacksQuery,
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
  usePublishFeedbackMutation,
  usePublishedFeedbacksQuery,
} = feedbacksService
