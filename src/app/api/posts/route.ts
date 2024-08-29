import { createDatabaseClient } from '@/server/posts'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException, Query } from 'node-appwrite'

export type SortDirection = 'asc' | 'desc'

export type GetPostsSearchParams = {
  authorId?: string
  search?: string
  sortDirection?: SortDirection
}

export async function GET(request: NextRequest) {
  const { databases } = await createDatabaseClient()
  const { searchParams } = new URL(request.url)

  const authorId = searchParams.get('authorId')
  const sortDirection = searchParams.get('sortDirection')
  const search = searchParams.get('search')

  if (authorId) {
    try {
      if (sortDirection === 'asc') {
        const list = await databases.listDocuments(
          `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
          `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
          [
            Query.orderAsc('$createdAt'),
            Query.equal('authorId', [authorId]),
            Query.contains('title', search ?? ''),
          ]
        )

        return NextResponse.json(list)
      } else {
        const list = await databases.listDocuments(
          `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
          `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
          [
            Query.orderDesc('$createdAt'),
            Query.equal('authorId', [authorId]),
            Query.contains('title', search ?? ''),
          ]
        )

        return NextResponse.json(list)
      }
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        console.error(error)

        return NextResponse.json({ message: error.message }, { status: error.code })
      }

      return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
    }
  } else {
    try {
      if (sortDirection === 'asc') {
        const list = await databases.listDocuments(
          `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
          `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
          [Query.orderAsc('$createdAt'), Query.contains('title', search ?? '')]
        )

        return NextResponse.json(list)
      } else {
        const list = await databases.listDocuments(
          `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
          `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
          [Query.orderDesc('$createdAt'), Query.contains('title', search ?? '')]
        )

        return NextResponse.json(list)
      }
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        console.error(error)

        return NextResponse.json({ message: error.message }, { status: error.code })
      }

      return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
    }
  }
}
