import { endpoints } from '@/common/constants/endpoints'
import { appActions } from '@/services/app/app.slice'
import {
  ApiResponse,
  ChangeNameRequest,
  LoginEmailRequest,
  MeResponse,
  RegistrationRequest,
  VerifyEmailRequest,
} from '@/services/auth/auth.types'
import { baseApi } from '@/services/base-api'
import { userActions } from '@/services/user/user.slice'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    changeName: builder.mutation<ApiResponse, ChangeNameRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      query: () => ({
        method: 'POST',
        url: endpoints.auth_changeName,
      }),
    }),
    loginEmail: builder.mutation<ApiResponse, LoginEmailRequest>({
      invalidatesTags: ['Me'],
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
        url: endpoints.auth_loginEmail,
      }),
    }),

    logout: builder.mutation<ApiResponse, void>({
      invalidatesTags: ['Me'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(userActions.setIsAuthenticated(false))
        } catch (error) {
          console.error(error)
        }
      },
      query: () => ({
        method: 'DELETE',
        url: endpoints.auth_logout,
      }),
    }),

    me: builder.query<MeResponse, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(userActions.setIsAuthenticated(true))
        } catch (error) {
          console.error(error)
        } finally {
          dispatch(appActions.setAppIsInitialized(true))
        }
      },
      providesTags: ['Me'],
      query: () => ({
        method: 'GET',
        url: endpoints.auth_me,
      }),
    }),
    registration: builder.mutation<ApiResponse, RegistrationRequest>({
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
        url: endpoints.auth_registration,
      }),
    }),
    sendVerifyEmail: builder.mutation<ApiResponse, void>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      query: () => ({
        method: 'POST',
        url: endpoints.auth_sendVerifyEmail,
      }),
    }),

    verifyEmail: builder.mutation<ApiResponse, VerifyEmailRequest>({
      invalidatesTags: ['Me'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      query: () => ({
        method: 'POST',
        url: endpoints.auth_verifyEmail,
      }),
    }),
  }),
})

export const {
  useChangeNameMutation,
  useLoginEmailMutation,
  useLogoutMutation,
  useMeQuery,
  useRegistrationMutation,
  useSendVerifyEmailMutation,
  useVerifyEmailMutation,
} = authService
