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

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    loginEmail: builder.mutation<LoginEmailResponse, LoginEmailRequest>({
      invalidatesTags: ['Me'],
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
          dispatch(appActions.setIsAuthenticated(false))
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
          dispatch(appActions.setIsAuthenticated(true))
        } catch (error) {
          dispatch(appActions.setIsAuthenticated(false))
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
