import { Databases } from 'node-appwrite'

export const createPost = async (payload: {
  authorId: string
  authorName: string
  databasesInstance: Databases
  post: string
  postId: string
  title: string
}) => {
  const { authorId, authorName, databasesInstance, post, postId, title } = payload

  return await databasesInstance.createDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    postId,
    { authorId, authorName, isPublished: true, post, title }
  )
}
