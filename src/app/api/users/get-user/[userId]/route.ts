import { createUsersClient } from '@/server/users'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export type GetUserParams = { params: { userId: string } }

export async function GET(request: NextRequest, { params: { userId } }: GetUserParams) {
  const { users } = await createUsersClient()

  try {
    const user = await users.get(userId)

    return NextResponse.json({ user })
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
