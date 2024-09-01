import { GetPostRequest } from '@/app/api/posts/posts.types'
import { createDatabaseClient } from '@/server/database-config'
import { postById } from '@/server/functions/database/posts/post-by-id'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params: { postId } }: GetPostRequest) {
  const { databasesInstance } = await createDatabaseClient()

  try {
    const post = await postById({ databasesInstance, postId })

    return NextResponse.json(post)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
