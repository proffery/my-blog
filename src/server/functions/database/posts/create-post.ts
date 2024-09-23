import { Databases } from 'node-appwrite'

export const createPost = async (payload: {
  authorId: string
  authorName: string
  cover?: string
  databasesInstance: Databases
  isPublished: boolean
  locale: string
  post: string
  postId: string
  title: string
}) => {
  const {
    authorId,
    authorName,
    cover,
    databasesInstance,
    isPublished,
    locale,
    post,
    postId,
    title,
  } = payload

  return await databasesInstance.createDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    postId,
    { authorId, authorName, cover, isPublished, locale, post, title, views: 1 }
  )
}
