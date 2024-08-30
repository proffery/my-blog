import { Databases } from 'node-appwrite'

export const deletePost = async (payload: { databasesInstance: Databases; postId: string }) => {
  const { databasesInstance, postId } = payload

  await databasesInstance.deleteDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    postId
  )
}
