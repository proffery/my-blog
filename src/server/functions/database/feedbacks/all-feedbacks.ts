import { Databases, Query } from 'node-appwrite'

export const allFeedbacks = async (payload: {
  databasesInstance: Databases
  isPublished: boolean
  isRead: boolean
  locale?: null | string
  sort: null | string
  sortBy: null | string
}) => {
  const { databasesInstance, isPublished, isRead, locale, sort, sortBy } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    [
      Query.equal('isPublished', [isPublished]),
      Query.equal('isPublished', [isRead]),
      locale ? Query.equal('locale', locale) : '',
      sort === 'asc'
        ? Query.orderAsc(sortBy ?? '$updatedAt')
        : Query.orderDesc(sortBy ?? '$updatedAt'),
    ]
  )
}
