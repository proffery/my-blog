import { createDatabaseClient } from '@/server/posts'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function DELETE(request: NextRequest) {
  const { databases } = await createDatabaseClient()
  const { postId } = await request.json()

  try {
    await databases.deleteDocument(
      `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
      `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`,
      postId
    )

    return NextResponse.json(postId)
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
