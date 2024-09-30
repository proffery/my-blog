import { Databases, Query } from 'node-appwrite'

export const paginatedPosts = async (payload: {
  authorId?: null | string
  databasesInstance: Databases
  limit: number
  locale: string
  offset: number
  search?: string
  sort: null | string
  sortBy: null | string
}) => {
  const { authorId, databasesInstance, limit, locale, offset, search, sort, sortBy } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    [
      Query.limit(limit),
      Query.offset(offset),
      sort === 'asc'
        ? Query.orderAsc(sortBy ?? '$createdAt')
        : Query.orderDesc(sortBy ?? '$createdAt'),
      authorId ? Query.equal('authorId', [authorId]) : Query.equal('isPublished', [true]),
      Query.contains('post', search ?? ''),
      Query.equal('locale', locale),
    ]
  )
}
