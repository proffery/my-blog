import {
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
import { baseApi } from '@/services/base-api'

export const usersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAvatarMeta: builder.query<GetAvatarMetaResponse, GetAvatarMetaRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
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
          console.error(error)
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
          console.error(error)
        }
      },
      providesTags: ['Users'],
      query: searchParams => ({
        params: searchParams,
        url: endpoints.users_all,
      }),
    }),
    updateUsersRoles: builder.mutation<UpdateUserRolesResponse, UpdateUserRolesRequest>({
      invalidatesTags: ['Users'],
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
        url: endpoints.users_update_roles,
      }),
    }),
  }),
})

export const { useGetAvatarMetaQuery, useGetUserQuery, useGetUsersListQuery } = usersService
