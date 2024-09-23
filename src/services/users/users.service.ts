import {
  GetAvatarMetaRequest,
  GetAvatarMetaResponse,
  GetUserRequest,
  GetUserResponse,
  GetUsersListResponse,
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
        url: endpoints.users_all,
      }),
    }),
  }),
})

export const { useGetAvatarMetaQuery, useGetUserQuery, useGetUsersListQuery } = usersService
