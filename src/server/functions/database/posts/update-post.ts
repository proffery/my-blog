import { Databases } from 'node-appwrite'

export const updatePost = async (payload: {
  authorName: string
  databasesInstance: Databases
  post: string
  postId: string
  title: string
}) => {
  const { authorName, databasesInstance, post, postId, title } = payload

  return await databasesInstance.updateDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    postId,
    { authorName, post, title }
  )
}
