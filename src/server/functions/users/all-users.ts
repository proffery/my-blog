import { Query, Users } from 'node-appwrite'

export const allUsers = async (payload: {
  sort: null | string
  sortBy: null | string
  usersInstance: Users
}) => {
  const { sort, sortBy, usersInstance } = payload

  return await usersInstance.list([
    sort === 'asc'
      ? Query.orderAsc(sortBy ?? '$createdAt')
      : Query.orderDesc(sortBy ?? '$createdAt'),
  ])
}
