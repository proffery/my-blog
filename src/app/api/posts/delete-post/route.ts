import { createDatabaseClient } from '@/server/database-config'
import { deletePost } from '@/server/functions/database/posts/delete-post'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()
  const { postId } = await request.json()

  try {
    await deletePost({ databasesInstance, postId })

    return NextResponse.json({ postId })
  } catch (error: unknown) {
    serverErrorHandler(error)
  }
}
