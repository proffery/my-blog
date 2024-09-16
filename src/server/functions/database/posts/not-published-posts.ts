import { Databases, Query } from 'node-appwrite'

export const notPublishedPosts = async (payload: {
  databasesInstance: Databases
  locale: string
  sort: null | string
  sortBy: null | string
}) => {
  const { databasesInstance, locale, sort, sortBy } = payload

  return await databasesInstance.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
    [
      Query.equal('isPublished', [false]),
      Query.equal('locale', locale),
      sort === 'asc'
        ? Query.orderAsc(sortBy ?? '$updatedAt')
        : Query.orderDesc(sortBy ?? '$updatedAt'),
    ]
  )
}
