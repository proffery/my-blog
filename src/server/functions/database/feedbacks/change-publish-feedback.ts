import { Databases } from 'node-appwrite'

export const changePublishFeedback = async (payload: {
  databasesInstance: Databases
  feedbackId: string
  isPublished: boolean
}) => {
  const { databasesInstance, feedbackId, isPublished } = payload

  return await databasesInstance.updateDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_FEEDBACKS}`,
    feedbackId,
    { isPublished }
  )
}
