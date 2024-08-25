import { createSession } from '@/server/auth'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function POST(request: NextRequest) {
  try {
    const { auth } = await createSession(request)
    const { secret, userId } = await request.json()

    await auth.updateVerification(userId, secret)

    return NextResponse.json({ message: `Email confirmed!` })
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
