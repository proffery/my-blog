import { Databases } from 'node-appwrite'

export const updatePost = async (payload: {
  authorName: string
  cover: string
  databasesInstance: Databases
  isPublished: boolean
  locale: string
  post: string
  postId: string
  title: string
}) => {
  const { authorName, cover, databasesInstance, isPublished, locale, post, postId, title } = payload

  return await databasesInstance.updateDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    postId,
    { authorName, cover, isPublished, locale, post, title }
  )
}
