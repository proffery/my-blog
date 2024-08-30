import { Databases, Query } from 'node-appwrite'

export const authorPostsTitleSearchAscByCreated = async (payload: {
  authorId: string
  databasesInstance: Databases
  titleSearch: string
}) => {
  const { authorId, databasesInstance, titleSearch } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    [
      Query.orderAsc('$createdAt'),
      Query.equal('authorId', [authorId]),
      Query.contains('title', titleSearch),
    ]
  )
}
