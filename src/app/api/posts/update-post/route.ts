import { createDatabaseClient } from '@/server/posts'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function PUT(request: NextRequest) {
  const { databases } = await createDatabaseClient()
  const { post, postId, tags, title } = await request.json()

  try {
    const updatedPost = await databases.updateDocument(
      `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
      `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
      postId,
      { post, tags, title }
    )

    return NextResponse.json({ post: updatedPost })
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
