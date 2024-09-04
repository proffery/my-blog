import { createDatabaseClient } from '@/server/database-config'
import { notPublishedPosts } from '@/server/functions/database/posts/not-published-posts'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()

  try {
    const post = await notPublishedPosts({ databasesInstance })

    return NextResponse.json(post)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
