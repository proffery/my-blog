import { Databases } from 'node-appwrite'

export const changePublishPost = async (payload: {
  databasesInstance: Databases
  isPublished: boolean
  postId: string
}) => {
  const { databasesInstance, isPublished, postId } = payload

  return await databasesInstance.updateDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    postId,
    { isPublished }
  )
}
