import { endpoints } from '@/common/constants/endpoints'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints._base,
    credentials: 'include',
  }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Me', 'Users', 'Posts', 'Post', 'NotPublishedPosts'],
})
