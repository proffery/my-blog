import { createUsersClient } from '@/server/users'
import { NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function GET() {
  const { users } = await createUsersClient()

  try {
    const usersList = await users.list()

    return NextResponse.json(usersList)
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
