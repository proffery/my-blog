import { createAdminUsers } from '@/server/users'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function POST(request: NextRequest) {
  const { users } = await createAdminUsers()
  const { userId } = await request.json()

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
