import { Databases, Query } from 'node-appwrite'

export const paginatedPostsByCreate = async (payload: {
  authorId?: null | string
  databasesInstance: Databases
  limit: number
  locale: string
  offset: number
  sort: null | string
  titleSearch?: string
}) => {
  const { authorId, databasesInstance, limit, locale, offset, sort, titleSearch } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    [
      Query.limit(limit),
      Query.offset(offset),
      sort === 'asc' ? Query.orderAsc('$createdAt') : Query.orderDesc('$createdAt'),
      authorId ? Query.equal('authorId', [authorId]) : Query.equal('isPublished', [true]),
      Query.contains('title', titleSearch ?? ''),
      Query.equal('locale', locale),
    ]
  )
}
