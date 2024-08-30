import { Databases, Query } from 'node-appwrite'

export const allPostsTitleSearchDescByCreated = async (payload: {
  databasesInstance: Databases
  titleSearch: string
}) => {
  const { databasesInstance, titleSearch } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    [Query.orderDesc('$createdAt'), Query.contains('title', titleSearch)]
  )
}
