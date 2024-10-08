import { createDatabaseClient } from '@/server/database-config'
import { updatePost } from '@/server/functions/database/posts/update-post'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()
  const { authorName, cover, isPublished, locale, post, postId, title } = await request.json()

  try {
    const updatedPost = await updatePost({
      authorName,
      cover,
      databasesInstance,
      isPublished,
      locale,
      post,
      postId,
      title,
    })

    return NextResponse.json(updatedPost)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
