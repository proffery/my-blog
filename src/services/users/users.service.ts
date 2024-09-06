import {
  GetAvatarMetaRequest,
  GetAvatarMetaResponse,
  GetAvatarRequest,
  GetAvatarResponse,
  GetUserRequest,
  GetUserResponse,
  GetUsersListResponse,
} from '@/app/api/users/users.types'
import { endpoints } from '@/common/constants/endpoints'
import { baseApi } from '@/services/base-api'

export const usersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAvatar: builder.query<GetAvatarResponse, GetAvatarRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      query: ({ params: { userId } }) => ({
        url: endpoints.users_get_avatar + '/' + userId,
      }),
    }),
    getAvatarMeta: builder.query<GetAvatarMetaResponse, GetAvatarMetaRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      providesTags: ['AvatarMeta'],
      query: ({ params: { userId } }) => ({
        url: endpoints.users_get_avatar_meta + '/' + userId,
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
        url: endpoints.users_get_user + '/' + userId,
      }),
    }),
    getUsersList: builder.query<GetUsersListResponse, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      providesTags: ['Users'],
      query: () => ({
        method: 'GET',
        url: endpoints.users_get_all,
      }),
    }),
  }),
})

export const { useGetAvatarMetaQuery, useGetAvatarQuery, useGetUserQuery, useGetUsersListQuery } =
  usersService
