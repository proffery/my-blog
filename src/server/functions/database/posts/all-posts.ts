import { Databases } from 'node-appwrite'

export const allPosts = async (payload: { databasesInstance: Databases }) => {
  const { databasesInstance } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`
  )
}
