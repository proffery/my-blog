import { createDatabaseClient } from '@/server/posts'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException, ID } from 'node-appwrite'

export async function POST(request: NextRequest) {
  const { databases } = await createDatabaseClient()
  const { authorId, post, title } = await request.json()
  const postId = ID.unique()

  try {
    const newPost = await databases.createDocument(
      `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
      `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
      postId,
      { authorId, isPublished: true, post, title }
    )

    return NextResponse.json(newPost)
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
