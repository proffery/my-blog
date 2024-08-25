import { endpoints } from '@/common/constants/endpoints'
import { ApiResponse } from '@/services/auth/auth.types'
import { baseApi } from '@/services/base-api'
import { GetUserRequest, GetUserResponse, GetUsersListResponse } from '@/services/users/users.types'

export const usersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<GetUserResponse, GetUserRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: endpoints.users_get_user,
      }),
    }),
    getUsersList: builder.query<GetUsersListResponse, ApiResponse>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      },
      query: () => ({
        method: 'GET',
        url: endpoints.users_get_all,
      }),
    }),
  }),
})

export const { useGetUserQuery } = usersService
