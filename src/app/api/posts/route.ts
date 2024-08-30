import { createDatabaseClient } from '@/server/database-config'
import { allPostsTitleSearchAscByCreated } from '@/server/functions/database/posts/all-posts-title-search-asc-by-created'
import { allPostsTitleSearchDescByCreated } from '@/server/functions/database/posts/all-posts-title-search-desc-by-created'
import { authorPostsTitleSearchAscByCreated } from '@/server/functions/database/posts/author-posts-title-search-asc-by-created'
import { authorPostsTitleSearchDescByCreated } from '@/server/functions/database/posts/author-posts-title-search-desc-by-created'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()

  const { searchParams } = new URL(request.url)

  const authorId = searchParams.get('authorId')
  const sortDirection = searchParams.get('sortDirection')
  const titleSearch = searchParams.get('search') ?? ''

  if (authorId) {
    try {
      if (sortDirection === 'asc') {
        const list = await authorPostsTitleSearchAscByCreated({
          authorId,
          databasesInstance,
          titleSearch,
        })

        return NextResponse.json(list)
      } else {
        const list = await authorPostsTitleSearchDescByCreated({
          authorId,
          databasesInstance,
          titleSearch,
        })

        return NextResponse.json(list)
      }
    } catch (error: unknown) {
      serverErrorHandler(error)
    }
  } else {
    try {
      if (sortDirection === 'asc') {
        const list = await allPostsTitleSearchAscByCreated({ databasesInstance, titleSearch })

        return NextResponse.json(list)
      } else {
        const list = await allPostsTitleSearchDescByCreated({ databasesInstance, titleSearch })

        return NextResponse.json(list)
      }
    } catch (error: unknown) {
      serverErrorHandler(error)
    }
  }
}
