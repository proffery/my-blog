import { createDatabaseClient } from '@/server/database-config'
import { allFeedbacks } from '@/server/functions/database/feedbacks/all-feedbacks'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()

  const { searchParams } = new URL(request.url)
  const sort = searchParams.get('sort')
  const sortBy = searchParams.get('sortBy')
  const locale = searchParams.get('locale')

  try {
    const post = await allFeedbacks({
      databasesInstance,
      locale,
      sort,
      sortBy,
    })

    return NextResponse.json(post)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
