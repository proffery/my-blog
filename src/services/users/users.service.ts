import { GetUserParams } from '@/app/api/users/user/[userId]/route'
import { endpoints } from '@/common/constants/endpoints'
import { baseApi } from '@/services/base-api'
import { GetUserResponse, GetUsersListResponse } from '@/services/users/users.types'

export const usersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<GetUserResponse, GetUserParams>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      query: ({ params: { userId } }) => ({
        method: 'GET',
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

export const { useGetUserQuery, useGetUsersListQuery } = usersService
