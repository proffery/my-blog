import { Databases, Query } from 'node-appwrite'

export const paginatedPostsTitleSearchAscByCreated = async (payload: {
  databasesInstance: Databases
  limit: number
  offset: number
  titleSearch: string
}) => {
  const { databasesInstance, limit, offset, titleSearch } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderAsc('$createdAt'),
      Query.contains('title', titleSearch),
    ]
  )
}