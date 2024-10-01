import { toast } from 'react-toastify'

import { MessageResponse } from '@/app/api/auth/auth.types'
import {
  DeleteUserRequest,
  GetAvatarMetaRequest,
  GetAvatarMetaResponse,
  GetUserRequest,
  GetUserResponse,
  GetUsersListRequest,
  GetUsersListResponse,
  UpdateUserRolesRequest,
  UpdateUserRolesResponse,
} from '@/app/api/users/users.types'
import { endpoints } from '@/common/constants/endpoints'
import { errorNotification } from '@/common/utils/errors-notification'
import { baseApi } from '@/services/base-api'

export const usersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
      invalidatesTags: ['Users'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const response = await queryFulfilled

          toast.success(response.data.message)
        } catch (error) {
          errorNotification(error)
        }
      },
      query: body => ({
        body,
        method: 'DELETE',
        url: endpoints.users_delete,
      }),
    }),
    getAvatarMeta: builder.query<GetAvatarMetaResponse, GetAvatarMetaRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          errorNotification(error)
        }
      },
      providesTags: ['Avatar'],
      query: ({ params: { userId } }) => ({
        url: endpoints.users_avatar + '/' + userId,
      }),
    }),
    getUser: builder.query<GetUserResponse, GetUserRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          errorNotification(error)
        }
      },
      query: ({ params: { userId } }) => ({
        url: endpoints.users_user + '/' + userId,
      }),
    }),
    getUsersList: builder.query<GetUsersListResponse, GetUsersListRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          errorNotification(error)
        }
      },
      providesTags: ['Users'],
      query: searchParams => ({
        params: searchParams,
        url: endpoints.users_all,
      }),
    }),
    updateUsersRoles: builder.mutation<UpdateUserRolesResponse, UpdateUserRolesRequest>({
      invalidatesTags: ['Users', 'Me'],
      async onQueryStarted({ roles }, { queryFulfilled }) {
        try {
          await queryFulfilled

          toast.success(`The user roles is being updated. ${roles}`)
        } catch (error) {
          errorNotification(error)
        }
      },
      query: body => ({
        body,
        method: 'PUT',
        url: endpoints.users_update_roles,
      }),
    }),
  }),
})

export const {
  useDeleteUserMutation,
  useGetAvatarMetaQuery,
  useGetUserQuery,
  useGetUsersListQuery,
  useUpdateUsersRolesMutation,
} = usersService
