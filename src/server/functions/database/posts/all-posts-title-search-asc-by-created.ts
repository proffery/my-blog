import { Databases, Query } from 'node-appwrite'

export const allPostsTitleSearchAscByCreated = async (payload: {
  databasesInstance: Databases
  titleSearch: string
}) => {
  const { databasesInstance, titleSearch } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    [Query.orderAsc('$createdAt'), Query.contains('title', titleSearch)]
  )
}
