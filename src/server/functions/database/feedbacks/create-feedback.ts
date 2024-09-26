import { Databases } from 'node-appwrite'

export const createFeedback = async (payload: {
  authorId?: string
  databasesInstance: Databases
  email: string
  feedbackId: string
  isPublished: boolean
  locale: string
  message: string
  name: string
}) => {
  const { authorId, databasesInstance, email, feedbackId, isPublished, locale, message, name } =
    payload

  return await databasesInstance.createDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_FEEDBACKS}`,
    feedbackId,
    { authorId, email, isPublished, locale, message, name }
  )
}
