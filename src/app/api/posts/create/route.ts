import { createDatabaseClient } from '@/server/database-config'
import { createPost } from '@/server/functions/database/posts/create-post'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'
import { ID } from 'node-appwrite'

export async function POST(request: NextRequest) {
  const { databasesInstance } = await createDatabaseClient()
  const { authorId, authorName, cover, isPublished, locale, post, title } = await request.json()

  const postId = ID.unique()

  try {
    const newPost = await createPost({
      authorId,
      authorName,
      cover,
      databasesInstance,
      isPublished,
      locale,
      post,
      postId,
      title,
    })

    return NextResponse.json(newPost)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
