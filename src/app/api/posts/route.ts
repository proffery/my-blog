import { projectConstants } from '@/common/constants/project-constants'
import { createDatabaseClient } from '@/server/database-config'
import { paginatedAllPostsTitleSearchDescByCreated } from '@/server/functions/database/posts/paginated-all-posts-title-search-desc-by-created'
import { paginatedAuthorPostsTitleSearchAscByCreated } from '@/server/functions/database/posts/paginated-author-posts-title-search-asc-by-created'
import { paginatedAuthorPostsTitleSearchDescByCreated } from '@/server/functions/database/posts/paginated-author-posts-title-search-desc-by-created'
import { paginatedPostsTitleSearchAscByCreated } from '@/server/functions/database/posts/paginated-posts-title-search-asc-by-created'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()

  const { searchParams } = new URL(request.url)

  const authorId = searchParams.get('authorId')
  const sortDirection = searchParams.get('sortDirection')
  const titleSearch = searchParams.get('search') ?? ''
  const page = Number(searchParams.get('page')) - 1
  const limit = projectConstants.postsPagination
  const offset = page <= 0 || Number.isNaN(page) ? 0 : page * projectConstants.postsPagination

  if (authorId) {
    try {
      if (sortDirection === 'asc') {
        const list = await paginatedAuthorPostsTitleSearchAscByCreated({
          authorId,
          databasesInstance,
          limit,
          offset,
          titleSearch,
        })

        return NextResponse.json(list)
      } else {
        const list = await paginatedAuthorPostsTitleSearchDescByCreated({
          authorId,
          databasesInstance,
          limit,
          offset,
          titleSearch,
        })

        return NextResponse.json(list)
      }
    } catch (error: unknown) {
      return serverErrorHandler(error)
    }
  } else {
    try {
      if (sortDirection === 'asc') {
        const list = await paginatedPostsTitleSearchAscByCreated({
          databasesInstance,
          limit,
          offset,
          titleSearch,
        })

        return NextResponse.json(list)
      } else {
        const list = await paginatedAllPostsTitleSearchDescByCreated({
          databasesInstance,
          limit,
          offset,
          titleSearch,
        })

        return NextResponse.json(list)
      }
    } catch (error: unknown) {
      return serverErrorHandler(error)
    }
  }
}
