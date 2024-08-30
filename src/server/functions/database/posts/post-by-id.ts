import { Databases } from 'node-appwrite'

export const postById = async (payload: { databasesInstance: Databases; postId: string }) => {
  const { databasesInstance, postId } = payload

  return await databasesInstance.getDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    postId
  )
}
