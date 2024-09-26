import { createDatabaseClient } from '@/server/database-config'
import { publishedFeedbacks } from '@/server/functions/database/feedbacks/published-feedbacks'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()

  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale')

  try {
    const feedbacks = await publishedFeedbacks({ databasesInstance, locale })

    return NextResponse.json(feedbacks)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
