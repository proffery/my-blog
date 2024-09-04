import { Databases, Query } from 'node-appwrite'

export const notPublishedPosts = async (payload: { databasesInstance: Databases }) => {
  const { databasesInstance } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    [Query.equal('isPublished', [false]), Query.orderDesc('$updatedAt')]
  )
}
