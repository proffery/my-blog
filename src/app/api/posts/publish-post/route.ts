import { createDatabaseClient } from '@/server/database-config'
import { publishPost } from '@/server/functions/database/posts/publish-post'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()
  const { isPublished, postId } = await request.json()

  try {
    const updatedPost = await publishPost({
      databasesInstance,
      isPublished,
      postId,
    })

    return NextResponse.json(updatedPost)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
