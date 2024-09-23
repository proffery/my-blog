import { createDatabaseClient } from '@/server/database-config'
import { changePublishFeedback } from '@/server/functions/database/feedbacks/change-publish-feedback'
import { changePublishPost } from '@/server/functions/database/posts/change-publish-post'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()
  const { feedbackId, isPublished } = await request.json()

  try {
    const updatedFeedback = await changePublishFeedback({
      databasesInstance,
      feedbackId,
      isPublished,
    })

    return NextResponse.json(updatedFeedback)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
