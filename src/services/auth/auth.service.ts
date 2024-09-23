import {
  ChangeNameRequest,
  CreateAvatarRequest,
  CreateAvatarResponse,
  DeleteAvatarRequest,
  GetMyAvatarMetaRequest,
  GetMyAvatarMetaResponse,
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
    createAvatar: builder.mutation<CreateAvatarResponse, CreateAvatarRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled

          dispatch(userActions.setAvatarUrl(response.data.avatarUrl))
        } catch (error) {
          console.error(error)
        }
      },
      query: ({ image, userId }) => {
        const formData = new FormData()

        formData.append('file', image)
        formData.append('userId', userId)

        return {
          body: formData,
          method: 'POST',
          url: endpoints.auth_create_avatar,
        }
      },
    }),
    deleteAvatar: builder.mutation<MessageResponse, DeleteAvatarRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        } finally {
          dispatch(userActions.setAvatarUrl(null))
        }
      },
      query: body => ({
        body,
        method: 'DELETE',
        url: endpoints.auth_delete_avatar,
      }),
    }),
    getMyAvatarMeta: builder.query<GetMyAvatarMetaResponse, GetMyAvatarMetaRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled

          dispatch(userActions.setAvatarUrl(response.data.avatarUrl))
        } catch (error) {
          dispatch(userActions.setAvatarUrl(null))
          console.warn(error)
        }
      },
      providesTags: ['MyAvatar'],
      query: ({ params: { date, userId } }) => ({
        url: endpoints.users_avatar + '/' + userId + '/' + date,
      }),
    }),
    loginEmail: builder.mutation<MessageResponse, LoginEmailRequest>({
      invalidatesTags: ['Me', 'Posts', 'Post'],
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
      invalidatesTags: ['Me', 'Posts', 'Post'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(userActions.setUserRole(null))
          dispatch(userActions.setUserId(null))
          dispatch(userActions.setAvatarUrl(null))
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
          dispatch(userActions.setUserId(response.data.user?.$id ?? ''))
        } catch (error) {
          console.warn('Me request failed: ', error)
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
      invalidatesTags: ['Me', 'Posts', 'Post'],
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
  useCreateAvatarMutation,
  useDeleteAvatarMutation,
  useGetMyAvatarMetaQuery,
  useLoginEmailMutation,
  useLogoutMutation,
  useMeQuery,
  useRegistrationMutation,
  useSendVerifyEmailMutation,
  useVerifyEmailMutation,
} = authService
