import { createDatabaseClient } from '@/server/database-config'
import { createFeedback } from '@/server/functions/database/feedbacks/create-feedback'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'
import { ID } from 'node-appwrite'

export async function POST(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()
  const { authorId, email, locale, message, name } = await request.json()

  const feedbackId = ID.unique()

  try {
    const newFeedback = await createFeedback({
      authorId,
      databasesInstance,
      email,
      feedbackId,
      isPublished: false,
      isRead: false,
      locale,
      message,
      name,
    })

    return NextResponse.json(newFeedback)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
