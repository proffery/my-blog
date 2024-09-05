import { projectConstants } from '@/common/constants/project-constants'
import { createDatabaseClient } from '@/server/database-config'
import { paginatedPostsByCreate } from '@/server/functions/database/posts/paginated-posts-by-create'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()

  const { searchParams } = new URL(request.url)

  const authorId = searchParams.get('authorId')
  const sort = searchParams.get('sort')
  const titleSearch = searchParams.get('search') ?? ''
  const page = Number(searchParams.get('page')) - 1
  const limit = projectConstants.postsPagination
  const offset = page <= 0 || Number.isNaN(page) ? 0 : page * projectConstants.postsPagination

  try {
    const list = await paginatedPostsByCreate({
      authorId,
      databasesInstance,
      limit,
      offset,
      sort,
      titleSearch,
    })

    return NextResponse.json(list)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
