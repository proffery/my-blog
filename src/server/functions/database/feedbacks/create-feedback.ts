import { Databases } from 'node-appwrite'

export const createFeedback = async (payload: {
  authorId?: string
  databasesInstance: Databases
  email: string
  feedbackId: string
  isPublished: boolean
  isRead: boolean
  locale: string
  message: string
  name: string
}) => {
  const {
    authorId,
    databasesInstance,
    email,
    feedbackId,
    isPublished,
    isRead,
    locale,
    message,
    name,
  } = payload

  return await databasesInstance.createDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_FEEDBACKS}`,
    feedbackId,
    { authorId, email, isPublished, isRead, locale, message, name }
  )
}
