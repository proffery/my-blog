import { Databases } from 'node-appwrite'

export const deleteFeedback = async (payload: {
  databasesInstance: Databases
  feedbackId: string
}) => {
  const { databasesInstance, feedbackId } = payload

  await databasesInstance.deleteDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_FEEDBACKS}`,
    feedbackId
  )
}
