import { Databases } from 'node-appwrite'

export const changeReadFeedback = async (payload: {
  databasesInstance: Databases
  feedbackId: string
  isRead: boolean
}) => {
  const { databasesInstance, feedbackId, isRead } = payload

  return await databasesInstance.updateDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_FEEDBACKS}`,
    feedbackId,
    { isRead }
  )
}
