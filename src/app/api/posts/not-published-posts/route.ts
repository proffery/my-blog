import { defaultLocale } from '@/i18n/config'
import { createDatabaseClient } from '@/server/database-config'
import { notPublishedPosts } from '@/server/functions/database/posts/not-published-posts'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()

  const { searchParams } = new URL(request.url)
  const sort = searchParams.get('sort')
  const sortBy = searchParams.get('sortBy')
  const locale = searchParams.get('locale') ?? defaultLocale

  try {
    const post = await notPublishedPosts({
      databasesInstance,
      locale,
      sort,
      sortBy,
    })

    return NextResponse.json(post)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
