import { createDatabaseClient } from '@/server/database-config'
import { deleteFeedback } from '@/server/functions/database/feedbacks/delete-feedback'
import { deletePost } from '@/server/functions/database/posts/delete-post'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()
  const { feedbackId } = await request.json()

  try {
    await deleteFeedback({ databasesInstance, feedbackId })

    return NextResponse.json({ feedbackId })
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
