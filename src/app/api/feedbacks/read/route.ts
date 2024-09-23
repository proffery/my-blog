import { createDatabaseClient } from '@/server/database-config'
import { changeReadFeedback } from '@/server/functions/database/feedbacks/change-read-feedback'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()
  const { feedbackId, isRead } = await request.json()

  try {
    const updatedFeedback = await changeReadFeedback({
      databasesInstance,
      feedbackId,
      isRead,
    })

    return NextResponse.json(updatedFeedback)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
