import { Databases, Query } from 'node-appwrite'

export const notPublishedPosts = async (payload: {
  databasesInstance: Databases
  sort: null | string
  sortBy: null | string
}) => {
  const { databasesInstance, sort, sortBy } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    [
      Query.equal('isPublished', [false]),
      sort === 'asc'
        ? Query.orderAsc(sortBy ?? '$updatedAt')
        : Query.orderDesc(sortBy ?? '$updatedAt'),
    ]
  )
}