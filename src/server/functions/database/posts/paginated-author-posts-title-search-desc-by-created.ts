import { Databases, Query } from 'node-appwrite'

export const paginatedAuthorPostsTitleSearchDescByCreated = async (payload: {
  authorId: string
  databasesInstance: Databases
  limit: number
  offset: number
  titleSearch: string
}) => {
  const { authorId, databasesInstance, limit, offset, titleSearch } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc('$createdAt'),
      Query.equal('authorId', [authorId]),
      Query.contains('title', titleSearch),
    ]
  )
}
