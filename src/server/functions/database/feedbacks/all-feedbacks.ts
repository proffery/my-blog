import { defaultLocale } from '@/i18n/config'
import { Databases, Query } from 'node-appwrite'

export const allFeedbacks = async (payload: {
  databasesInstance: Databases
  locale?: null | string
  sort: null | string
  sortBy: null | string
}) => {
  const { databasesInstance, locale, sort, sortBy } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_FEEDBACKS}`,
    [
      Query.equal('locale', locale ?? defaultLocale),
      sort === 'asc'
        ? Query.orderAsc(sortBy ?? '$createdAt')
        : Query.orderDesc(sortBy ?? '$createdAt'),
    ]
  )
}
