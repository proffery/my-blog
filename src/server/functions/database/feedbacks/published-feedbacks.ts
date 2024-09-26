import { defaultLocale } from '@/i18n/config'
import { Databases, Query } from 'node-appwrite'

export const publishedFeedbacks = async (payload: {
  databasesInstance: Databases
  locale: null | string
}) => {
  const { databasesInstance, locale } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_FEEDBACKS}`,
    [
      Query.equal('isPublished', true),
      Query.equal('locale', locale ?? defaultLocale),
      Query.orderDesc('$createdAt'),
    ]
  )
}
