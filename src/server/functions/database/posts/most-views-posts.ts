import { Databases, Query } from 'node-appwrite'

export const mostViewsPosts = async (payload: {
  databasesInstance: Databases
  limit: number
  locale: string
  offset: number
}) => {
  const { databasesInstance, limit, locale, offset } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc('views'),
      Query.equal('isPublished', [true]),
      Query.equal('locale', locale),
    ]
  )
}
