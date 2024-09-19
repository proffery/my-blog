import { Databases } from 'node-appwrite'

export const updatePostViews = async (payload: {
  databasesInstance: Databases
  postId: string
  views: number
}) => {
  const { databasesInstance, postId, views } = payload

  return await databasesInstance.updateDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    postId,
    { views }
  )
}
