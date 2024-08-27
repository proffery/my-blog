import { createDatabaseClient } from '@/server/posts'
import { NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function GET() {
  const { databases } = await createDatabaseClient()

  try {
    const postsList = await databases.listDocuments(
      `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
      `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`
    )

    return NextResponse.json(postsList)
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
