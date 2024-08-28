import { createDatabaseClient } from '@/server/posts'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export type GetPostParams = { params: { postId: string } }

export async function GET(request: NextRequest, { params: { postId } }: GetPostParams) {
  const { databases } = await createDatabaseClient()

  try {
    const post = await databases.getDocument(
      `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
      `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
      postId
    )

    return NextResponse.json(post)
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
