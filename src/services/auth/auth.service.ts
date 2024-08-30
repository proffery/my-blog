import {
  ChangeNameRequest,
  LoginEmailRequest,
  MeResponse,
  MessageResponse,
  RegistrationRequest,
  VerifyEmailRequest,
} from '@/app/api/auth/auth.types'
import { endpoints } from '@/common/constants/endpoints'
import { appActions } from '@/services/app/app.slice'
import { baseApi } from '@/services/base-api'
import { userActions } from '@/services/user/user.slice'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    changeName: builder.mutation<MessageResponse, ChangeNameRequest>({
      invalidatesTags: ['Me'],
      async onQueryStarted({ name: newName }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authService.util.updateQueryData('me', undefined, draft => {
            if (draft.user?.name) {
              draft.user.name = newName
            }
          })
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchResult?.undo()
          console.error(error)
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: endpoints.auth_changeName,
      }),
    }),
    loginEmail: builder.mutation<MessageResponse, LoginEmailRequest>({
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

    logout: builder.mutation<MessageResponse, void>({
      invalidatesTags: ['Me'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(userActions.setUserRole(null))
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
          const response = await queryFulfilled

          dispatch(userActions.setUserRole(response.data.user?.labels ?? ['']))
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
    registration: builder.mutation<MessageResponse, RegistrationRequest>({
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
    sendVerifyEmail: builder.mutation<MessageResponse, void>({
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

    verifyEmail: builder.mutation<MessageResponse, VerifyEmailRequest>({
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
