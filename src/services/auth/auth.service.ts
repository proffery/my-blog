import { endpoints } from '@/common/constants/endpoints'
import { appActions } from '@/services/app/app.slice'
import {
  LoginEmailRequest,
  LoginEmailResponse,
  LogoutResponse,
  MeResponse,
  RegistrationRequest,
  RegistrationResponse,
} from '@/services/auth/auth.types'
import { baseApi } from '@/services/base-api'
import { userActions } from '@/services/user/user.slice'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    loginEmail: builder.mutation<LoginEmailResponse, LoginEmailRequest>({
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
        url: endpoints.loginEmail,
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
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
        url: endpoints.logout,
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
        url: endpoints.me,
      }),
    }),
    registration: builder.mutation<RegistrationResponse, RegistrationRequest>({
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
        url: endpoints.registration,
      }),
    }),
  }),
})

export const { useLoginEmailMutation, useLogoutMutation, useMeQuery, useRegistrationMutation } =
  authService
